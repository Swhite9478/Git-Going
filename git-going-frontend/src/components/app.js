import React, {Component} from 'react';
import { Header, Footer } from './layouts';

export default class App extends Component {
    render() {
        return <div>
                <Header />
                <p>Here is some content in the app</p>
                <Footer />
            </div>
    }
}