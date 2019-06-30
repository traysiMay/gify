import React, { useState, useEffect } from "react";
const Context = React.createContext();

const Provider = ({ drizzle, children }) => {
  const [drizzleState, setDrizzleState] = useState(null);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const drizzUnsub = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        setInitialized(true);
        setDrizzleState(drizzleState);
      }
    });

    return () => {
      drizzUnsub();
    };
  }, [drizzle]);
  return (
    <Context.Provider
      value={{
        drizzle,
        drizzleState,
        initialized
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default {
  Context,
  Provider
};
