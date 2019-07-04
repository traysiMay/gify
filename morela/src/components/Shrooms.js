import React, { useState, useEffect, useContext } from "react";
import Three from "../utils/threeFunctions";
import ThreeContext from "../state/ThreeContext";
const THREE = window.THREE;

const Shrooms = ({ shroomArray }) => {
  const { camera, scene, animator } = useContext(ThreeContext);
  const [objArray, setShroomObjArray] = useState([]);
  // const loadAllShrooms = async () => {
  //   for (let i = objArray.length; i <= shroomyArray.length - 1; i++) {
  //     console.log(objArray.length);
  //     await loadNewShroom(shroomyArray[i], i);
  //   }
  //   console.log(loading);
  //   setLoading(false);
  // };
  // const loadNewShroom = async (shroom, i) => {
  //   const loader = new THREE.ObjectLoader();
  //   await loader.load("./blacky.json", async obj => {
  //     obj.children[0].material.color = shroom;
  //     obj.position.x += i / 2 - 10;
  //     scene.add(obj);
  //     console.log(obj);
  //     setShroomArray([...objArray, obj]);
  //   });
  //   return;
  // };

  const loadShrooms = () => {
    camera.position.set(0, 1, -10);
    var loader = new THREE.ObjectLoader();
    const mushroomModels = ["shroomy.json", "blacky.json"];
    const sArray = [];
    loader.load(`./${mushroomModels[1]}`, obj => {
      obj.children[0].material.color = shroomArray[0];
      //obj.children[0].material.color = color;
      scene.add(obj);
      sArray.push(obj);
      for (let i = 0; i < shroomArray.length - 40; i++) {
        const mesh = obj.clone();
        mesh.position.x += i + 5;
        mesh.children[0].material.color = shroomArray[i];
        scene.add(mesh);
        sArray.push(mesh);
      }
      console.log(sArray);
    });
    setShroomObjArray(sArray);

    var light = new THREE.AmbientLight("pink"); // soft white light
    scene.add(light);
    const objArray = sArray;
    const shroomAnimation = () => {
      if (objArray.length > 0) {
        for (let i = 0; i < objArray.length; i++) {
          objArray[i].rotation.y +=
            0.1 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.01;
          objArray[i].rotation.x +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.05;
          objArray[i].scale.y += 0.01 * Math.sin(Date.now() * Math.PI * 0.0001);
          objArray[i].scale.x +=
            0.001 * Math.sin(Date.now() * Math.PI * 0.0001) * i;
        }
      }
    };
    return shroomAnimation;
  };

  // CORRECT BEHAVIOR
  // initially load all shrooms in the shroom array
  // if a new shroom is added, add it to the shroom array DO NOT RELOAD THE INIT (.e.g throw it into the animation loop?)
  useEffect(() => {
    console.log(shroomArray);
    if (!shroomArray) return;
    const shroomAnimation = loadShrooms();
    console.log(objArray);
    animator(shroomAnimation);
  }, [shroomArray]);

  // useEffect(() => {
  //   if (!shroomyArray) return;
  //   loadAllShrooms();
  // }, [shroomyArray]);

  return <div />;
};

export default Shrooms;
