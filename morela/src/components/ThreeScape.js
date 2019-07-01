import React, { useContext } from "react";
import Shrooms from "./Shrooms";
import Three from "../utils/threeFunctions";
import ThreeContext from "../state/ThreeContext";
const THREE = window.THREE;
export const ThreeScape = () => {
  const { scene } = useContext(ThreeContext);
  return <div>wtff</div>;
};

export default ThreeScape;
