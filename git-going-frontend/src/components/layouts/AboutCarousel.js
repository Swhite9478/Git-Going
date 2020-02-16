import React from "react";
import { Carousel } from "react-responsive-carousel";
import minedRepos from "../../assets/minedRepos.png";
import tableImage from "../../assets/minedRepoTable.png";
import visualization1 from "../../assets/git-oss-um-visualization-1.png";
import visualization2 from "../../assets/git-oss-um-linechart-2.png";
import capstoneLogo from "../../assets/CapstoneLogo300.jpg";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  carouselImage: {
     height: '100%',
      position: 'absolute',
      margin: 'auto 0',
      top: '0px',
      left: '0px',
      float: 'left'
  }
}));

export default () =>{ 
  const classes = useStyles();
  return (
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    transitionTime={350}
    interval={5000}
    useKeyboardArrows
  >
    <div>
      <img src={capstoneLogo} className={classes.carouselImage} />
    </div>
    <div>
      <img src={minedRepos} />
    </div>
    <div>
      <img src={tableImage} />
    </div>
    <div>
      <img src={visualization1} />
    </div>
    <div>
      <img src={visualization2} />
    </div>
  </Carousel>
);}
