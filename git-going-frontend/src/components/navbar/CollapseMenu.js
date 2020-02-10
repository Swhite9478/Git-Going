import React from "react";
import styled from "styled-components";
import { asPath, constants } from "../../constants/constants";
import { useSpring, animated, config } from "react-spring";

const CollapseMenu = props => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly
  });

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200]
            })
            .interpolate(openValue => `translate3d(0, ${openValue}px, 0`)
        }}
      >
        <NavLinks>
          <NavLinks style={linkAnimation}>
            <li>
              <a href={asPath(constants.HOME)}>Home</a>
            </li>
            <li>
              <a href={asPath(constants.ABOUT)}>About</a>
            </li>
            <li>
              <a href={asPath(constants.REQUEST_REPO)}>Request a Repository</a>
            </li>
            <li>
              <a href={asPath(constants.REPOS)}>Collected Repositories</a>
            </li>
            <li>
              <a href={asPath(constants.SIGNUP)}>Create an Account</a>
            </li>
            <li>
              <a href={asPath(constants.LOGIN)}>Login</a>
            </li>
          </NavLinks>
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #2d3436;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }
  }
`;
