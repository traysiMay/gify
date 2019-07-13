import React, { useContext, useEffect, useRef, useState } from "react";
import ThreeContext from "../state/ThreeContext";
const THREE = window.THREE;

const randNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;
export const ThreeScape = ({ shroomArray, sporeArray }) => {
  const shroomRefs = useRef([]);
  const sporeRefs = useRef([]);
  const { scene, camera, animator, objArray } = useContext(ThreeContext);

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
    if (shroomRefs.current.length === shroomArray.length) return;
    for (let i = shroomRefs.current.length; i < shroomArray.length; i++) {
      loadNewShroom(shroomArray[i], i);
    }
    shroomRefs.current = shroomArray;
    console.log("shroomeffect", scene);
  }, [shroomArray]);

  useEffect(() => {
    if (sporeArray.length === undefined) return;
    if (sporeRefs.current.length === sporeArray.length) return;
    const geometry = new THREE.SphereGeometry(1, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      transparent: true
    });

    for (let i = sporeRefs.current.length; i < sporeArray.length; i++) {
      const sphere = new THREE.Mesh(geometry.clone(), material.clone());
      console.log(sporeArray[i]);
      sphere.material.color = sporeArray[i];
      sphere.material.opacity = Math.random();
      // sphere.position.x = Math.random() * 12 - 5;
      // sphere.position.y = Math.random() * 12 - 5;
      sphere.position.z = Math.random() * 12 - 5;
      scene.add(sphere);
      objArray.current.push(sphere);
    }
    sporeRefs.current = sporeArray;
  });

  useEffect(() => {
    console.log("scene effect", scene);
    camera.position.set(0, 1, -10);

    var light = new THREE.AmbientLight("pink"); // soft white light
    scene.add(light);
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
    };
    animator(objLoop);
    return () => console.log("dismounted");
  }, [scene]);

  useEffect(() => {
    console.log("mount");
    return () => console.log("dismount");
  }, []);
  return <div>{JSON.stringify(shroomRefs.current)}</div>;
};

export default ThreeScape;
