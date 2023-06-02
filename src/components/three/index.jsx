import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";

const Scene = React.lazy(() => import("./Scene/index.jsx"));

const CanvasContainer = () => {
  const [pixelRatio, setPixel] = useState(0);
  useEffect(() => {
    if (pixelRatio === 0) {
      setPixel(window.devicePixelRatio);
    }
  });

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      pixelRatio={Math.min(pixelRatio, 1.6)}
      noEvents
      colorManagement
      camera={{
        fov: 40,
        near: 0.1,
        position: [0, 0, 0.7],
        zoom: 1,
      }}
      // shadowMap={{
      //   enabled: enableShadowMap,
      //   type: PCFSoftShadowMap
      // }}
      concurrent
      onCreated={({ gl, ...props }) => {
        gl.debug.checkShaderErrors = false;
        gl.setClearColor("#141518", 1.0);
        // onCreated({ gl, ...props });
        setTimeout(() => (gl.domElement.parentNode.style.opacity = 1), 0);
      }}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default CanvasContainer;
