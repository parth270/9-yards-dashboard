import React, { useState } from "react";
import { Tween } from "react-gsap";
import { useDispatch, useSelector } from "react-redux";
import { setDisAppear } from "../../services/scroll";
import { content } from "../other/content";

const Overlay = () => {
  const [curr, setCurr] = useState(true);
  const dispatch = useDispatch();
  const { curr: currr } = useSelector((state) => state.scroll);

  return (
    <Tween
      from={{
        opacity: 0,
      }}
      to={{
        opacity: curr ? 1 : 0,
      }}
      duration={0.5}
    >
      <div className="w-[100%] h-[100vh] bg-[#000000db] absolute z-50 px-[25%] py-[5vh] flex justify-center flex-col overflow-y-auto scroll-bar-cool">
        <img
          src="/cross-1.svg"
          className="absolute cursor-pointer w-[30px] h-[30px] top-[30px] right-[30px]"
          alt=""
          onClick={() => {
            setCurr(false);
            setTimeout(() => {
              dispatch(setDisAppear());
            }, 500);
          }}
        />
        {content[currr].map((item, i) => {
          return (
            <div className={item.className} key={i}>
              {item.title}
            </div>
          );
        })}
      </div>
    </Tween>
  );
};

export default Overlay;
