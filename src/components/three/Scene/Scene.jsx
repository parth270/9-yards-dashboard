import { Environment, useGLTF } from "@react-three/drei";
import React from "react";

const Scene = () => {
  const { scene } = useGLTF("/Camera.glb");

  return (
    <>
      <ambientLight intensity={1} color="#fff" />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
      <group rotation={[0, Math.PI / 4, 0]}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default Scene;
