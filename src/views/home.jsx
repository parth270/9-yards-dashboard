import React from "react";
import TextCarousel from "../components/TextCarousel";
import CanvasContainer from "../components/three";

const HomePage = () => {
  return (
    <div className="w-[100%] flex items-center bg-[#111] justify-center h-[100vh]">
      <CanvasContainer>
        <TextCarousel />
      </CanvasContainer>
    </div>
  );
};

export default HomePage;
