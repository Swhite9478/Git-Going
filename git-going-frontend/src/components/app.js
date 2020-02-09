import React, {Component} from 'react';
import { Navigation } from './layouts';
import MenuAppBar from "./MenuBar";
import { constants, asPath } from '../constants/constants';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  About,
  Home,
  RequestForm,
  Repos,
  Signup,
  Activate,
  Login
} from "../pages";

// import styled from "styled-components";


export default class App extends Component {
  state = {
    currentPage: constants.HOME
  }

    render() {
        return (
          <div>
            <Router>
              <MenuAppBar app={this} currentPage={this.state.currentPage} />
              <Switch>
                <Route exact path={asPath(constants.HOME)}>
                  <Home nav={this} />
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
            </Router>
          </div>
        );
    }
}