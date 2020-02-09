import React, { Component } from 'react';
import { Header, Footer } from '.';

export default class Layout extends Component { 
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}