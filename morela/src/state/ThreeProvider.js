import React, { useState, useEffect, useRef } from "react";
import ThreeContext from "./ThreeContext";
const THREE = window.THREE;
const defaultCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const ThreeProvider = ({ children }) => {
  const container = useRef();
  const [scene, setScene] = useState(new THREE.Scene());
  const [camera, setCamera] = useState(defaultCamera);
  const [renderer, setRenderer] = useState(new THREE.WebGLRenderer());
  const [controls, setControls] = useState(new THREE.OrbitControls(camera));

  let myReq;
  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current.appendChild(renderer.domElement);

    return () => {
      window.cancelAnimationFrame(myReq);
    };
  }, [container, myReq, renderer]);

  const animator = innerFunction => {
    const animate = () => {
      myReq = requestAnimationFrame(animate);
      if (controls) controls.update();
      innerFunction();
      renderer.render(scene, camera);
    };
    animate();
  };
  return (
    <ThreeContext.Provider
      value={{
        animator,
        camera,
        controls,
        renderer,
        scene,
        setCamera,
        setControls,
        setRenderer,
        setScene
      }}
    >
      <div ref={container} />
      {children}
    </ThreeContext.Provider>
  );
};
export default ThreeProvider;
