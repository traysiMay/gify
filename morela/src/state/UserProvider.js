import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [spores, setSpores] = useState([]);
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
