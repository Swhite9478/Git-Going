import React, { Fragment } from "react";
import styled from "styled-components";

import logo from "../../assets/logo.svg";

const Brand = () => {
  
  return (
      <div>
        <Image src={logo} alt="Company Logo" />
        <Text>Git-Going</Text>
      </div>
  ); 
};

export default Brand;

const Image = styled.img`
  height: 85%;
  position: absolute;
  margin: auto 0;
  top: 5px;
  left: 16px;
  float: left;
`;

const Text = styled.h3`
  color: white;
  font-weight: 600;
  position: absolute;
  display: inline;
  border-bottom: 1px solid transparent;
  justify-self: end;
  margin: auto 0;
  padding:0;
  
  top: 1.2rem;
  left: 7rem;
`;
