import React, { useEffect, useContext, useState } from "react";
import DrizzleContext from "../state/Context";
import ThreeScape from "./ThreeScape";

export const Home = () => {
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);
  const [shroomArray, setShroomArray] = useState([]);
  const transhroomtation = drizzle.contracts.Transhroomtation;

  useEffect(() => {
    const getLastColor = async () => {
      const shroomLength = await transhroomtation.methods
        .getShroomsLength()
        .call();
      const sArray = [];
      for (let i = 0; i < shroomLength; i++) {
        const shroomObj = await transhroomtation.methods.getShroom(i).call();
        sArray.push(shroomObj);
      }
      setShroomArray(sArray);
    };
    getLastColor();
  }, [drizzleState, transhroomtation.methods]);

  return (
    <div>
      <ThreeScape shroomArray={shroomArray} />
    </div>
  );
};