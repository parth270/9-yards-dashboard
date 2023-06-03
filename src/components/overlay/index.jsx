import React, { useState } from "react";
import { Tween } from "react-gsap";
import { useDispatch } from "react-redux";
import { setDisAppear } from "../../services/scroll";

const Overlay = () => {
  const [curr, setCurr] = useState(true);
  const dispatch = useDispatch();

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
      <div className="w-[100%] h-[100vh] bg-[#000000db] absolute z-50 px-[25%] py-[20vh] overflow-y-auto scroll-bar-cool">
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
        <h1 className="text-[#fff] text-[40px] fckin font-bold tracking-wide">
          Title
        </h1>
        <p className="text-[#fff] mt-[30px] text-[20px] fckin font-medium tracking-wide">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          cum animi saepe, cumque iusto corrupti esse similique sit ratione
          sapiente nihil at harum ducimus ea, officiis ut, molestiae modi.
          Labore blanditiis, dolores recusandae quo doloremque repellendus a
          illo iusto porro corporis praesentium commodi consequuntur alias
          reprehenderit id tenetur sapiente dicta! Esse autem ut dolorem
          voluptas incidunt tempore quae omnis error, nam perspiciatis libero
          vitae pariatur facere deleniti, fuga reprehenderit? Magni, quas quae
          illo esse corrupti saepe deserunt placeat laboriosam exercitationem
          accusantium reprehenderit velit pariatur fugiat quaerat ex vel,
          voluptas quam veritatis fuga sit facilis. Tempora dolores expedita
          autem provident accusantium!
        </p>
      </div>
    </Tween>
  );
};

export default Overlay;
