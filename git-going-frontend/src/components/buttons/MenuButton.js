import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import {constants, asPath} from '../../constants/constants';
import AboutButton from "./AboutButton";

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.currentPage = props.currentPage;
    this.state = { anchorEl: null, currentPage: this.currentPage };
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const Wrapper = this.props.iconType;
    const listItems = this.props.items.map(link => {
      switch(link) {
        
        case constants.ABOUT:
          return <AboutButton app={this.app} currentPage={this.currentPage} menu={this}/>;
          
        default:
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
