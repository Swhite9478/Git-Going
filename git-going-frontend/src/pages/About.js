import React from 'react';
import { Layout } from '../components/layouts';
import Carousel from '../components/layouts/AboutCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  carousel: {
    paddingTop: "1rem",
    margin: "auto",
    width: "50%",
  }
}));

export default function About() {

    const classes = useStyles();
        return (
          <div>
            <Layout>
              <div className={classes.carousel}>
                <Carousel />
              </div>
            </Layout>
          </div>
        );
}

