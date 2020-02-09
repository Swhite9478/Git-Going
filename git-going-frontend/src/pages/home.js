import React, {Component} from 'react';
import { Header, Footer } from '../components/layouts';


export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Hello World! This is from React</h1>
                <Footer />
            </div>
        );
    }
}
