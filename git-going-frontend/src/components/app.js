import React, {Component} from 'react';
import { Navigation } from './layouts';
import MenuAppBar from "./MenuBar";

// import styled from "styled-components";


export default class App extends Component {

    render() {
        return (
          <div>
            <Navigation />
            <MenuAppBar />
          </div>
        );
    }
}