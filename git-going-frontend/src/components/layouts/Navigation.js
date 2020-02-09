import React, { Component } from "react";

import { About, Home, RequestForm, Repos, Signup, Activate } from "../../pages";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../../styles/nav.css";

export default class Navigation extends Component {
    
    render() {
        return (
          <Router>
            <div>
              <ul className="nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/About">About</Link>
                </li>
                <li>
                  <Link to="/RequestForm">Request a Repo</Link>
                </li>
                <li>
                  <Link to="/Repos">View Repos</Link>
                </li>
                <li>
                  <Link to="/Signup">Signup for Git-Going</Link>
                </li>
              </ul>

              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/About">
                  <About />
                </Route>
                <Route path="/Activate">
                  <Activate />
                </Route>
                <Route path="/RequestForm">
                  <RequestForm />
                </Route>
                <Route path="/Repos">
                  <Repos />
                </Route>
                <Route path="/Signup">
                  <Signup />
                </Route>
              </Switch>
            </div>
          </Router>
        );
    }
}
