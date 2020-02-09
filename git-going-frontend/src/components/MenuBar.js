import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import MenuButton from './buttons/MenuButton'; 
import { constants, asPath } from "../constants/constants";
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


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));   

export default function MenuAppBar() {
    const navRoutes =  <Router>
        <div>
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
        </div>
    </Router>;
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuButton
            iconType={MenuIcon}
            navRoutes={navRoutes}
            items={["Home", constants.ABOUT, "Request a Repo", "Repos"]}
          />
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          {auth && (
            <div>
              <MenuButton
                iconType={AccountCircle}
                items={["Profile", "My Account", "Logout"]}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
