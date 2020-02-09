import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import {constants, asPath} from '../../constants/constants';
import AboutButton from "./AboutButton";

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.navRoutes = props.navRoutes;
    this.state = { anchorEl: null, navRoutes: this.navRoutes };
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const Wrapper = this.props.iconType;
    const listItems = this.props.items.map(link => {
      if (link === constants.ABOUT) {
        return <AboutButton navRoutes={this.navRoutes}/>;
      } else {
        return <MenuItem onClick={this.handleClose}>{link}</MenuItem>;
      }
    });

    return (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {<Wrapper />}
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          {listItems}
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
