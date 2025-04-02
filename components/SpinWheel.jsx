import Image from "next/image";
import React from "react";

const SpinWheel = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-5 my-20">
      <div className="max-w-[1240px] w-full h-[150px] md:h-[460px] flex flex-wrap items-center gap-20 justify-center relative py-10 md:mx-10 mx-5">
        <Image
          src="/images/spinwheel.png"
          alt="spin the wheel"
          fill
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default SpinWheel;
