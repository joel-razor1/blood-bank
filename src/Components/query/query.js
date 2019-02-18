import React, { Component } from "react";
import "./query.css";
import { db } from "../config";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { Card } from "material-ui/Card";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import Checkbox from "material-ui/Checkbox";
import Drawer from "../donDetail/drawer";
import { Link } from "react-router-dom";

const styles = {
  floatingLabelStyle: {
    color: "#ae1e1e"
  },
  floatingLabelFocusStyle: {
    color: "#ae1e1e"
  },
  underlineStyle: {
    borderColor: "#ae1e1e"
  },
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

const group = [
  "O +ve",
  "O -ve",
  "A +ve",
  "A -ve",
  "B +ve",
  "B -ve",
  "AB +ve",
  "AB -ve"
];
const address = [
  "Edapally",
  "Kalamassery",
  "Kakkanad",
  "Cherai",
  "Kaloor",
  "Aluva"
];

class query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      rname: "",
      rphone: "",
      value: null,
      bloodtype: "",
      address: "",
      selectedEmail: "",
      selectedPhone: "",
      successModal: false,
      checked: false,
      disabledtrial: true
    };
    this.onRnameChange = this.onRnameChange.bind(this);
    this.onRphoneChange = this.onRphoneChange.bind(this);
    this.onBloodChange = this.onBloodChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
  }

  onRnameChange(e, s) {
    this.setState({ rname: s });
  }
  onRphoneChange(e, s) {
    this.setState({ rphone: s });
  }
  onBloodChange(e, s) {
    this.setState({ bloodtype: s + 1 });
  }
  onAddressChange(e, s, value) {
    this.setState({ address: value });
  }
  handleOpen = item => {
    console.log("item", item.email);

    this.setState({ open: true, selectedEmail: item.email });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleClose1 = () => {
    this.setState({ successModal: false });
  };

  componentDidMount() {
    db.ref("table1")
      .on("value", data => {
        const d = [];
        const address = [];
        data.forEach(child => {
          d.push(child.val());
        });
        this.setState({ data: d });
      })
      .bind(this);
  }

  onFilterBlood = item => {
    const bloodtype = this.state.bloodtype;
    const address = this.state.address;

    if (bloodtype == "") {
      return item;
    } else {
      return (
        item.bloodtype === bloodtype &&
        item.address.toLowerCase().indexOf(address.toLowerCase()) > -1
      );
    }
  };
  updateCheck = () => {
    this.setState(oldState => {
      return {
        disabledtrial: !this.state.disabledtrial,
        checked: !oldState.checked
      };
    });
  };
  onRequest = () => {
    var rdata = {
      rname: this.state.rname,
      rphone: this.state.rphone
    };
    const email = this.state.selectedEmail;
    db.ref("table2")
      .orderByChild("email")
      .equalTo(email)
      .on("value", data => {
        var phone = "";
        data.forEach(child => {
          phone = child.val().phone;
        });
        db.ref("receiver data")
          .child(phone)
          .push(rdata);
        this.setState({
          open: false,
          selectedPhone: phone,
          successModal: true
        });
      })
      .bind(this);
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.disabledtrial}
        onClick={this.onRequest}
      />
    ];
    const actions1 = [
      <FlatButton label="OK" primary={true} onClick={this.handleClose1} />
    ];
    const data = this.state.data;

    return (
      <div>
        <Drawer />
        <div style={{ padding: 40 }}>
          <Card style={{ padding: 20, borderRadius: "18px" }}>
            <SelectField
              floatingLabelText="Blood Type"
              value={this.state.bloodtype}
              onChange={this.onBloodChange}
            >
              <MenuItem value={1} primaryText="O +ve" />
              <MenuItem value={2} primaryText="O -ve" />
              <MenuItem value={3} primaryText="A +ve" />
              <MenuItem value={4} primaryText="A -ve" />
              <MenuItem value={5} primaryText="B +ve" />
              <MenuItem value={6} primaryText="B -ve" />
              <MenuItem value={7} primaryText="AB +ve" />
              <MenuItem value={8} primaryText="AB -ve" />
            </SelectField>
            <br />
            <SelectField
              floatingLabelText="Address"
              onChange={this.onAddressChange}
              value={this.state.address}
            >
              {address.map((item, i) => (
                <MenuItem value={item} key={i} primaryText={item} />
              ))}
            </SelectField>
            <br />

            <br />
          </Card>
          <br />
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Age</TableHeaderColumn>
                <TableHeaderColumn>Address</TableHeaderColumn>
                <TableHeaderColumn>BloodType</TableHeaderColumn>
                <TableHeaderColumn>Request for Blood</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {data.filter(this.onFilterBlood).map(item => (
                <TableRow>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.email}</TableRowColumn>
                  <TableRowColumn>{item.age}</TableRowColumn>
                  <TableRowColumn>{item.address}</TableRowColumn>
                  <TableRowColumn>{group[item.bloodtype - 1]}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="Request"
                      primary
                      onClick={this.handleOpen.bind(this, item)}
                    />{" "}
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog
            title="Enter your details: "
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TextField
              hintText="receiver's name"
              floatingLabelText="Name"
              onChange={this.onRnameChange}
            />
            <br />
            <TextField
              hintText="rceiver's phone no."
              floatingLabelText="Phone No."
              onChange={this.onRphoneChange}
            />
            <Checkbox
              label="I agree to the terms and conditions."
              checked={this.state.checked}
              onCheck={this.updateCheck}
              style={styles.checkbox}
            />
            <p>
              See the terms and conditions <Link to="/terms">here</Link>
            </p>
          </Dialog>

          <Dialog
            title="Mobile No. "
            actions={actions1}
            modal={true}
            open={this.state.successModal}
          >
            <h3>{this.state.selectedPhone}</h3>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default query;
