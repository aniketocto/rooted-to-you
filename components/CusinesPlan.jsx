"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CusinesPlan = () => {
  const router = useRouter();
  return (
    <section className="w-[full] h-fit flex md:flex-col relative flex-row justify-center items-center gap-5 my-10 overflow-hidden">
      <img
        src="/images/decorative.png"
        className="absolute top-0 -z-1 h-[500px] md:w-full object-cover"
        alt=""
      />
      <img
        src="/images/decorative.png"
        className="absolute block md:hidden bottom-0 -z-1 h-[500px] md:w-full object-cover"
        alt=""
      />
      <div className="w-[90%] h-fit flex flex-wrap items-center gap-20 justify-center py-10  md:mx-10 mx-5">
        <h2 className="secondary-font text-center" data-aos="fade-down">
          Our Cuisine Plans
        </h2>
        <div className="w-full h-full flex flex-wrap cusineflexWrap flexCol  justify-center flex-col md:flex-row items-center gap-2.5">
          <div className="flex flex-1 h-full justify-center flex-col md:flex-row items-center gap-2.5">
            <Image
              src="/images/Exe_new.png"
              alt="executive"
              width={330}
              height={420}
              quality={100}
              className="2xl:w-[45%] w-[50%]"
            />
            <div className="w-[90%] md:w-1/2 h-full flex flex-col items-center justify-start border border-white p-6">
              <h3 className="secondary-font cusineFont mb-5 w-full text-left">
                The Executive Meal
              </h3>
              <p className="secondary-font font-base-1 mb-5">
                A wholesome, balanced meal with 5 to 6 curated components
              </p>
              <ul className="list-disc list-inside font-base-1 pl-0  mb-2 md:mb-8  w-full">
                <li className="mb-4 font-base-3">Zero Decision-Making</li>
                <li className="mb-4 font-base-3">Balanced & Nourishing</li>
                <li className="mb-4 font-base-3">Complete Meal</li>
                <li className="mb-4 font-base-3">Seamless Convenience</li>
              </ul>
              <Button
                className="primary-font uppercase bg-[#e6af55] text-center cursor-pointer font-semibold p-3 md:p-5"
                onClick={() => router.push("/order/executive")}
              >
                <Image
                  src="/images/right-arrow.png"
                  alt="Presidential Meal"
                  width={30}
                  height={30}
                  className="rotate-180"
                />
                <p className="text-[#03141C]! subbtnFont">Subscribe Now</p>
              </Button>
            </div>
          </div>
          <div className="flex flex-1 h-full justify-center item-center flex-col md:flex-row-reverse items-center gap-2.5">
            <Image
              src="/images/Pri_new.png"
              alt="presidential "
              width={330}
              height={420}
              quality={100}
              className="2xl:w-[45%] w-[50%]"
            />
            <div className="w-[90%] md:w-1/2 h-full flex flex-col items-center justify-start border border-white p-6">
              <h3 className="secondary-font cusineFont mb-5 w-full text-left">
                The Presidential Meal
              </h3>
              <p className="secondary-font font-base-1 mb-5">
                A wholesome, balanced meal with 8 to 9 curated components
              </p>
              <ul className="list-disc list-inside font-base-1 pl-0 mb-2 md:mb-8 w-full">
                <li className="mb-4 font-base-3">Personalized Experience</li>
                <li className="mb-4 font-base-3">Signature Dishes</li>
                <li className="mb-4 font-base-3">Complete & Satisfying</li>
                <li className="mb-4 font-base-3">Elaborate Yet Compact</li>
              </ul>
              <Button
                className="primary-font uppercase bg-[#e6af55] text-center cursor-pointer font-semibold p-3 md:p-5"
                onClick={() => router.push("/order/presidential")}
              >
                <p className="text-[#03141C]! subbtnFont">Subscribe Now</p>
                <Image
                  src="/images/right-arrow.png"
                  alt="Presidential Meal"
                  width={30}
                  height={30}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CusinesPlan;
