import React, { useRef, useEffect } from "react";
import useThree from "../utils/threeFunctions";
const THREE = window.THREE;

const Shrooms = () => {
  const container = useRef();
  const { camera, scene, animator } = useThree(container);

  const loadShrooms = () => {
    camera.position.set(0, 1, -20);
    var loader = new THREE.ObjectLoader();
    const shroomArray = [];
    const mushroomModels = ["shroomy.json", "blacky.json"];
    for (let i = 0; i < mushroomModels.length; i++) {
      loader.load(`./${mushroomModels[i]}`, obj => {
        scene.add(obj);
        shroomArray.push(obj);
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
      if (shroomArray.length > 0) {
        for (let i = 0; i < shroomArray.length; i++) {
          shroomArray[i].rotation.y +=
            0.1 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.001;
          shroomArray[i].rotation.x +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001) + i * 0.05;
          shroomArray[i].scale.y +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001);
          shroomArray[i].scale.x +=
            0.001 * Math.sin(Date.now() * Math.PI * 0.0001);
        }
      }
    };
    return shroomAnimation;
  };

  useEffect(() => {
    const shroomAnimation = loadShrooms();
    animator(shroomAnimation);
    // eslint-disable-next-line
  }, []);
  return <div ref={container} />;
};

export default Shrooms;
