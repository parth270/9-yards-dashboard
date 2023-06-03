import React from "react";
import TextCarousel from "../components/TextCarousel";
import CanvasContainer from "../components/three";
import { useSelector } from "react-redux";

const HomePage = () => {
  const curr = useSelector((state) => state.scroll.curr);

  const bgs = ["#bfbfbf", "#0000ff", "rgb(95 140 255)"];
  return (
    <div
      className="w-[100%] flex items-center bg-[#111] justify-center h-[100vh] duration-200"
      style={{
        backgroundColor: bgs[curr],
      }}
    >
      <CanvasContainer>
        <TextCarousel />
      </CanvasContainer>
    </div>
  );
};

export default HomePage;
