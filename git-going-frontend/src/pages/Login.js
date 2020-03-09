import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Layout } from "../components/layouts";
import { constants, asPath } from '../constants/constants';
import bcrypt from 'bcryptjs';
import emailValidator from 'email-validator';
import React, { Component } from 'react';
import '../styles/login.css';

export default class SignInSide extends Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '', isInputDataValid: false}
  }

  handleEncryption = (password) => {
    let SALT_WORK_FACTOR = 10;
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    return bcrypt.hashSync(password, salt);
  }

  isValidEmail = (emailAddress) => {
    return emailValidator.validate(emailAddress);
  }


  onEmailFieldChange = (event) => {
    if(!this.isValidEmail(event.target.value)) {
      this.setState({ errorText: " (Invalid)", isInputDataValid:false});
    } else {
      this.setState({ errorText: '', isInputDataValid:true});
    }
  }

  render() {
    return (
      <Layout>
        <Grid container component="main" className="root">
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className="image" />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className="paper">
              <Avatar className="avatar" style={{ backgroundColor:"#3949ab"}}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{textAlign:"center"}}>
                Sign in
              </Typography>
              <form
                className="form"
                onSubmit={this.props.onSubmit}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={`Email Address${this.state.errorText}`}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={this.state.errorText}
                  onChange={this.onEmailFieldChange.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  style={{margin: "3rem 0rem 2rem"}}
                  disabled={!this.state.isInputDataValid}
                >
                  Sign In
                </Button>
                <div style={{ marginTop: "0rem" }}>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/SignUp" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                    </Grid>
                  </Grid>
                </div>
                <Box mt={5}></Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

