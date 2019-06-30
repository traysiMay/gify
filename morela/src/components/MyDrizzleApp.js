import React, { useContext, useEffect, useState } from "react";
import DrizzleContext from "../state/Context";
import * as loadingAnimation from "./animations/loading.json";
import GifyLogo from "./svg/GifyLogo";
import Lottie from "react-lottie";

const animationOptions = {
  autoplay: true,
  animationData: loadingAnimation.default,
  loop: false
};

const MyDrizzleApp = () => {
  const dContext = useContext(DrizzleContext.Context);
  const { drizzle, drizzleState, initialized } = dContext;
  const [cname, setName] = useState("");
  const [animationDone, animationFinished] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!initialized) return;
    drizzle.contracts.Morels.methods
      .name()
      .call()
      .then(setName);
  }, [drizzleState, initialized, drizzle.contracts.Morels]);
  return (
    <div>
      {!initialized || !animationDone ? (
        <Lottie
          options={animationOptions}
          eventListeners={[
            { eventName: "complete", callback: () => animationFinished(true) }
          ]}
        />
      ) : (
        <div>
          <input
            onChange={e => {
              setInputValue(e.currentTarget.value);
            }}
          />
          <button
            onClick={() => {
              const stackId = drizzle.contracts.Morels.methods.setName.cacheSend(
                inputValue,
                {
                  from: drizzleState.accounts[0]
                }
              );
              console.log(stackId);
            }}
          >
            suBMIT
          </button>
          <h3 style={{ color: "white" }}>{cname}</h3>
        </div>
      )}
      <div style={{ position: "absolute", width: "100%" }}>
        <GifyLogo />
      </div>
    </div>
  );
};

export default MyDrizzleApp;
