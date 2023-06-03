import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LitteSpan = ({ title, id, real }) => {
  //   const progress = rotate * 360;
  const [progress, setProgress] = useState(0);
  const ref = useRef();
  const scroll = useSelector((state) => state.scroll.scroll);
  useEffect(() => {
    console.log("check");
    setTimeout(() => {
      const rect = ref.current.getBoundingClientRect().x;
      const w = window.innerWidth;
      const margin = (w * 20) / 100;
      const lMargin = margin;
      const rMargin = w - margin;
      if (rect < lMargin && lMargin > -rect) {
        const prog = (rect + margin) / (margin * 2);
        console.log(prog);
        setProgress((1 - prog) * 360);
      } else {
        setProgress(0);
      }
    }, 100);
  }, [scroll]);
  return (
    <div
      className="text-[#fff] duration-1000"
      ref={ref}
      style={{
        // transform: `rotateX(${progress * 360}deg)`,
        transform: `rotateX(${progress}deg)`,
      }}
    >
      {title}
    </div>
  );
};

export default React.memo(LitteSpan);
