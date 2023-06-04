import { Environment, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "@react-spring/three";

const Scene = () => {
  const { scene: scene } = useGLTF("/pencil.glb");
  const { scene: scene1 } = useGLTF("/Lightbulb (1).glb");
  const { scene: scene2 } = useGLTF("/9_Logo.glb");
  const { scene: scene3 } = useGLTF("/360/Branding.glb");
  const { scene: scene4 } = useGLTF("/360/media_buying.glb");
  const { scene: scene5 } = useGLTF("/360/Advertising.glb");
  const { scene: scene6 } = useGLTF("/360/PR_communication.glb");
  const { scene: scene7 } = useGLTF("/360/Event.glb");
  const { scene: scene8 } = useGLTF("/360/Video_Production.glb");
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref8 = useRef();
  const ref9 = useRef();

  useFrame(() => {
    ref1.current.rotation.y += 0.01;
    ref2.current.rotation.y += 0.01;
    ref3.current.rotation.y += 0.01;
    if (ref4.current) {
      if (ref4.current.children[0].children[0]) {
        const obj1 = ref4.current.children[0]?.children[0];
        obj1.rotation.y += 0.01;
        obj1.rotation.z = Math.PI * 0;
        obj1.rotation.x = Math.PI * 1.99;
      }
    }
    if (ref5.current) {
      if (ref5.current.children[0].children[0]) {
        const obj1 = ref5.current.children[0]?.children[0];
        obj1.rotation.y += 0.01;
        obj1.rotation.x = 0;
        obj1.rotation.z = 0;
      }
    }
    if (ref6.current) {
      if (ref6.current.children[0].children[0]) {
        const obj1 = ref6.current.children[0]?.children[0];
        obj1.rotation.y += 0.01;
        obj1.rotation.x = 0;
        obj1.rotation.z = 0;
      }
    }
    if (ref7.current) {
      if (ref7.current.children[0].children[0]) {
        const obj1 = ref7.current.children[0]?.children[0];
        obj1.rotation.y += 0.01;
        obj1.rotation.x = 0;
        obj1.rotation.z = 0;
      }
    }
    if (ref8.current) {
      if (ref8.current.children[0].children[0]) {
        const obj1 = ref8.current.children[0]?.children[0];
        obj1.rotation.y += 0.01;
        obj1.rotation.x = 0;
        obj1.rotation.z = 0;
      }
    }
    if (ref9.current) {
      if (ref9.current.children[0].children[0]) {
        const obj1 = ref9.current.children[0]?.children[0];
        obj1.rotation.y += 0.01;
        obj1.rotation.x = 0;
        obj1.rotation.z = 0;
      }
    }
  });

  const curr = useSelector((state) => state.scroll.curr);
  const blur = useSelector((state) => state.scroll.blur);
  const [check, setCheck] = useState(false);
  const [scaledown, setScaleDown] = useState(true);

  const { scale1, position1, scale2, position2, scale3, position3, intensity } =
    useSpring({
      position1: scaledown ? [0, -0.45, 0] : [0, -0.1, 0],
      scale1: scaledown ? [0.05, 0.05, 0.05] : [0.01, 0.01, 0.01],
      position2: scaledown ? [0, 0.35, 0] : [0, 0.1, 0],
      scale2: scaledown ? [0.03, 0.03, 0.03] : [0.01, 0.01, 0.01],
      position3: scaledown ? [0, -0.68, 0] : [0, -0.23, 0],
      scale3: scaledown ? [0.03, 0.03, 0.03] : [0.01, 0.01, 0.01],
      intensity: blur ? 0 : 2,
    });
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

  const {
    BallPos1,
    BallScale1,
    BallPos2,
    BallScale2,
    BallPos3,
    BallScale3,
    BallPos4,
    BallScale4,
    BallPos5,
    BallScale5,
    BallPos6,
    BallScale6,
  } = useSpring({
    BallPos1:  true ? [-0.23, 0.12, -0.5] : [0, 0.38, 0],
    BallScale1: true ? [0.02, 0.02, 0.02] : [0.01, 0.01, 0.01],
    BallPos2: true ? [-0.4, 0.131, -0.5] : [0, 0.38, 0],
    BallScale2:  true ? [0.019, 0.019, 0.019] : [0.01, 0.01, 0.01],
    BallPos3:  true ? [-0.48, 0.1319, -0.5] : [0, 0.38, 0],
    BallScale3: true? [0.0201, 0.0201, 0.0201] : [0.01, 0.01, 0.01],
    BallPos4: true? [-0.16, 0.1239, -0.5] : [0, 0.38, 0],
    BallScale4:  true ? [0.022, 0.022, 0.022] : [0.01, 0.01, 0.01],
    BallPos5: true ? [0.53, 0.121, -0.5] : [0, 0.38, 0],
    BallScale5:  true ? [0.0231, 0.0231, 0.0231] : [0.01, 0.01, 0.01],
    BallPos6:  true ? [1.39, 0.111, -0.5] : [0, 0.38, 0],
    BallScale6:  true ? [0.0222, 0.0222, 0.0222] : [0.01, 0.01, 0.01],
  });

  return (
    <>
      <animated.ambientLight intensity={intensity} color={"#fff"} />
      {!blur && (
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr"></Environment>
      )}
      <group position={[realcurr === 0 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref1} position={position1} scale={scale1}>
          <primitive object={scene}></primitive>
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
      <group position={[realcurr === 2 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref4} position={BallPos1} scale={BallScale1}>
          <primitive object={scene3} />
        </animated.group>
      </group>
      <group position={[realcurr === 2 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref5} position={BallPos2} scale={BallScale2}>
          <primitive object={scene4} />
        </animated.group>
      </group>
      <group position={[realcurr === 2 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref6} position={BallPos3} scale={BallScale3}>
          <primitive object={scene5} />
        </animated.group>
      </group>
      <group position={[realcurr === 2 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref7} position={BallPos4} scale={BallScale4}>
          <primitive object={scene6} />
        </animated.group>
      </group>
      <group position={[realcurr === 2 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref8} position={BallPos5} scale={BallScale5}>
          <primitive object={scene7} />
        </animated.group>
      </group>
      <group position={[realcurr === 2 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref9} position={BallPos6} scale={BallScale6}>
          <primitive object={scene8} />
        </animated.group>
      </group>
      {/* 
      <group position={[realcurr === 4 ? 0 : 10, 0, 0]}>
        <animated.group ref={ref5} position={position3} scale={scale3}>
          <primitive object={scene2} />
        </animated.group>
      </group> */}
    </>
  );
};

export default Scene;
