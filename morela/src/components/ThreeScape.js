import React, { useContext, useEffect, useRef } from "react";
import ThreeContext from "../state/ThreeContext";
import UserContext from "../state/UserContext";
const THREE = window.THREE;

// const randNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const ThreeScape = ({ shroomArray, sporeArray }) => {
  const userContext = useContext(UserContext);
  const shroomRefs = useRef([]);
  const sporeRefs = useRef([]);
  const {
    scene,
    camera,
    cancelAnimator,
    container,
    animator,
    getCaughtSpores,
    objArray,
    raycaster,
    mouse
  } = useContext(ThreeContext);
  const loadNewShroom = async (shroom, i) => {
    const loader = new THREE.ObjectLoader();
    await loader.load("./blacky.json", async obj => {
      obj.children[0].material.color = shroom;
      obj.position.x += i / 2;
      scene.add(obj);
      objArray.current.push(obj);
    });
  };

  useEffect(
    () => {
      if (shroomArray.length === undefined) return;
      if (shroomRefs.current.length === shroomArray.length) return;
      for (let i = shroomRefs.current.length; i < shroomArray.length; i++) {
        loadNewShroom(shroomArray[i], i);
      }
      shroomRefs.current = shroomArray;
      console.log("shroomeffect", scene);
    },
    // eslint-disable-next-line
    [shroomArray, scene]
  );

  useEffect(() => {
    if (sporeArray.length === undefined) return;
    if (sporeRefs.current.length === sporeArray.length) return;
    const geometry = new THREE.SphereGeometry(1, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      transparent: true
    });

    const caughtSpores = getCaughtSpores();
    console.log(caughtSpores, sporeArray);
    if (caughtSpores.length === 0) {
      for (let i = sporeRefs.current.length; i < sporeArray.length; i++) {
        const sphere = new THREE.Mesh(geometry.clone(), material.clone());
        sphere.material.color = sporeArray[i];
        sphere.material.opacity = Math.random();
        sphere.position.z = Math.random() * 12 - 5;
        sphere.sporeId = i;
        scene.add(sphere);
        objArray.current.push(sphere);
        sporeRefs.current = sporeArray;
      }
    }
  });

  useEffect(() => {
    console.log("scene effect", scene);
    console.log(container);
    container.current.style.display = "block";
    document.querySelector("canvas").style.display = "block";
    camera.position.set(0, 1, -10);

    var light = new THREE.AmbientLight("pink"); // soft white light
    scene.add(light);
    // this by nature can't be dynamic because I am a fucking dumb ass
    const objLoop = o => {
      const objArray = o.current;
      if (objArray.length > 0) {
        for (let i = 0; i < objArray.length; i++) {
          var timer = 0.0001 * Date.now();
          const sphere = objArray[i];
          sphere.position.x = 10 * Math.cos(timer + i);
          sphere.position.y = 10 * Math.sin(timer + i * 1.1);

          // need some sort of random motion?
          // const a = 5000;
          // const p = 1;
          // const v = 0.002;
          // objArray[i].position.y = a * Math.sin(Date.now() * Math.PI * v) * p;
          // objArray[i].position.x = a * Math.sin(Date.now() * Math.PI * v) * p;
          // objArray[i].position.z =
          //   a * Math.sin(Date.now() * Math.PI * v) + i * p;
          // objArray[i].scale.y +=
          //   0.01 * Math.sin(Date.now() * Math.PI * 0.00001);
          // objArray[i].scale.x +=
          //   0.001 * Math.sin(Date.now() * Math.PI * 0.0001) * i;
        }
      }
      const intersects = raycaster.intersectObjects(scene.children);
      // if (firstClick.current) {
      for (let i = 0; i < intersects.length; i++) {
        const iObj = intersects[i].object;
        iObj.material.color = { r: 255, g: 0, b: 255 };
        // if (!caughtSpores.current.includes(iObj.sporeId)) {
        //   caughtSpores.current.push(iObj.sporeId);
        //   // updateCaughtSpores();
        // }
        // }
      }
      mouse.x = 99999;
      mouse.y = 99999;
    };
    animator(objLoop);
    return () => console.log("dismounted");
    // eslint-disable-next-line
  }, [scene]);

  useEffect(() => {
    console.log("mount");
    // window.addEventListener(
    //   "click",
    //   setCaughtSporeArray(updateCaughtSpores),
    //   false
    // );
    return () => {
      console.log("dismount");
      document.querySelector("canvas").style.display = "none";
      cancelAnimator();
    };
    // eslint-disable-next-line
  }, []);
  return <div>{JSON.stringify(userContext.spores)}</div>;
};

export default ThreeScape;
