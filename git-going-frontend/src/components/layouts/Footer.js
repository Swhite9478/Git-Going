import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";

const footerStyle = {
  background:"black",
  fontSize: "20px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

function FooterFunc({ children }) {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>{children}</div>
    </div>
  );
}

export default class Footer extends Component {
    
    Copyright() {
        return (
            <Typography variant="body1" color="initial" align="center">
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
            <FooterFunc>
                <this.Copyright/>
            </FooterFunc>
            // <this.Copyright />
        );
    }
}
