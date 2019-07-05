import React, { useContext, useEffect, useRef, useState } from "react";
import ThreeContext from "../state/ThreeContext";
const THREE = window.THREE;
export const ThreeScape = ({ shroomArray }) => {
  const sherm = useRef([]);
  const { scene, camera, animator, objArray } = useContext(ThreeContext);
  const [activeShrooms, setActiveShrooms] = useState([]);

  const loadNewShroom = async (shroom, i) => {
    const loader = new THREE.ObjectLoader();
    await loader.load("./blacky.json", async obj => {
      obj.children[0].material.color = shroom;
      obj.position.x += i / 2;
      scene.add(obj);
      objArray.current.push(obj);
    });
  };

  useEffect(() => {
    if (shroomArray.length === undefined) return;
    if (sherm.current.length === shroomArray.length) return;
    console.log(sherm.current.length, shroomArray.length);
    for (let i = sherm.current.length; i < shroomArray.length; i++) {
      loadNewShroom(shroomArray[i], i);
    }
    sherm.current = shroomArray;
    console.log("shroomeffect", scene);
  }, [shroomArray]);

  useEffect(() => {
    console.log("scene effect", scene);
    camera.position.set(0, 1, -10);
    var light = new THREE.AmbientLight("pink"); // soft white light
    scene.add(light);
    const chicken = o => {
      const objArray = o.current;
      if (objArray.length > 0) {
        for (let i = 0; i < objArray.length; i++) {
          objArray[i].rotation.y +=
            0.1 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.001;
          objArray[i].rotation.x +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.001;
          objArray[i].scale.y += 0.01 * Math.sin(Date.now() * Math.PI * 0.0001);
          objArray[i].scale.x +=
            0.001 * Math.sin(Date.now() * Math.PI * 0.0001) * i;
        }
      }
    };
    animator(chicken);
    return () => console.log("dismounted");
  }, [scene]);

  useEffect(() => {
    console.log("mount");
    return () => console.log("dismount");
  }, []);
  return <div>{JSON.stringify(sherm.current)}</div>;
};

export default ThreeScape;
