import React, {Component} from 'react';
import { Navigation } from './layouts';
import MenuAppBar from "./MenuBar";
import { constants } from '../constants/constants';

// import styled from "styled-components";


export default class App extends Component {
  state = {
    currentPage: constants.HOME
  }

    render() {
        return (
          <div>
            {/* <Navigation /> */}
            <MenuAppBar app={this} currentPage={this.state.currentPage}/>
          </div>
        );
    }
}