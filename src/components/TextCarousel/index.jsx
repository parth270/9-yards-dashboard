import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDirection, setScroll } from "../../services/scroll";
import { Tween } from "react-gsap";
import LittleSpan from "./item";
import { Power4 } from "gsap";

const TextItem = ({ title, id }) => {
  const str = title.split("");
  //   const scroll = useSelector((state) => state.scroll.scroll);
  //   const [progress, setProgress] = useState(0);
  //   useEffect(() => {
  //     const w = window.innerWidth;
  //     const curr = scroll + id * w;
  //     const margin = -(w * 20) / 100;
  //     if (curr < margin && curr > margin * 3) {
  //       const curred = -curr + margin;
  //       setProgress(curred / (-margin * 2));
  //     } else {
  //       if (progress !== 0) {
  //         if (progress > 0.5) {
  //           setProgress(0);
  //         } else {
  //           setProgress(1);
  //         }
  //       }
  //     }
  //   }, [scroll]);

  return (
    <div className="w-[100vw] px-[20vw] shrink-0">
      <h1 className="text-center fckin text-[100px] font-medium flex items-center justify-center">
        {str.map((item, i) => {
          return (
            <LittleSpan
              title={item}
              key={i}
              //   rotate={progress === 0 ? 0 : progress + i / (str.length * 3)}
              id={id}
              total={str.length}
              real={i}
            />
          );
        })}
      </h1>
    </div>
  );
};

const TextCarousel = () => {
  const arr = ["ABOUT", "THE COMPANY", "360 INTEGRATION "];
  const scrollRef = useRef(0);
  const ref = useRef();
  const dispatch = useDispatch();
  const onScroll = (e) => {
    const curr = scrollRef.current;
    const scrollDirection = e.deltaY > 0;
    if (!scrollDirection) {
      // console.log("scrolling up");
      if (curr < 0) {
        let make = curr + 70;
        if (curr + 100 > 0) {
          make = 0;
        }
        gsap.to(ref.current, {
          x: make,
          duration: 0.1,
        });
        scrollRef.current = make;
        dispatch(setScroll(make));
      }
    } else {
      // console.log("scrolling down");
      const w = -window.innerWidth * 2;
      let make = curr - 70;
      if (curr > w) {
        if (make < w) {
          const newMake = w;
          make = newMake;
        }
        const tl = gsap.timeline();
        tl.to(ref.current, {
          x: make,
          duration: 0.1,
          onUpdate: () => {},
        });
        dispatch(setScroll(make));

        scrollRef.current = make;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", onScroll, false);
    return () => {
      document.removeEventListener("wheel", onScroll, false);
    };
  });

  return (
    <div className="w-[100%] h-[100vh] absolute z-10  flex overflow-hidden">
      <div className="min-w-[100vw] h-[100vh] items-center flex" ref={ref}>
        {arr.map((item, i) => {
          return <TextItem title={item} key={i} id={i} />;
        })}
      </div>
    </div>
  );
};

export default TextCarousel;