import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppear,
  setCurr,
  setDirection,
  setScroll,
} from "../../services/scroll";
import { Tween } from "react-gsap";
import LittleSpan from "./item";
import { Power4 } from "gsap";

const TextItem1 = ({ title, id, check }) => {
  const [strr, setStrr] = useState(title);
  const str = strr.split("");
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
  const dispatch = useDispatch();

  const extraCurr = useSelector((state) => state.scroll.extraCurr);
  const [check1, setCheck] = useState(false);
  const [trigger, setTrigger] = useState(true);
  useEffect(() => {
    if (check1) {
      setTrigger(false);
      setTimeout(() => {
        if (extraCurr === 0) {
          setStrr("PR & COMMUNICATION");
        } else if (extraCurr === 1) {
          setStrr("MEDIA BUYING");
        } else {
          setStrr(title);
        }
      }, 1050);
      setTimeout(() => {
        setTrigger(true);
      }, 1100);
    } else {
      setCheck(true);
    }
  }, [extraCurr]);

  return (
    <div className="w-[100vw] px-[15vw] shrink-0">
      <Tween
        from={{
          clipPath: "inset(0px 0px 0px 0px)",
        }}
        to={{
          clipPath: trigger
            ? "inset(0px 0px 0px 0px)"
            : "inset(0px 0vw 0px 100vw)",
        }}
        duration={1}
        ease={Power4.easeInOut}
      >
        <h1
          className="text-center fckin text-[120px] font-medium flex items-center justify-center cursor-pointer "
          onClick={() => {
            if (extraCurr === 0) {
              dispatch(setAppear(3));
            } else if (extraCurr === 1) {
              dispatch(setAppear(4));
            }
          }}
        >
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
      </Tween>
    </div>
  );
};

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
  const dispatch = useDispatch();

  return (
    <div className="w-[100vw] px-[20vw] shrink-0">
      <h1
        className="text-center fckin text-[120px] font-medium flex items-center justify-center cursor-pointer "
        onClick={() => {
          dispatch(setAppear(id));
        }}
      >
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
  const blur = useSelector((state) => state.scroll.blur);
  const [check, setCheck] = useState(true);

  const onScroll = (e) => {
    const curr = scrollRef.current;
    const scrollDirection = e.deltaY > 0;
    if (!blur) {
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
            dispatch(setDirection(false));
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
            dispatch(setDirection(true));
            direct.current = true;
            scrollRef.current = make;
          }
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
      if (direct.current === true) {
        if (scrolled > margin + w) {
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = w * 2 - scrolled;
          tl.to(ref.current, {
            x: -w * 2,
            duration: 1.5,
            onUpdate: () => {
              const prog = tl.progress() * distLeft;
              dispatch(setScroll(-(scrolled + prog)));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = -w * 2;
            },
          });
        } else if (scrolled > margin && scrolled < w) {
          // if (!(scrolled < 3 * margin && scrolled > margin * 2)) {

          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = w - scrolled;
          tl.to(ref.current, {
            x: -w,
            duration: 1.5,
            onUpdate: () => {
              const prog = tl.progress() * distLeft;
              dispatch(setScroll(-(scrolled + prog)));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = -w;
            },
          });
        } else if (scrolled < margin - 50) {
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = scrolled;
          tl.to(ref.current, {
            x: 0,
            duration: 0.5,
            onUpdate: () => {
              const prog = (1 - tl.progress()) * distLeft;
              dispatch(setScroll(-prog));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = 0;
            },
          });
        } else if (scrolled > w && scrolled < w + margin - 50) {
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = w - scrolled;
          tl.to(ref.current, {
            x: -w,
            duration: 1.5,
            onUpdate: () => {
              const prog = tl.progress() * distLeft;
              dispatch(setScroll(-(scrolled + prog)));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = -w;
            },
          });
        }
      } else {
        if (scrolled < w - margin) {
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = scrolled;
          tl.to(ref.current, {
            x: 0,
            duration: 1.5,
            onUpdate: () => {
              const prog = (1 - tl.progress()) * distLeft;
              dispatch(setScroll(-prog));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = 0;
            },
          });
        } else if (scrolled < w * 2 - margin) {
          setCheck(false);
          const tl = gsap.timeline();
          const distLeft = w - scrolled;
          tl.to(ref.current, {
            x: -w,
            duration: 1.5,
            onUpdate: () => {
              const prog = tl.progress() * distLeft;
              dispatch(setScroll(-(scrolled + prog)));
            },
            onComplete: () => {
              setCheck(true);
              scrollRef.current = -w;
            },
          });
        }
        // console.log(scrolled, "please check here");
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
      <div className="w-[200vw] h-[100vh] items-center flex" ref={ref}>
        {arr.map((item, i) => {
          if (i === 2) {
            return <TextItem1 title={item} key={i} id={i} check={check} />;
          } else {
            return <TextItem title={item} key={i} id={i} check={check} />;
          }
        })}
      </div>
    </div>
  );
};

export default React.memo(TextCarousel);
