import React, { useEffect, useRef, useContext } from "react";
import ThreeContext from "./ThreeContext";
import UserContext from "./UserContext";
const THREE = window.THREE;
const defaultCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const scene = new THREE.Scene();
const camera = defaultCamera;
const renderer = new THREE.WebGLRenderer(document.getElementById("screen"));
const controls = new THREE.OrbitControls(camera, renderer.domElement);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const ThreeProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const container = useRef();
  const firstClick = useRef(false);

  const explosionRef = useRef([]);

  const objArray = useRef([]);
  const updateObjArray = () => {
    return objArray;
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
    if (event.touches) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
    firstClick.current = true;
  };

  window.addEventListener("mousedown", mouseClick, false);
  window.addEventListener("touchstart", mouseClick, false);

  function onWindowResize() {
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
    window.removeEventListener("mousedown", mouseClick, false);
  };

  const exploder = () => {
    for (let i = 0; i < explosionRef.current.length; i++) {
      const o = explosionRef.current[i];
      o.scale.x = 10 * Math.sin(o.internalTimer);
      o.scale.y = 10 * Math.sin(o.internalTimer);
      o.scale.z = 10 * Math.sin(o.internalTimer);
      o.material.opacity -= 0.01;
      o.internalTimer += 1;
      if (o.material.opacity < 0) {
        explosionRef.current.splice(i, 1);
      }
    }
  };

  const animator = innerFunction => {
    const animate = () => {
      myReq = requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (firstClick.current) {
        for (let i = 0; i < intersects.length; i++) {
          const iObj = intersects[i].object;
          iObj.material.color = { r: 255, g: 0, b: 255 };
          console.log(iObj.sporeId);
          if (!caughtSpores.current.includes(iObj.sporeId)) {
            iObj.internalTimer = 1;
            caughtSpores.current.push(iObj.sporeId);
            explosionRef.current.push(iObj);
            updateCaughtSpores();
          }
        }
      }

      exploder();
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
        getCaughtSpores,
        objArray,
        mouse,
        raycaster,
        renderer,
        scene,
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
