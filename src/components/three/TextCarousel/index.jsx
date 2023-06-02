import React, { memo, useEffect, useRef, useCallback, useState } from "react";
import { Text, shaderMaterial } from "@react-three/drei";
import { MathUtils, Color, DoubleSide, FrontSide } from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";
/* eslint import/no-webpack-loader-syntax: off */
import vertShader from "!raw-loader!glslify-loader!./vertShader.glsl";
// import fontSrc from '../../../assets/fonts/Aften_Screen.ttf'
import fontSrc from "./aften_screen.woff";
const TextMaterial = shaderMaterial(
  {
    time: 0,
    color: new Color(1, 1, 1),
    opacity: 1,
    fulltime: 0,
    heightFactor: 1,
  },
  vertShader,
  // fragment shader
  `
    uniform float fulltime;
    uniform vec3 color;
    uniform float opacity;

    // varying vec3 vTroikaGlyphColor;
    
    #define M_PI 3.1415926538

    void main() {
      gl_FragColor.rgba = vec4(color, max(sin((fulltime)*M_PI), 0.2) * opacity);
    }
  `
);

extend({ TextMaterial });

function mod(n, m) {
  return ((n % m) + m) % m;
}

const TextTitle = ({ y, title, page = 0, standalone, enabled = true }) => {
  const { viewport, size } = useThree();
  const text = useRef();
  const textMat = useRef();

  const [targetX, setTargetX] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [textParallax, setTextParallax] = useState(0);
  //   const pageWidthRatio = useUIStore((s) => s.pageWidthRatio);
  const pageWidthRatio = 0.5;

  const pageWidth = size.width * pageWidthRatio;
  const totalDistance = pageWidth * 2;
  const margin = (size.width - pageWidth) * 0.5;

  const getMyPos = (fullwidth) => {
    if (standalone) return 0.5;
    const shift = pageWidth * Math.floor(2 / 2); // dont flip objects at the edges where visible
    if (fullwidth) {
      const x =
        mod(targetX - page * size.width + shift, totalDistance) - shift;
      return x / size.width;
    } else {
      const x =
        mod(targetX - margin - page * pageWidth + shift, totalDistance) -
        shift;
      return x / pageWidth;
    }
  };



  const isPrevPage = useCallback(() => {
    const current =
      mod(currentPage - page, 2) -
      Math.floor(2 / 2);
    return 0 > current + 3; // hide 3 from edge
  }, [page]);

  const isNextPage = useCallback(() => {
    const current =
      mod(currentPage - page,2) -
      Math.floor(2 / 2);
    return 0 < current - 3; // hide 3 from edge
  }, [page]);

//   useFrame(({ clock }) => {
//     if (text.current) {
//       let isCurrentPage = standalone ? true : page === currentPage;

//       let lerp = enabled ? 0.05 : 0.1;

//       const myPos = getMyPos();

//       // calc position
//       const pos =
//         (viewport.width * pageWidthRatio * 0.5 -
//           myPos * viewport.width * pageWidthRatio) *
//         0.4;

//       if (!standalone) {
//         const visible =true

//         // lerp position
//         const parallax = isCurrentPage
//           ? textParallax
//           : textParallax * 0.2;
//         text.current.position.x = MathUtils.lerp(
//           text.current.position.x,
//           pos + parallax,
//           lerp
//         );
//         text.current.position.y = MathUtils.lerp(
//           text.current.position.y,
//           y,
//           lerp
//         );

//         text.current.scale.setScalar(1);
//       } else {
//         text.current.scale.setScalar(0.7);
//       }

//       // MATERIAL UNIFORMS
//       text.current.material.opacity = MathUtils.lerp(
//         text.current.material.opacity,
//         enabled ? 1 : 0,
//         enabled ? 0.05 : 0.2
//       );
//       // textMat.current.time = MathUtils.lerp( textMat.current.time, myPos, lerp)

//       const fulltime = MathUtils.mapLinear(
//         !enabled && isCurrentPage ? (standalone ? 0 : 1) : myPos,
//         isCurrentPage ? -0.7 : -0.5,
//         isCurrentPage ? 1.7 : 1.5,
//         0,
//         1
//       ); // + (isCurrentPage ? local.textParallax*10 : 0)
//       const textLerp =
//         isCurrentPage && clock.getElapsedTime() < 3 ? 0.022 : lerp;
//       textMat.current.fulltime = MathUtils.lerp(
//         textMat.current.fulltime,
//         fulltime,
//         textLerp
//       );
//     }
//   });

  return (
    <>
      <textMaterial
        ref={textMat}
        depthTest={false}
        side={DoubleSide}
        opacity={standalone ? 1 : -3}
        heightFactor={viewport.width * 0.04}
        transparent
      />
      <Text
        ref={text}
        anchorX="center" // default
        anchorY="middle" // default
        color={"white"}
        fontSize={viewport.width * 0.04}
        letterSpacing={-0.5 * 0.06}
        // position={[viewport.width*pageWidthRatio*0.5 - getMyPos() * viewport.width, y, 0]}
        position={[0, 0, 0.14]}
        // renderOrder={10}
        font={fontSrc}
        material={textMat.current}
        glyphGeometryDetail={20}
        transparent
      >
        {title}
      </Text>
    </>
  );
};

const TextCarousel = ({ }) => {
  const ref = useRef();

  const titles = [
    "Discobrain",
    // "T-1000",
    // "Freshwater",
    // "Ghost",
    // "Twistertoy",
    // "Firefly",
    // "Blackhole",
    // "Slimebag",
    // "Lipsync",
    // "Metalness",
    // "Rosebud",
    // "Molten",
    // "Devour",
    // "Cherry",
    // "Butterfly",
    // "Silkworm",
  ];



  useFrame(()=>{
    const mouseLerp = 0.05
    const scrollLerp = 0.033
    const mouseParallax = 0.01
    ref.current.position.x = MathUtils.lerp(ref.current.position.x, 0 * mouseParallax, mouseLerp)
  })
  return (
    <mesh ref={ref}>
      {titles.map((title, index) => (
        <TextTitle
          key={index}
          y={1.6}
          title={titles[index]}
          page={index}
          enabled={true}
        />
      ))}
      {/* <TextTitle key={0} y={y} title={'test'} page={14} enabled={visible} /> */}
    </mesh>
  );
};

export default memo(TextCarousel);
