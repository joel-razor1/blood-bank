import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import don2 from "./don2.png";
import { Link } from "react-router-dom";
import "./drawer.css";

export default class drawer extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <div>
          <AppBar
            className="appbar1"
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            title="Red Ray"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onClick={this.handleToggle}
          />
        </div>

        <div className="backgroundimage">
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <img src={don2} alt="Wait" />
            <text className="redray1">Red Ray</text>
            <br />
            <br />
            <br />
            <div className="borderdiv">
              <Link to="/login">
                <MenuItem>Log In</MenuItem>
              </Link>
            </div>
            <br />
            <div className="borderdiv">
              <Link to="/">
                <MenuItem onClick={this.handleClose}>Sign Up</MenuItem>
              </Link>
            </div>
            <br />
            <div className="borderdiv">
              <Link to="/query">
                <MenuItem onClick={this.handleClose}>Requests</MenuItem>
              </Link>
            </div>
            <br />
            <div className="borderdiv">
              <Link to="/date">
                <MenuItem onClick={this.handleClose}>
                  Blood Donation Entry
                </MenuItem>
              </Link>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}
