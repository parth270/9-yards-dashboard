import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurr, setDirection, setScroll } from "../../services/scroll";
import { Tween } from "react-gsap";
import LittleSpan from "./item";
import { Power4 } from "gsap";

const TextItem = ({ title, id, check }) => {
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
      <h1 className="text-center fckin text-[120px] font-medium flex items-center justify-center">
        {str.map((item, i) => {
          return (
            <LittleSpan
              title={item}
              key={i}
              //   rotate={progress === 0 ? 0 : progress + i / (str.length * 3)}
              id={id}
              check={check}
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
  const direct = useRef(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const changeScroll = useSelector((state) => state.scroll.change);
  const [check, setCheck] = useState(true);

  const onScroll = (e) => {
    const curr = scrollRef.current;
    const scrollDirection = e.deltaY > 0;
    if (check) {
      if (!scrollDirection) {
        // console.log("scrolling up");
        if (curr < 0) {
          let make = curr + 70;
          if (curr + 70 > 0) {
            make = 0;
          }
          gsap.to(ref.current, {
            x: make,
            duration: 0.1,
          });
          scrollRef.current = make;
          direct.current = false;
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
          });
          dispatch(setScroll(make));
          direct.current = true;
          scrollRef.current = make;
        }
      }
    }
  };

  useEffect(() => {
    let isScrolling;
    const delay = 200;

    const handleScrollStop = () => {
      const w = window.innerWidth;
      const scrolled = -scrollRef.current;
      const margin = (w * 20) / 100;
      console.log(scrolled);
      if (direct.current === true) {
        if (scrolled < 3 * margin && scrolled > margin) {
          // if (!(scrolled < 3 * margin && scrolled > margin * 2)) {

          console.log("ascend left");
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = w - scrolled;
          tl.to(ref.current, {
            x: -w,
            duration: 1.5,
            onUpdate: () => {
              const prog = tl.progress() * distLeft;
              console.log(prog);
              dispatch(setScroll(-(scrolled + prog)));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = -w;
            },
          });
          dispatch(setCurr(1));
        } else if (scrolled > margin + w && scrolled < w + margin * 3) {
          console.log("second ascend left");
          console.log("ascend left");
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = w * 2 - scrolled;
          tl.to(ref.current, {
            x: -w * 2,
            duration: 1.5,
            onUpdate: () => {
              const prog = tl.progress() * distLeft;
              console.log(prog);
              dispatch(setScroll(-(scrolled + prog)));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = -w * 2;
            },
          });
          dispatch(setCurr(2));
        }
      } else {
        if (scrolled < w + margin && scrolled > w - margin) {
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = scrolled;
          tl.to(ref.current, {
            x: 0,
            duration: 1.5,
            onUpdate: () => {
              const prog = (1 - tl.progress()) * distLeft;
              console.log(prog);
              dispatch(setScroll(-prog));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = 0;
            },
          });
          dispatch(setCurr(0));
        } else if (scrolled < w * 2 + margin && scrolled > w * 2 - margin) {
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = w - scrolled;
          tl.to(ref.current, {
            x: -w,
            duration: 1.5,
            onUpdate: () => {
              const prog = (1 - tl.progress()) * distLeft;
              console.log(prog);
              dispatch(setScroll(-prog));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = -w;
            },
          });
          dispatch(setCurr(1));
        }
      }
    };

    function debounceScroll() {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(handleScrollStop, delay);
    }

    const onScrollSure = (e) => {
      debounceScroll();
      onScroll(e);
    };
    document.addEventListener("wheel", onScrollSure, false);
    return () => {
      document.removeEventListener("wheel", onScrollSure, false);
    };
  });

  return (
    <div className="w-[100%] h-[100vh] absolute z-10  flex overflow-hidden">
      <div className="min-w-[100vw] h-[100vh] items-center flex" ref={ref}>
        {arr.map((item, i) => {
          return <TextItem title={item} key={i} id={i} check={check} />;
        })}
      </div>
    </div>
  );
};

export default React.memo(TextCarousel);
