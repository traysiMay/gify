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
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
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
    clearObjects,
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
    if (objArray.current.length > 0) {
      objArray.current[0].children[0].material.color = new THREE.Color(shroom);
      return;
    }
    const loader = new THREE.ObjectLoader();
    await loader.load("./yellowDog.json", async obj => {
      obj.children[0].material.color = new THREE.Color(shroom);
      scene.add(obj);
      objArray.current.push(obj);
      // shroomsShown.current.push(shroom.id);
    });
  };

  const onChange = e => {
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
      return color;
    });

    const colorArray = checkedSpores.map(s => s.bData);
    console.log(colorz);
    const reducedColors = colorz.reduce((allCs, o, i) => {
      if (i === 0) return o;
      console.log(allCs, o);
      const mixedColor = chroma.blend(allCs, o, "multiply").hex();
      return mixedColor;
    }, 0xffffff);
    console.log(reducedColors);
    loadNewShroom(reducedColors);
  };

  const Transhroomtation = () => {
    const color = objArray.current[0].children[0].material.color;
    setTransmuteText("TRANSMUTING...");
    setTimeout(() => setTransmuteText("TRANSMUTE"), 10000);
    const mycelium = drizzle.contracts.Mycelium;

    const tx = mycelium.methods.mintToad.cacheSend(
      color.r * 255,
      color.g * 255,
      color.b * 255
    );

    // const pKey =
    //   "0x" +
    //   "bd881c2a4da5ab0438ee834391bbc4810871bca704babae6d03d0c1a24841e88".toUpperCase();
    // const account = drizzle.web3.eth.accounts.privateKeyToAccount(pKey);
    // drizzle.web3.eth.accounts.wallet.add(account);
    // drizzle.web3.eth.defaultAccount = account.address;
    // const tx = mycelium.methods.mintToad.cacheSend(
    //   color.r * 255,
    //   color.g * 255,
    //   color.b * 255,
    //   {
    //     from: drizzle.web3.eth.defaultAccount,
    //     gas: 750000,
    //     gasPrice: drizzle.web3.utils.toWei("300", "gwei")
    //   }
    // );
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
    // const canvas = document.querySelector("canvas");
    // canvas.style.display = "block";
    // canvas.style.height = window.innerHeight / 2 + "px";
    // canvas.style.width = "100%";
    camera.position.set(0, 1, -10);
    clearObjects();
    const objLoop = o => {
      const objArray = o.current;
      if (objArray.length > 0) {
        for (let i = 0; i < objArray.length; i++) {
          var timer = 0.0001 * Date.now();
        }
      }
    };
    animator(objLoop);
    loadNewShroom({ r: 0, g: 0, b: 0 });
    return () => {
      scene.remove(objArray.current[0]);
    };
    // eslint-disable-next-line
  }, [scene]);

  return (
    <div
      style={{
        position: "absolute",
        top: `${window.innerHeight - window.innerHeight / 2}px`,
        width: "100%"
      }}
    >
      <Container>
        {[0, 1, 2, 3].map((r, i) => (
          <SporeRow
            key={"spore" + i}
            className={checkedSpores.includes(i) ? "red" : "black"}
          >
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
