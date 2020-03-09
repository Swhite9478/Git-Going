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
import {createBrowserHistory} from 'history';
import emailValidator from 'email-validator';
import bcrypt from 'bcryptjs';


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      navbarOpen: false,
      history: createBrowserHistory(),
      auth: {},
      fakeBool:false
    };
  }
  

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  handleFormSubmission = (event) => {
    // event.preventDefault();
    let formResultObj = {
      isValidEmail: emailValidator.validate(event.target.email.value),
      emailAddress: event.target.email.value,
      encryptedPass: this.handleEncryption(event.target.password.value)
    };
    this.setState({ auth: formResultObj });
    
    alert(JSON.stringify(formResultObj));
    alert(JSON.stringify(this.state.auth));
    this.state.history.push(asPath(constants.HOME));
  }

  handleEncryption = (password) => {
    let SALT_WORK_FACTOR = 10;
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    return bcrypt.hashSync(password, salt);
  }

  render() {
    return (
      <>
        <Navbar
          navbarState={this.state.navbarOpen}
          handleNavbar={this.handleNavbar}
        />
        <Router>
          <Switch>
            <Route exact path={asPath(constants.HOME)} render={props => (<Home {...props} fakeBool={this.state.fakeBool} />)} /> />
            <Route exact path={asPath(constants.ABOUT)} component={About} />
            <Route exact path={asPath(constants.ACTIVATE)} component={Activate} />
            <Route exact path={asPath(constants.REQUEST_REPO)} component={RequestForm} />
            <Route exact path={asPath(constants.REPOS)} component={Repos} />
            <Route exact path={asPath(constants.SIGNUP)} component={SignUp} />
            {/* <Route exact path={asPath(constants.LOGIN)} component={Login} auth={this.state.auth}/> */}
            <Route exact path={asPath(constants.LOGIN)} render={props =>(<Login {...props} onSubmit={this.handleFormSubmission.bind(this)} />)} /> />
          </Switch>
        </Router>
        <GlobalStyle />
      </>
    );
  }
}