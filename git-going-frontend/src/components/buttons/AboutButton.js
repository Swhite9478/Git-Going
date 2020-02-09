import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { BrowserRouter as Router } from "react-router-dom";
import { constants, asPath } from "../../constants/constants";
import { NavLink } from "react-router-dom";


class AboutButton extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.menu = props.menu;
    this.currentPage = props.currentPage;
    this.state = { menu: this.menu, currentPage: this.currentPage };
  }

  handleClose = () => {
      this.app.setState({ currentPage: constants.ABOUT});
      this.menu.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <MenuItem open={open} onClick={this.handleClose}>
          <Router>
            <NavLink
              to={asPath(constants.ABOUT)}
              style={constants.PLAIN_TEXT}
            >
              {" "}
              {constants.ABOUT}{" "}
            </NavLink>
          </Router>
        </MenuItem>
      </div>
    );
  }
}

export default AboutButton;
