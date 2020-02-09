import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import {constants, asPath} from '../../constants/constants';
import { NavLink } from "react-router-dom";


class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.currentPage = props.currentPage;
    this.state = {
      anchorEl: null,
      currentPage: this.currentPage
    };
    
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (page) => {
    this.setState({ anchorEl: null });
  };

  handleSelection = function(page) {
    this.app.setState({ currentPage: page });
    this.setState({ anchorEl: null });
  }

  handleSelectionPre(link) {
    console.log(link);
    this.handleSelection(link);
  }

  render() {
    const {anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const Wrapper = this.props.iconType;

    const listItems = this.props.items.map(link => {

      return (
        <MenuItem open={open} onClick={() => this.handleSelection(link)}>
            <NavLink to={asPath(link)} style={constants.PLAIN_TEXT}>
              {" "}
              {link}{" "}
            </NavLink>
        </MenuItem>
      );
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
