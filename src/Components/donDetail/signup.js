import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { fire, db } from "../config";

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

    this.state = {
      email: "",
      password: ""
    };
  }

  onEmailChange(e, s) {
    this.setState({ email: s });
  }
  onPasswordChange(e, s) {
    this.setState({ password: s });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(e => {
        console.log("user uid", e.user.uid);
      });
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Email"
          onChange={this.onEmailChange}
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
        <RaisedButton
          label="Submit"
          secondary={true}
          className="button1"
          onClick={this.login}
        />
      </div>
    );
  }
}
