import React, { Component } from "react";

import { About, Home, RequestForm, Repos, Signup, Activate, Login } from "../../pages";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../../styles/nav.css";
import {constants, asPath} from '../../constants/constants';

export default class Navigation extends Component {
    
    render() {
        return (
          <Router>
            <div>
              <ul className="nav">
                <li>
                  <Link to={asPath(constants.HOME)}>Home</Link>
                </li>
                <li>
                  <Link to={asPath(constants.ABOUT)}>About</Link>
                </li>
                <li>
                  <Link to={asPath(constants.REQUEST_REPO)}>
                    Request a Repo
                  </Link>
                </li>
                <li>
                  <Link to={asPath(constants.REPOS)}>View Repos</Link>
                </li>
                <li>
                  <Link to={asPath(constants.LOGIN)}>Login</Link>
                </li>
              </ul>

              <Switch>
                <Route exact path={asPath(constants.HOME)}>
                  <Home nav={this}/>
                </Route>
                <Route path={asPath(constants.ABOUT)}>
                  <About />
                </Route>
                <Route path={asPath(constants.ACTIVATE)}>
                  <Activate />
                </Route>
                <Route path={asPath(constants.REQUEST_REPO)}>
                  <RequestForm />
                </Route>
                <Route path={asPath(constants.REPOS)}>
                  <Repos />
                </Route>
                <Route path={asPath(constants.SIGNUP)}>
                  <Signup />
                </Route>
                <Route path={asPath(constants.LOGIN)}>
                  <Login />
                </Route>
              </Switch>
            </div>
          </Router>
        );
    }
}
