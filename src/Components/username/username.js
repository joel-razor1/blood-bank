import React, { Component } from "react";
import DrawerLogin from "../donDetail/drawer";
import Usercard from "./usercard";
import "./Username.css";

class Username extends Component {
  render() {
    return (
      <div>
        <DrawerLogin />
        <Usercard />
      </div>
    );
  }
}

export default Username;
