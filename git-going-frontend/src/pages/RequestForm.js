import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Layout } from "../components/layouts";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function MiningForm() {
  const classes = useStyles();

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} style={{ marginTop: "30%" }}>

          <Avatar
            style={{ backgroundColor: "black" }}
            className={classes.large}
          >
            <GitHubIcon fontSize="large" color="inherit" />
          </Avatar>

          <Typography component="h1" variant="h5">
            We Don't Have it? Request it!
          </Typography>

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="owner"
                  name="repoOwner"
                  variant="outlined"
                  required
                  fullWidth
                  id="repoOwner"
                  label="Repo Owner"
                  autoFocus
                />
              </Grid>
              <Typography
                component="h1"
                variant="h5"
                style={{ margin: "auto" }}
              >
                /
              </Typography>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="repo"
                  name="repo"
                  variant="outlined"
                  required
                  fullWidth
                  id="repo"
                  label="Repo"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit Request
            </Button>
          </form>
        </div>
      </Container>
    </Layout>
  );
}
