import React, { useEffect, useRef, useContext } from "react";
import ThreeContext from "./ThreeContext";
import UserContext from "./UserContext";
const THREE = window.THREE;
const defaultCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const scene = new THREE.Scene();
const camera = defaultCamera;
const renderer = new THREE.WebGLRenderer(document.getElementById("screen"));
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
const light = new THREE.AmbientLight("white"); // soft white light
scene.add(light);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const ThreeProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const container = useRef();
  const firstClick = useRef(false);

  const explosionRef = useRef([]);

  const clearObjects = () => {
    for (let i = 0; i < objArray.current.length; i++) {
      scene.remove(objArray.current[i]);
    }
    objArray.current = [];
    shroomsShown.current = [];
  };

  const objArray = useRef([]);
  const updateObjArray = () => {
    return objArray;
  };

  const shroomsShown = useRef([]);
  const getShroomsShown = () => {
    return shroomsShown;
  };

  const caughtSpores = useRef([]);
  const updateCaughtSpores = () => {
    userContext.addSpore(caughtSpores.current);
  };
  const getCaughtSpores = () => {
    return caughtSpores.current;
  };

  const mouseClick = event => {
    let x = event.clientX;
    let y = event.clientY;
    if (event.touches && event.touches.length > 0) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
    firstClick.current = true;
  };

  window.addEventListener("mouseup", mouseClick, false);
  window.addEventListener("touchstart", mouseClick, false);

  function onWindowResize() {
    console.log("resize");
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize, false);

  let myReq;
  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current.appendChild(renderer.domElement);

    return () => {
      window.cancelAnimationFrame(myReq);
    };
  }, [container, myReq]);

  const cancelAnimator = () => {
    window.cancelAnimationFrame(myReq);
    updateCaughtSpores();
    window.removeEventListener("mousedown", mouseClick, false);
  };

  const exploder = () => {};

  const animator = innerFunction => {
    const animate = () => {
      let time = Date.now() * 0.0001;
      myReq = requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (firstClick.current) {
        for (let i = 0; i < intersects.length; i++) {
          const iObj = intersects[i].object;
          iObj.material.color = { r: 255, g: 0, b: 255 };
          if (!caughtSpores.current.includes(iObj)) {
            caughtSpores.current.push(iObj);
            explosionRef.current.push(iObj);
          }
        }
      }
      for (let i = 0; i < explosionRef.current.length; i++) {
        const o = explosionRef.current[i];
        o.scale.x += Math.sin(time * 0.001);
        o.scale.y += Math.sin(time * 0.001);
        o.scale.z += Math.sin(time * 0.001);
        o.material.opacity -= 0.01;
        o.internalTimer += 1;
        if (o.material.opacity < 0) {
          explosionRef.current.splice(i, 1);
        }
      }
      // exploder();
      mouse.x = 99999;
      mouse.y = 99999;
      if (controls) controls.update();
      const objs = updateObjArray();
      innerFunction(objs);
      renderer.render(scene, camera);
    };
    animate();
  };
  return (
    <ThreeContext.Provider
      value={{
        animator,
        camera,
        cancelAnimator,
        controls,
        container,
        clearObjects,
        getCaughtSpores,
        getShroomsShown,
        objArray,
        mouse,
        raycaster,
        renderer,
        scene,
        shroomsShown,
        // setCamera,
        // setControls,
        // setMouse,
        // setRayCaster,
        // setRenderer,
        // setScene,
        updateCaughtSpores
      }}
    >
      <div style={{ display: "none" }} ref={container} />
      {/* <div ref={sporeDiv} /> */} {children}
    </ThreeContext.Provider>
  );
};
export default ThreeProvider;
