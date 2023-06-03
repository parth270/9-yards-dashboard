import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

const LitteSpan = ({ title }) => {
  return <span className="text-[#fff]">{title}</span>;
};

const TextItem = ({ title }) => {
  const str = title.split("");

  return (
    <div className="w-[100vw] px-[10vw] shrink-0">
      <h1 className="text-center fckin text-[100px] font-medium">
        {str.map((item, i) => {
          return <LitteSpan title={item} key={i} />;
        })}
      </h1>
    </div>
  );
};

const TextCarousel = () => {
  const arr = ["Hello World-1", "Hello World-2", "Hello World-3"];
  const scrollRef = useRef(0);
  const ref = useRef();
  const onScroll = (e) => {
    const curr = scrollRef.current;
    const scrollDirection = e.deltaY > 0;
    if (!scrollDirection) {
      // console.log("scrolling up");
      if (curr !== 0) {
        let make = curr + 100;
        if (curr + 100 > 0) {
          make = 0;
        }
        console.log(curr + 100);
        gsap.to(ref.current, {
          x: make,
        });
        scrollRef.current = make;
      }
    } else {
      // console.log("scrolling down");
      const w = -window.innerWidth * 2;
      let make = curr - 100;
      if (curr >= w) {
        if (make < w) {
          console.log(make);
          const newMake = w;
          make = newMake;
          console.log(make);
        }
        gsap.to(ref.current, {
          x: make,
        });
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
          return <TextItem title={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default TextCarousel;
