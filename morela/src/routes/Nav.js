import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AliceProfile from "../components/svg/AliceProfile";
import ShroomHouse from "../components/svg/ShroomHouse";

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
`;

export const Nav = () => {
  return (
    <Fragment>
      <LinkContainer>
        <LinkWrapper>
          <StyledLink to="/user">
            <AliceProfile />
          </StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink to="/">
            <ShroomHouse />
          </StyledLink>
        </LinkWrapper>
      </LinkContainer>
    </Fragment>
  );
};

export default Nav;
