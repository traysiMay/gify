import React, { useRef, useEffect, useContext } from "react";
import Three from "../utils/threeFunctions";
import ThreeContext from "../state/ThreeContext";
const THREE = window.THREE;

const Shrooms = ({ color, shroomArray }) => {
  const { camera, scene, animator } = useContext(ThreeContext);
  const loadShrooms = () => {
    camera.position.set(0, 1, -10);
    var loader = new THREE.ObjectLoader();
    const mushroomModels = ["shroomy.json", "blacky.json"];
    console.log(shroomArray);
    const shroomObjArray = [];
    for (let i = 0; i < shroomArray.length; i++) {
      loader.load(`./${mushroomModels[1]}`, obj => {
        obj.children[0].material.color = color;
        //obj.children[0].material.color = color;
        scene.add(obj);
        shroomObjArray.push(obj);
        for (let i = 0; i < 0; i++) {
          const mesh = obj.clone();
          mesh.position.y += i;
          scene.add(mesh);
          shroomArray.push(mesh);
        }
      });
    }

    var light = new THREE.AmbientLight("pink"); // soft white light
    scene.add(light);
    const shroomAnimation = () => {
      if (shroomObjArray.length > 0) {
        for (let i = 0; i < shroomObjArray.length; i++) {
          shroomObjArray[i].rotation.y +=
            0.1 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.001;
          shroomObjArray[i].rotation.x +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.05;
          shroomObjArray[i].scale.y +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001);
          shroomObjArray[i].scale.x +=
            0.001 * Math.sin(Date.now() * Math.PI * 0.0001);
        }
      }
    };
    return shroomAnimation;
  };
  // CORRECT BEHAVIOR
  // initially load all shrooms in the shroom array
  // if a new shroom is added, add it to the shroom array DO NOT RELOAD THE INIT (.e.g throw it into the animation loop?)
  useEffect(() => {
    if (!shroomArray) return;
    const shroomAnimation = loadShrooms();
    animator(shroomAnimation);
    // eslint-disable-next-line
  }, [shroomArray]);

  return <div />;
};

export default Shrooms;
