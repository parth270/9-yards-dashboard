import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
// import Scene from './Scene/Scene'
const Scene = React.lazy(() => import("./Scene/Scene.jsx"));

const CanvasContainer = ({ children }) => {
  const [devicePixelRatio, setDevicePixelRatio] = React.useState();

  React.useEffect(() => {
    const pixel = window.devicePixelRatio;
    setDevicePixelRatio(pixel);
  }, []);

  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 2],
          fov: 25,
        }}
        dpr={devicePixelRatio}
        gl={{
          antialias: false,
        }}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {children}
    </>
  );
};

export default CanvasContainer;
