import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Link, Redirect } from "react-router-dom";
import { fire } from "../config";
import Snackbar from "material-ui/Snackbar";
import "./usercard.css";

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

class usercard extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      email: "",
      password: "",
      redirect: false,
      open: false
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    var that = this;
    console.log("abjkda", this.state.email);
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (user) {
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        this.setState({
          open: true
        });
        console.log(error);
      });
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    return (
      <div>
        <div className="card1">
          <div className="">
            <h1>Log In</h1>
          </div>

          <div className="userpass">
            <p>
              <TextField
                name="email"
                className="textcol"
                floatingLabelText="Username"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                onChange={this.handleChange}
              />
            </p>

            <p>
              <TextField
                name="password"
                className="textcol  "
                floatingLabelText="Password"
                type="password"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                onChange={this.handleChange}
              />
            </p>
            <RaisedButton
              label="Submit"
              secondary={true}
              className="button1"
              onClick={this.login}
            />
            <Snackbar
              open={this.state.open}
              autoHideDuration={0}
              message="Log in failed. Wrong Email or password"
              onRequestClose={this.handleRequestClose}
            />
          </div>
          {this.state.redirect ? <Redirect to="/date" /> : null}
          <div className="alignlink">
            <Link to="/">
              <p style={{ textAlign: "center" }}>
                Click here if not Signed up!!
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default usercard;
