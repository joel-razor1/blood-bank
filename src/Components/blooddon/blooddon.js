import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import Card from "material-ui/Card";
import "./Blooddon.css";
import Drawerdate from "../donDetail/drawer";
import { fire, db } from "../config";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import { Link, Redirect } from "react-router-dom";

class Blooddon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      donations: [],
      newData: {},
      firstTime: true,
      open: false,
      openlogbutton: false,
      redirect: false
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    fire
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          console.log("user", user.email);
          this.setState({ email: user.email });
          this.fetchUser();
        }
      })
      .bind(this);
  }
  deleteMe = () => {
    const email = this.state.email;
    var user = fire.auth().currentUser;
    db.ref("table1")
      .child(user.uid)
      .set(null);
    // userdel
    //   .remove()
    //   .then(function() {
    //     console.log("removed successfully");
    //   })
    //   .catch(function(error) {
    //     console.log("error", error);
    //   });

    user
      .delete()
      .then(function() {
        console.log("User deleted: ", user);
      })
      .catch(function(error) {
        console.log("Error occured");
      });
  };
  fetchUser = () => {
    const email = this.state.email;
    db.ref("table2")
      .orderByChild("email")
      .equalTo(email)
      .on("value", data => {
        var phone = "";
        data.forEach(child => {
          phone = child.val().phone;
        });

        this.setState({
          phone
        });
        this.fetchData();
        this.notifyUseR();
      })
      .bind(this);
  };
  fetchData = () => {
    var that = this;
    db.ref("receiver data")
      .child(this.state.phone)
      .on("value", data => {
        var donations = [];
        data.forEach(child => {
          donations.push(child.val());
        });
        that.setState({ donations });
      });
  };
  notifyUseR = () => {
    db.ref("receiver data")
      .child(this.state.phone)
      .endAt()
      .limitToLast(1)
      .on("child_added", data => {
        console.log("new data", data.val());
        this.state.firstTime
          ? this.setState({ firstTime: false })
          : this.setState({ newData: data.val(), open: true });
      });
  };

  logout() {
    fire
      .auth()
      .signOut()
      .then(e => {
        this.setState({
          openlogbutton: true,
          redirect: true
        });
      });
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRequestClose = () => {
    this.setState({
      openlogbutton: false
    });
  };
  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div>
        <Drawerdate />
        <Card className="datepick" style={{ borderRadius: "18px" }}>
          <p className="head1">Logout Here.</p>
          <RaisedButton
            style={{ width: "73%" }}
            secondary={true}
            label="Logout"
            onClick={this.logout}
          />
          <br />
          <br />
          <RaisedButton
            secondary={true}
            label="I no longer wish to be a Donor"
            onClick={this.deleteMe}
          />
        </Card>

        <Snackbar
          open={this.state.openlogbutton}
          message="Logged out Successfully"
          onRequestClose={this.handleRequestClose}
        />
        {this.state.redirect ? <Redirect to="/login" /> : null}
        <p />

        <Dialog
          title="New Request"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            Name: {this.state.newData.rname}
            <br />
            Phone: {this.state.newData.rphone}
          </div>
        </Dialog>
      </div>
    );
  }
}
export default Blooddon;
