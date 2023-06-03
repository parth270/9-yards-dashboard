import { Environment, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "@react-spring/three";

const Scene = () => {
  const { scene: scene } = useGLTF("/pencil.glb");
  const { scene: scene1 } = useGLTF("/Lightbulb.glb");
  const { scene: scene2 } = useGLTF("/9_Logo.glb");
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  useFrame(() => {
    ref1.current.rotation.y += 0.01;
    ref2.current.rotation.y += 0.01;
    ref3.current.rotation.y += 0.01;
  });

  const curr = useSelector((state) => state.scroll.curr);
  const [check, setCheck] = useState(false);
  const [scaledown, setScaleDown] = useState(true);

  const { scale1, position1, scale2, position2, scale3, position3 } = useSpring(
    {
      position1: scaledown ? [0, -0.45, 0] : [0, -0.1, 0],
      scale1: scaledown ? [0.05, 0.05, 0.05] : [0.01, 0.01, 0.01],
      position2: scaledown ? [0, 0.35, 0] : [0, 0.1, 0],
      scale2: scaledown ? [0.03, 0.03, 0.03] : [0.01, 0.01, 0.01],
      position3: scaledown ? [0, -0.68, 0] : [0, -0.23, 0],
      scale3: scaledown ? [0.03, 0.03, 0.03] : [0.01, 0.01, 0.01],
    }
  );

  const [realcurr, setRealCurr] = useState(0);

  useEffect(() => {
    if (check) {
      setScaleDown(false);
      setTimeout(() => {
        setRealCurr(curr);
        setScaleDown(true);
      }, 500);
    } else {
      setCheck(true);
    }
  }, [curr]);

  return (
    <>
      <ambientLight intensity={1} color="#fff" />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
      <group position={[realcurr === 0 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref1} position={position1} scale={scale1}>
          <primitive object={scene}>
            <meshBasicMaterial transparent opacity={0.5} />
          </primitive>ś
        </animated.group>
      </group>
      <group position={[realcurr === 1 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref2} position={position2} scale={scale2}>
          <primitive object={scene1} />
        </animated.group>
      </group>
      <group position={[realcurr === 2 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref3} position={position3} scale={scale3}>
          <primitive object={scene2} />
        </animated.group>
      </group>
    </>
  );
};

export default Scene;
