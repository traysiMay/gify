import React from "react";
import { Drizzle, generateStore } from "drizzle";
import Context from "./Context";
import Mycelium from "../contracts/Mycelium.json";
const options = {
  contracts: [Mycelium],
  web3: {
    fallback: {
      type: "ws",
      url: "wss://ropsten.infura.io/ws"
    }
  }
};
// wss://ropsten.infura.io/ws
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const Provider = ({ children }) => {
  return <Context.Provider drizzle={drizzle}>{children}</Context.Provider>;
};

export default Provider;
