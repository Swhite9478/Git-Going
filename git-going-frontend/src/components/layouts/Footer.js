import React, {Component} from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                Git-Going&copy; {new Date().getFullYear() + ". Created by Stephen White"}
            </footer>
        );
    }
}
