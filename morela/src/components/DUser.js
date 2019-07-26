import React, { useContext, useState, useEffect } from "react";
import DrizzleContext from "../state/Context";
import ThreeContext from "../state/ThreeContext";
import styled from "styled-components";
import chroma from "chroma-js";
const THREE = window.THREE;

const Container = styled.div`
  display: flex;
  /* grid-template-columns: 20% 1fr 20%; */
  flex-direction: row;
  flex-wrap: wrap;
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
  grid-template-columns: 1fr;
  align-items: center;
  /* border: 1px white dotted; */
  padding: 5%;
  font-size: 30px;
  border-radius: 50%;

  > div,
  input {
    margin: auto;
  }

  &.red {
    background: red;
  }
`;

const TransmuteButton = styled.div`
  margin: 10px;
  grid-column-start: 2;
  width: 200px;
  height: 100px;
  border: 2px white solid;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  background: ${props => `${props.color}`};
`;

const ColorCircle = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  /* background: ${props =>
    `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`}; */
    background: ${props => `${props.color}`};
`;

const INITIAL_PALETTE = ["#2d3561", "#c05c7e", "#f3826f", "#ffb961"];
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}
const DUser = () => {
  const [checkedSpores, setCheckedSpores] = useState([]);
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);
  const [COLOR_PALETTE, setColors] = useState(INITIAL_PALETTE);

  const [transmuteText, setTransmuteText] = useState("TRANSMUTE");

  const {
    scene,
    camera,
    cancelAnimator,
    container,
    animator,
    getCaughtSpores,
    getShroomsShown,
    objArray,
    raycaster,
    shroomsShown,
    mouse
  } = useContext(ThreeContext);

  const loadNewShroom = async (shroom, i) => {
    const loader = new THREE.ObjectLoader();
    await loader.load("./blacky.json", async obj => {
      console.log(shroom);
      obj.children[0].material.color = shroom;
      // obj.position.x += i / 2;
      // obj.position.y += i / 2;
      // obj.position.z += i / 2;
      scene.add(obj);
      objArray.current.push(obj);
      shroomsShown.current.push(shroom.id);
    });
  };

  const onChange = e => {
    console.log(e.target);
    const sporeId = parseInt(e.target.id.replace("check-", ""));
    if (!checkedSpores.includes(sporeId)) {
      setCheckedSpores([...checkedSpores, sporeId]);
    } else {
      setCheckedSpores(checkedSpores.filter(s => s !== sporeId));
    }
  };
  const mix = () => {
    const colorz = checkedSpores.map(s => {
      const el = document.getElementById("check-" + s);
      const color = el.getAttribute("color");

      return hexToRgb(color);
    });
    const colorArray = checkedSpores.map(s => s.bData);
    const reducedColors = colorz.reduce(
      (allCs, o, i) => {
        if (i === 0) return o;
        console.log(o, i);
        const mixedColor = chroma.blend(allCs, o, "multiply");
        return {
          r: mixedColor._rgb[0] * 10,
          g: mixedColor._rgb[1] * 10,
          b: mixedColor._rgb[2] * 10
        };
      },
      { r: 0, b: 0, g: 0 }
    );
    loadNewShroom(reducedColors);
  };
  const Transhroomtation = () => {
    setTransmuteText("TRANSMUTING...");
    setTimeout(() => setTransmuteText("TRANSMUTE"), 10000);
    const colorz = checkedSpores.map(s => {
      const el = document.getElementById("check-" + s);
      const color = el.getAttribute("color");

      return hexToRgb(color);
    });
    const colorArray = checkedSpores.map(s => s.bData);
    const reducedColors = colorz.reduce(
      (allCs, o, i) => {
        if (i === 0) return o;
        console.log(o, i);
        const mixedColor = chroma.blend(allCs, o, "multiply");
        return {
          r: mixedColor._rgb[0] * 10,
          g: mixedColor._rgb[1] * 10,
          b: mixedColor._rgb[2] * 10
        };
      },
      { r: 0, b: 0, g: 0 }
    );
    const pKey =
      "0x" +
      "C835422EC7427468E1C8A95B1BECE688E01DE481D26F66AEF672801EEE3AD875".toUpperCase();
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

  const changeColorz = () => {
    const one = chroma.random();
    const two = chroma.random();
    const three = chroma.random();
    const four = chroma.random();
    const newColors = [one, two, three, four];
    setColors(newColors);
  };

  useEffect(() => {
    console.log("scene effect", scene);
    container.current.style.display = "block";
    const canvas = document.querySelector("canvas");
    canvas.style.display = "block";
    canvas.style.height = window.innerHeight / 2 + "px";
    canvas.style.width = "100%";
    camera.position.set(0, 1, -10);

    var light = new THREE.AmbientLight("pink"); // soft white light
    scene.add(light);
    // this by nature can't be dynamic because I am a fucking dumb ass
    const objLoop = o => {
      const objArray = o.current;
      if (objArray.length > 0) {
        for (let i = 0; i < objArray.length; i++) {
          var timer = 0.0001 * Date.now();
          // const sphere = objArray[i];
          // sphere.position.x = 10 * Math.cos(timer + i);
          // sphere.position.y = 10 * Math.sin(timer + i * 1.1);

          // // need some sort of random motion?
          // const a = 15;
          // const p = 1;
          // const v = 0.02;

          // objArray[i].scale.y +=
          //   0.01 * Math.sin(Date.now() * Math.PI * 0.00001);
          // objArray[i].scale.x +=
          //   0.01 * Math.sin(Date.now() * Math.PI * 0.0001) * i;

          // objArray[i].rotation.y +=
          //   0.01 * Math.sin(Date.now() * Math.PI * 0.00001);
          // objArray[i].rotation.x +=
          //   0.01 * Math.sin(Date.now() * Math.PI * 0.0001) * i;
        }
      }
    };
    animator(objLoop);
    loadNewShroom({ r: 10, g: 10, b: 100 });
    return () => console.log("dismounted");
    // eslint-disable-next-line
  }, [scene]);

  return (
    <div>
      <Container>
        {/* <Header>PROFILE</Header> */}
        {[0, 1, 2, 3].map((r, i) => (
          <SporeRow
            key={"spore" + i}
            className={checkedSpores.includes(i) ? "red" : "black"}
          >
            {/* <input id={`check-${r.id}`} onChange={onChange} type="checkbox" />
          <div>{r.id}</div> */}
            {/* <ColorCircle color={[r.bData.r, r.bData.g, r.bData.b]} /> */}
            <ColorCircle
              onClick={onChange}
              id={`check-${i}`}
              color={COLOR_PALETTE[i]}
            />
          </SporeRow>
        ))}
      </Container>
      <Container>
        <TransmuteButton onClick={changeColorz}>CHANGE_COLORZ</TransmuteButton>
        <TransmuteButton onClick={mix}>MIX</TransmuteButton>
        <TransmuteButton
          onClick={
            transmuteText === "TRANSMUTING..."
              ? console.log("nope")
              : Transhroomtation
          }
          color={transmuteText === "TRANSMUTING..." && "red"}
        >
          {transmuteText}
        </TransmuteButton>
      </Container>
    </div>
  );
};

export default DUser;
