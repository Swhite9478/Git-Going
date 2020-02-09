import React, {Component} from 'react';
import {Layout} from '../components/layouts';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.nav = props.nav;
        this.state = { nav: this.nav };
    }

    render() {
    return (
        <div>
        <Layout nav={this.nav}>
            <h1>Home Page</h1>
        </Layout>
        </div>
    );
    }
}
