import React, { useEffect, useRef } from "react";

const THREE = window.THREE;
export const ThreeScape = ({ shroomArray }) => {
  const sherm = useRef(0);
  console.log(THREE);
  useEffect(() => {
    if (sherm.current.length === shroomArray.length) return;
    sherm.current = shroomArray;
    console.log(sherm.current);
  }, [shroomArray]);
  return <div />;
};

export default ThreeScape;
