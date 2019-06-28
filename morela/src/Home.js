import React, { useRef, useEffect } from "react";
const THREE = window.THREE;

// idears:
// create states for various shroom layouts
// state changes render
// state is managed by a reducer store
export const Home = () => {
  const container = useRef();
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 1, -10);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current.appendChild(renderer.domElement);

    var loader = new THREE.ObjectLoader();
    const shroomArray = [];
    loader.load("./shroomy.json", obj => {
      scene.add(obj);
      shroomArray.push(obj);
      for (let i = 0; i < 0; i++) {
        const mesh = obj.clone();
        mesh.position.y += i;
        scene.add(mesh);
        shroomArray.push(mesh);
      }
    });
    var light = new THREE.AmbientLight("pink"); // soft white light
    scene.add(light);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      if (shroomArray.length > 0) {
        for (let i = 0; i < shroomArray.length; i++) {
          shroomArray[i].rotation.y +=
            0.1 * Math.sin(Date.now() * Math.PI * 0.0001);
          shroomArray[i].rotation.x +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001);

          shroomArray[i].scale.y +=
            0.01 * Math.sin(Date.now() * Math.PI * 0.0001);
          shroomArray[i].scale.x +=
            0.001 * Math.sin(Date.now() * Math.PI * 0.0001);
        }
      }
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return <div ref={container} />;
};
