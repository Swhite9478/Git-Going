import React, { Component } from 'react';
import { Footer } from '.';

export default class Layout extends Component {
    render() {
        return (
            <div style={{paddingTop:'5rem'}}>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}