import React, {Component} from 'react';
import { constants, asPath } from '../constants/constants';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  About,
  Home,
  RequestForm,
  Repos,
  Signup,
  Activate,
  Login
} from "../pages";
import SignUp from '../pages/Signup';
import Navbar from "./navbar/Navbar";
import GlobalStyle from "../styles/Global";



export default class App extends Component {
  state = {
    navbarOpen: false
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {
    return (
      <>
        <Navbar
          navbarState={this.state.navbarOpen}
          handleNavbar={this.handleNavbar}
        />
        <Router>
          <Switch>
            <Route exact path={asPath(constants.HOME)} component={Home} />
            <Route exact path={asPath(constants.ABOUT)} component={About} />
            <Route exact path={asPath(constants.ACTIVATE)} component={Activate} />
            <Route exact path={asPath(constants.REQUEST_REPO)} component={RequestForm} />
            <Route exact path={asPath(constants.REPOS)} component={Repos} />
            <Route exact path={asPath(constants.SIGNUP)} component={SignUp} />
            <Route exact path={asPath(constants.LOGIN)} component={Login} />
          </Switch>
        </Router>
        <GlobalStyle />
      </>
    );
  }
}