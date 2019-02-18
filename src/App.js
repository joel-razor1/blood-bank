import React, { Component } from "react";
import "./App.css";
import DonDetail from "./Components/donDetail/donDetail";
import Username from "./Components/username/username";
import BloodDate from "./Components/blooddon/blooddon";
import Query from "./Components/query/query";
import Terms from "./Components/query/terms";
import Error from "./Components/error/error";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={DonDetail} exact />
            <Route path="/login" component={Username} />
            <Route path="/date" component={BloodDate} />
            <Route path="/query" component={Query} />
            <Route path="/terms" component={Terms} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
