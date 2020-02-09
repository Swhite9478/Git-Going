import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import {Redirect} from 'react-router-dom';
import { constants, asPath } from "../../constants/constants";
import { Link } from "@material-ui/core";


class AboutButton extends React.Component {
  constructor(props) {
    super(props);
    this.navRoutes = props.navRoutes;
    this.state = { anchorEl: null, navRoutes: this.navRoutes };
  }

  handleClose = event => {
    this.setState({ anchorEl: null });
    console.log(asPath(constants.ABOUT));
    return <Link to={asPath(constants.ABOUT)} />;
  };

  render() {
    const anchorEl = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <MenuItem open={open} onClick={this.handleClose}>
          {constants.ABOUT}
        </MenuItem>
      </div>
    );
  }
}

export default AboutButton;
