import React, { useEffect, useContext, useState } from "react";
import DrizzleContext from "../state/Context";
import Shrooms from "./Shrooms";
import ThreeScape from "./ThreeScape";
import ThreeProvider from "../state/ThreeProvider";

export const Home = () => {
  const dContext = useContext(DrizzleContext.Context);
  const { drizzle, drizzleState, initialized } = dContext;
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [shroomArray, setShroomArray] = useState([]);
  useEffect(() => {
    if (!initialized) return;
    const transhroomtation = drizzle.contracts.Transhroomtation;
    const getLastColor = async () => {
      const shroomLength = await transhroomtation.methods
        .getShroomsLength()
        .call();
      const sArray = [];
      for (let i = 0; i < shroomLength; i++) {
        const shroomObj = await transhroomtation.methods.getShroom(i);
        sArray.push(shroomObj);
      }

      setShroomArray(sArray);
      const lastColor = await transhroomtation.methods
        .getShroom(shroomLength - 1)
        .call();
      setColor(lastColor);
    };
    getLastColor();
  }, [drizzleState]);
  return <Shrooms color={color} shroomArray={shroomArray} />;
  // return <ThreeScape />;
};
