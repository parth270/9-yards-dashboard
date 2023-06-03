import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDirection, setScroll } from "../../services/scroll";
import { Tween } from "react-gsap";

const LitteSpan = ({ title, id, rotate }) => {
  const progress = rotate * 360;

  return (
    <div
      className="text-[#fff] duration-1000"
      style={{
        // transform: `rotateX(${progress * 360}deg)`,
        transform: `rotateX(${progress}deg)`,
      }}
    >
      {title}
    </div>
  );
};

const TextItem = ({ title, id }) => {
  const str = title.split("");
  const scroll = useSelector((state) => state.scroll.scroll);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const w = window.innerWidth;
    const curr = scroll + id * w;
    const margin = -(w * 20) / 100;
    if (curr < margin && curr > margin * 3) {
      const curred = -curr + margin;
      setProgress(curred / (-margin * 2));
    } else {
      if (progress !== 0) {
        if (progress > 0.5) {
          setProgress(0);
        } else {
          setProgress(1);
        }
      }
    }
  }, [scroll]);

  console.log(progress);

  return (
    <div className="w-[100vw] px-[20vw] shrink-0">
      <h1 className="text-center fckin text-[100px] font-medium flex items-center justify-center">
        {str.map((item, i) => {
          return (
            <LitteSpan
              title={item}
              key={i}
              rotate={progress === 0 ? 0 : progress + i / (str.length * 3)}
              id={id}
              total={str.length}
            />
          );
        })}
      </h1>
    </div>
  );
};

const TextCarousel = () => {
  const arr = ["Hello World-1", "Hello World-2", "Hello World-3"];
  const scrollRef = useRef(0);
  const ref = useRef();
  const dispatch = useDispatch();
  const onScroll = (e) => {
    const curr = scrollRef.current;
    const scrollDirection = e.deltaY > 0;
    if (!scrollDirection) {
      // console.log("scrolling up");
      if (curr < 0) {
        let make = curr + 100;
        if (curr + 100 > 0) {
          make = 0;
        }
        gsap.to(ref.current, {
          x: make,
        });
        scrollRef.current = make;
        dispatch(setScroll(make));
      }
    } else {
      // console.log("scrolling down");
      const w = -window.innerWidth * 2;
      let make = curr - 100;
      if (curr > w) {
        if (make < w) {
          const newMake = w;
          make = newMake;
        }
        const tl = gsap.timeline();
        tl.to(ref.current, {
          x: make,
          onUpdate: () => {
            console.log(tl.progress());
          },
        });
        scrollRef.current = make;
        dispatch(setScroll(make));
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
