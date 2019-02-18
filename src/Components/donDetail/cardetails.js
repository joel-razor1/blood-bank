import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import { Link } from "react-router-dom";
import "./cardetails.css";
import { fire, db } from "../config";
import Checkbox from "material-ui/Checkbox";
import ExpandTransitionChild from "material-ui/internal/ExpandTransitionChild";

const styles = {
  floatingLabelStyle: {
    color: "#ae1e1e"
  },
  floatingLabelFocusStyle: {
    color: "#ae1e1e"
  },
  underlineStyle: {
    borderColor: "#ae1e1e"
  }
};

export default class cardetails extends Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onBloodChange = this.onBloodChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      email: "",
      password: "",
      name: "",
      age: "",
      address: "",
      bloodtype: "",
      phone: "",
      combine: "",
      open: false,
      opendialog: false,
      opendialog2: false,
      disable: true,
      checkedHIV: false,
      checkedCancer: false,
      checkedCardiac: false,
      checkedDiabetes: false,
      checkedTattoo: false,
      checkedHyper: false,
      checkedWeight: false,
      checkedAgreement: false,
      disableCancer: false,
      disableCardiac: false,
      disableDiabetes: false,
      disableHIV: false,
      disableHyper: false,
      disableTattoo: false,
      disableWeight: false,
      disableFINAL: true
    };
  }
  handleOpen = () => {
    this.setState({ opendialog: true, disableFINAL: false });
  };

  handleClose = () => {
    if (
      this.state.checkedCancer ||
      this.state.checkedCardiac ||
      this.state.checkedDiabetes ||
      this.state.checkedHIV ||
      this.state.checkedHyper ||
      this.state.checkedTattoo ||
      this.state.checkedWeight
    ) {
      this.setState({ opendialog2: true, opendialog: false });
    } else {
      this.setState({ opendialog: false });
    }
  };
  handleCloseSorry = () => {
    this.setState({ opendialog2: false, disableFINAL: true });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onEmailChange(e, s) {
    this.setState({ email: s });
  }
  onPasswordChange(e, s) {
    this.setState({ password: s });
  }
  onNameChange(e, s) {
    this.setState({ name: s });
  }
  onBloodChange(e, s) {
    console.log("bloddd", s);

    this.setState({ bloodtype: s });
  }

  onAddressChange(e, s) {
    this.setState({ address: s });
  }
  onPhoneChange(e, s) {
    this.setState({ phone: s });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(e => {
        console.log("user uid", e.user.uid);

        var data1 = {
          email: this.state.email,
          name: this.state.name,
          bloodtype: this.state.bloodtype + 1,
          age: this.state.age,
          address: this.state.address,
          combine: this.state.bloodtype + 1 + "_" + this.state.address
        };
        db.ref("table1")
          .child(e.user.uid)
          .set(data1);

        var data2 = {
          phone: this.state.phone,
          email: this.state.email
        };
        db.ref("table2")
          .child(e.user.uid)
          .set(data2);
        this.setState({
          open: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  updateCheckCardiac() {
    this.setState(oldState => {
      return {
        disableCardiac: !this.state.disableCardiac,
        checkedCardiac: !oldState.checkedCardiac
      };
    });
  }
  updateCheckWeight() {
    this.setState(oldState => {
      return {
        disableWeight: !this.state.disableWeight,
        checkedWeight: !oldState.checkedWeight
      };
    });
  }
  updateCheckCancer() {
    this.setState(oldState => {
      return {
        disableCancer: !this.state.disableCancer,
        checkedCancer: !oldState.checkedCancer
      };
    });
  }
  updateCheckHIV() {
    this.setState(oldState => {
      return {
        disableHIV: !this.state.disableHIV,
        checkedHIV: !oldState.checkedHIV
      };
    });
  }
  updateCheckHyper() {
    this.setState(oldState => {
      return {
        disableHyper: !this.state.disableHyper,
        checkedHyper: !oldState.checkedHyper
      };
    });
  }
  updateCheckTattoo() {
    this.setState(oldState => {
      return {
        disableTattoo: !this.state.disableTattoo,
        checkedTattoo: !oldState.checkedTattoo
      };
    });
  }
  updateCheckDiabetes() {
    this.setState(oldState => {
      return {
        disableDiabetes: !this.state.disableDiabetes,
        checkedDiabetes: !oldState.checkedDiabetes
      };
    });
  }
  onAgeChange(e, s) {
    if (
      this.state.disableCancer ||
      this.state.disableCardiac ||
      this.state.disableDiabetes ||
      this.state.disableHIV ||
      this.state.disableHyper ||
      this.state.disableTattoo ||
      this.state.disableWeight
    ) {
      this.setState({ disableFINAL: true, age: s });
    } else {
      if (s > 17 && s < 66) {
        this.setState({ disableFINAL: false, age: s });
      } else {
        this.setState({ disableFINAL: true, age: s });
      }
    }
  }

  state = {
    value: 2
  };
  render() {
    const actions = [
      <FlatButton
        label="Submit"
        secondary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];
    const actions1 = [
      <FlatButton
        label="Okay"
        secondary={true}
        keyboardFocused={true}
        onClick={this.handleCloseSorry}
      />
    ];
    return (
      <div>
        <div className="card1style">
          <h2>Signup !</h2>
          <h2>Enter your personal details </h2>
          <br />
          <div className="alignc">
            <RaisedButton
              style={{ margin: "auto" }}
              secondary={true}
              label="Click me first to see if you're fit to be a donor!"
              onClick={this.handleOpen}
            />
            <Dialog
              title="Please Select if you have any of the following: "
              actions={actions}
              modal={false}
              open={this.state.opendialog}
              onRequestClose={this.handleClose}
            >
              <Checkbox
                label="HIV +"
                checked={this.state.checkedHIV}
                onCheck={this.updateCheckHIV.bind(this)}
              />
              <Checkbox
                label="Any cases of Cardiac arrest in the past"
                checked={this.state.checkedCardiac}
                onCheck={this.updateCheckCardiac.bind(this)}
              />
              <Checkbox
                label="Hypertension"
                checked={this.state.checkedHyper}
                onCheck={this.updateCheckHyper.bind(this)}
              />
              <Checkbox
                label="Cancer"
                checked={this.state.checkedCancer}
                onCheck={this.updateCheckCancer.bind(this)}
              />
              <Checkbox
                label="Diabetes"
                checked={this.state.checkedDiabetes}
                onCheck={this.updateCheckDiabetes.bind(this)}
              />
              <Checkbox
                label="Piercing or Tattoos"
                checked={this.state.checkedTattoo}
                onCheck={this.updateCheckTattoo.bind(this)}
              />
              <Checkbox
                label="Weight below 50."
                checked={this.state.checkedWeight}
                onCheck={this.updateCheckWeight.bind(this)}
              />
            </Dialog>
            <Dialog
              title="Oh No !"
              actions={actions1}
              modal={false}
              open={this.state.opendialog2}
              onRequestClose={this.handleCloseSorry}
            >
              <p>Sorry, but you are not eligile to be a DONOR.</p>
            </Dialog>
            <br />
            <TextField
              floatingLabelText="Name"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.onNameChange}
            />
            <br />
            <TextField
              floatingLabelText="Email"
              onChange={this.onEmailChange}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
            <br />
            <TextField
              floatingLabelText="Phone No."
              onChange={this.onPhoneChange}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
            <br />
            <TextField
              floatingLabelText="Password"
              value={this.state.password}
              type="password"
              onChange={this.onPasswordChange}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
            <br />
            <SelectField
              floatingLabelText="Blood Type:"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              value={this.state.value}
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

            <TextField
              floatingLabelText="Age"
              errorText="You can donate blood if you're above 16 and below 65 years of age"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.onAgeChange}
            />

            <br />

            <TextField
              floatingLabelText="Address"
              multiLine={true}
              row={4}
              errorText="You can select you address only among the following places: Aluva, Cherai, Edapally, Kalamassery, Kaloor, Kakkanad"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.onAddressChange}
            />
            <p>
              All the information I've provided above is correct to my
              knowledge, and I know that my account will be deleted and legal
              action would be taken if there's any discrepancies.
            </p>
            <br />
            <br />
            <RaisedButton
              label="Submit"
              disabled={this.state.disableFINAL}
              secondary={true}
              onClick={this.signup}
            />
            <Snackbar
              open={this.state.open}
              message="Account Created Successfully"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
          <Link to="/login" className="aligncenter">
            <p style={{ textAlign: "center" }}>
              Click here if already signed up!!
            </p>
          </Link>
        </div>
      </div>
    );
  }
}
