import React, { useState } from "react";
import UserContext from "./UserContext";

const defaultSpores = [
  [
    { bData: { r: 255, g: 0, b: 0 }, id: 0 },
    { bData: { r: 255, g: 255, b: 0 }, id: 1 },
    { bData: { r: 255, g: 0, b: 255 }, id: 2 }
  ]
];

const UserProvider = ({ children }) => {
  const [spores, setSpores] = useState(defaultSpores);
  const addSpore = newSpores => {
    setSpores([newSpores]);
  };
  return (
    <UserContext.Provider value={{ spores, setSpores, addSpore }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
