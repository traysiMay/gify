import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AliceProfile from "../components/svg/AliceProfile";
import Hypha from "../components/svg/Hypha";
import SingleShroom from "../components/svg/SingleShroom";

const StyledLink = styled(Link)`
  color: red;
`;

const LinkWrapper = styled.div`
  position: relative;
  padding: 1rem;
`;

const LinkContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 150px;
  z-index: 4;
`;

export const Nav = () => {
  return (
    <Fragment>
      <LinkContainer>
        <LinkWrapper>
          <StyledLink to="/checkout">
            <AliceProfile />
          </StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink to="/duser">
            <Hypha />
          </StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink to="/">
            <SingleShroom />
          </StyledLink>
        </LinkWrapper>
      </LinkContainer>
    </Fragment>
  );
};

export default Nav;
