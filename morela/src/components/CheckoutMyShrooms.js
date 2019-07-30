import React, { useContext, useEffect, useState } from "react";
import DrizzleContext from "../state/Context";
import ThreeContext from "../state/ThreeContext";
const THREE = window.THREE;
const CheckoutMyShrooms = () => {
  const {
    camera,
    container,
    clearObjects,
    animator,
    scene,
    objArray
  } = useContext(ThreeContext);
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);

  const [colorz, setColorz] = useState([]);

  const loadNewShroom = async (shroom, i) => {
    const loader = new THREE.ObjectLoader();
    await loader.load("./yellowDog.json", async obj => {
      const { r, g, b } = shroom;
      obj.children[0].material.color = new THREE.Color(`rgb(${r},${g},${b})`);

      console.log(obj);
      obj.position.y += i * 3 - 5;
      scene.add(obj);
      objArray.current.push(obj);
      // shroomsShown.current.push(shroom.id);
    });
  };

  useEffect(() => {
    const toad = drizzle.contracts.Toadstool;
    const grabTheirShrooms = async () => {
      const balance = await toad.methods
        .balanceOf(drizzleState.accounts[0])
        .call();
      if (balance === "0") return;

      const ownedShrooms = [];
      for (let i = 0; i < parseInt(balance); i++) {
        const shroomIndex = await toad.methods
          .tokenOfOwnerByIndex(drizzleState.accounts[0], i)
          .call();
        ownedShrooms.push(shroomIndex);
      }

      const shroomColors = [];
      for (let i = 0; i < ownedShrooms.length; i++) {
        const color = await toad.methods.getShroom(ownedShrooms[i]).call();
        shroomColors.push(color);
        loadNewShroom(color, i);
      }

      console.log(shroomColors);
      setColorz(shroomColors);
    };
    grabTheirShrooms();
  }, [drizzle, drizzleState]);

  useEffect(() => {
    console.log("scene effect", scene);
    container.current.style.display = "block";
    // const canvas = document.querySelector("canvas");
    // canvas.style.display = "block";
    // canvas.style.height = window.innerHeight / 2 + "px";
    // canvas.style.width = "100%";
    camera.position.set(0, 1, -10);
    clearObjects();
    const objLoop = o => {
      const objArray = o.current;
      if (objArray.length > 0) {
        for (let i = 0; i < objArray.length; i++) {
          var timer = 0.0001 * Date.now();
        }
      }
    };
    animator(objLoop);
    loadNewShroom({ r: 0, g: 0, b: 0 });
    return () => {
      scene.remove(objArray.current[0]);
    };
    // eslint-disable-next-line
  }, [scene]);
  return (
    <div style={{ color: "white" }}>
      {colorz.map((s, i) => (
        <div key={s.r + i}>{s.r}</div>
      ))}
    </div>
  );
};

export default CheckoutMyShrooms;
