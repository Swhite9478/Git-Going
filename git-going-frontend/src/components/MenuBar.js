import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuButton from './buttons/MenuButton'; 
import { constants, asPath } from "../constants/constants";



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

export default function MenuAppBar({currentPage, app}) {
  let currPage = currentPage;
    
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl] = React.useState(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuButton
            iconType={MenuIcon}
            currentPage={currPage}
            app={app}
            items={[constants.HOME, constants.ABOUT, constants.REQUEST_REPO, constants.REPOS]}
          />
          <Typography variant="h6" className={classes.title}>
            {currPage}
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
