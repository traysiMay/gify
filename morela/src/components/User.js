import React, { useContext } from "react";
import UserContext from "../state/UserContext";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 40% auto 40%;
  color: white;
  font-family: "Open Sans", sans-serif;
`;

const Header = styled.h1`
  grid-column-start: 2;
  text-align: center;
  font-size: 60px;
`;

const SporeRow = styled.div`
  grid-column-start: 2;
`;

export const User = () => {
  const { spores } = useContext(UserContext);
  return (
    <Container>
      <Header>PROFILE</Header>
      {spores.length > 0 &&
        spores[0].map((r, i) => <SporeRow key={"spore" + i}>{r}</SporeRow>)}
    </Container>
  );
};

export default User;
