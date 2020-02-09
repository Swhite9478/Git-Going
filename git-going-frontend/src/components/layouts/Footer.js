import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";


export default class Footer extends Component {
    Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            Git-Going
            {" "}
            {new Date().getFullYear()}
            {"."}
            Created by Stephen White
            </Typography>
        );
    }
    render() {
        return (
            <this.Copyright />
        );
    }
}
