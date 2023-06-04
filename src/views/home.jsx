import React, { useEffect } from "react";
import TextCarousel from "../components/TextCarousel";
import CanvasContainer from "../components/three";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../components/overlay";
import { setCurr } from "../services/scroll";

const HomePage = () => {
  const blur = useSelector((state) => state.scroll.blur);
  const scroll = useSelector((state) => state.scroll.scroll);
  const direction = useSelector((state) => state.scroll.direction);

  const dispatch = useDispatch();

  useEffect(() => {
    const curr = -scroll;
    const w = window.innerWidth;
    const margin = (w * 20) / 100;
    // console.log(curr,margin + w);
    if (direction) {
      if (curr > margin + w) {
        console.log(2);
        dispatch(setCurr(2));
      } else if (curr > margin && curr < w) {
        console.log(1);
        dispatch(setCurr(1));
      }
    } else {
      if (curr < w - margin) {
        dispatch(setCurr(0));
      } else if (curr < w * 2 - margin) {
        dispatch(setCurr(1));
      }
    }
  }, [scroll]);

  return (
    <div
      className="w-[100%] flex items-center bg-[#111] justify-center h-[100vh] duration-200"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <CanvasContainer>
        <TextCarousel />
        {blur && <Overlay />}
      </CanvasContainer>
    </div>
  );
};

export default HomePage;
