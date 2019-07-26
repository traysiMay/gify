import React, { useContext, useState } from "react";
import DrizzleContext from "../state/Context";
import UserContext from "../state/UserContext";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr 20%;
  color: white;
  font-family: "Open Sans", sans-serif;
  justify-content: center;
`;

const Header = styled.h1`
  grid-column-start: 2;
  text-align: center;
  font-size: 60px;
`;

const SporeRow = styled.div`
  grid-column-start: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 1px white dotted;
  padding: 5%;
  font-size: 30px;

  > div,
  input {
    margin: auto;
  }
`;

const TransmuteButton = styled.div`
  grid-column-start: 2;
  background: red;
  width: 200px;
  height: 100px;
  border: 2px white solid;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

const ColorCircle = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  /* background: ${props =>
    `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`}; */
    background: ${props => `${props.color}`};
`;

const COLOR_PALETTE = ["#2d3561", "#c05c7e", "#f3826f", "#ffb961"];
const User = () => {
  const [checkedSpores, setCheckedSpores] = useState([]);
  const { spores } = useContext(UserContext);
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);

  const onChange = e => {
    const sporeId = parseInt(e.target.id.replace("check-", ""));
    if (e.target.checked) {
      const checkedSpore = spores[0].filter(s => s.id === sporeId)[0];
      setCheckedSpores([...checkedSpores, checkedSpore]);
    } else {
      setCheckedSpores(checkedSpores.filter((s, i) => s.id !== sporeId));
    }
  };

  const Transhroomtation = () => {
    const colorArray = checkedSpores.map(s => s.bData);

    const reducedColors = colorArray.reduce(
      (allColors, obj) => {
        const redChannel = parseInt(allColors.r) + parseInt(obj.r);
        const blueChannel = parseInt(allColors.b) + parseInt(obj.b);
        const greenChannel = parseInt(allColors.g) + parseInt(obj.g);

        allColors.r = redChannel;
        allColors.g = greenChannel;
        allColors.b = blueChannel;
        return allColors;
      },
      { r: 0, g: 0, b: 0 }
    );

    const pKey =
      "0x" +
      "beac553814373bee4735f6dffe1ecbf6f4d37e8248a58ad91885f4f9fe384dcd".toUpperCase();
    const account = drizzle.web3.eth.accounts.privateKeyToAccount(pKey);
    drizzle.web3.eth.accounts.wallet.add(account);
    drizzle.web3.eth.defaultAccount = account.address;
    const mycelium = drizzle.contracts.Mycelium;
    const tx = mycelium.methods.mintToad.cacheSend(
      reducedColors.r,
      reducedColors.g,
      reducedColors.b,
      {
        from: drizzle.web3.eth.defaultAccount,
        gas: 750000,
        gasPrice: drizzle.web3.utils.toWei("300", "gwei")
      }
    );
    console.log(tx);
  };

  return (
    <Container>
      <Header>PROFILE</Header>
      {spores.length > 0 &&
        spores[0].map((r, i) => (
          <SporeRow key={"spore" + i}>
            <input id={`check-${r.id}`} onChange={onChange} type="checkbox" />
            <div>{r.id}</div>
            {/* <ColorCircle color={[r.bData.r, r.bData.g, r.bData.b]} /> */}
            <ColorCircle color={COLOR_PALETTE[i]} />
          </SporeRow>
        ))}
      <TransmuteButton onClick={Transhroomtation}>TRANSMUTE</TransmuteButton>
    </Container>
  );
};

export default User;
