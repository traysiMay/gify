import React, { useEffect } from "react";
import Shrooms from "./Shrooms";

export const Home = () => {
  useEffect(() => {
    console.log("home  mounted");
  }, []);
  return <Shrooms />;
};
