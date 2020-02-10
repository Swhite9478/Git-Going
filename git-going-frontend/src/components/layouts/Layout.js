import React, { Component } from 'react';
import { Footer } from '.';

export default class Layout extends Component {
    render() {
        return (
            <div style={{padding:0}}>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}