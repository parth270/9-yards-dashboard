import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LitteSpan = ({ title, id, real, check }) => {
  //   const progress = rotate * 360;
  const [progress, setProgress] = useState(0);
  const ref = useRef();
  const scroll = useSelector((state) => state.scroll.scroll);
  const curr = useSelector((state) => state.scroll.curr);
  useEffect(() => {
    const delay = check ? 100 : 0;
    setTimeout(() => {
      const rect = ref.current.getBoundingClientRect().x;
      const w = window.innerWidth;
      const margin = (w * 25) / 100;
      const lMargin = margin;
      const rMargin = w - margin;

      if (rect < lMargin && lMargin > -rect) {
        const prog = (rect + margin) / (margin * 2);
        setProgress((1 - prog) * 360);
      } else if (rect > rMargin && rect < w + margin) {
        const prog = (rect - rMargin) / (margin * 2);
        setProgress(prog * 360);
        // setProgress((1 - prog) * 360);
      } else {
        setProgress(0);
      }
    }, delay);
  }, [scroll]);
  return (
    <div
      ref={ref}
      style={{
        color: "#000",
        transitionDuration: "0.7s",
        // transform: `rotateX(${progress * 360}deg)`,
        transform: `rotateX(${progress}deg)`,
      }}
    >
      {title}
    </div>
  );
};

export default React.memo(LitteSpan);
