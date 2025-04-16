"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const Steps = () => {
  const router = useRouter();
  return (
    <section className="w-full h-fit flex flex-col justify-center items-center relative gap-5 my-10 overflow-hidden">
      <img src="/images/about-deco.png" className=" w-full h-full sm:h-auto  absolute object-cover opacity-80 z-[-1] top-0 sm:top-1/2" alt="" />

      <div className=" w-full h-fit flex flex-wrap items-center gap-10  xl:gap-20 justify-center py-10 md:px-10 px-5">
        <h2 className="secondary-font text-center" data-aos="fade-down">
          Effortless, Healthy Eating in <br /> Just 4 Steps
        </h2>
        <div className="grid w-full grid-cols-2 place-content-center sm:grid-cols-2 lg:grid-cols-4 md:gap-0 gap-5">
          <div className="flex justify-center items-center flex-col" data-aos="fade-left" data-aos-delay="100">
            <Image
              src="/images/step_1.png"
              alt="{title}"
              width={280}
              height={100}
            />
            <div className="flex flex-col items-center justify-center gap-5 mt-5">
              <h3 className="primary-font text-center px-5">
                Choose Your <br /> Plan
              </h3>
              <hr className="w-0.5 h-8 border-0 bg-[#e6af55]" />
              <p className=" text-center font-base md:px-[10%]">
                Pick between Executive or Presidential. Customize to match your
                taste and schedule.
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center flex-col" data-aos="fade-left" data-aos-delay="200">
            <Image
              src="/images/step_2.png"
              alt="{title}"
              width={280}
              height={100}
            />
            <div className="flex flex-col items-center justify-center gap-5 mt-5">
              <h3 className="primary-font text-center px-5">
                Set Your <br /> Schedule
              </h3>
              <hr className="w-0.5 h-8 border-0 bg-[#e6af55]" />
              <p className=" text-center font-base md:px-[14%]">
                Choose how many meals you want and when. Pause, modify, or
                cancel anytime.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col" data-aos="fade-left" data-aos-delay="300">
            <Image
              src="/images/step_3.png"
              alt="{title}"
              width={280}
              height={100}
            />
            <div className="flex flex-col items-center justify-center gap-5 mt-5">
              <h3 className="primary-font text-center px-5">
                Freshly Cooked <br /> & Delivered
              </h3>
              <hr className="w-0.5 h-8 border-0 bg-[#e6af55]" />
              <p className=" text-center font-base">
                Meals are cooked fresh daily with premium, preservative-free
                ingredients and delivered to your door.
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center flex-col" data-aos="fade-left" data-aos-delay="400">
            <Image
              src="/images/step_4.png"
              alt="{title}"
              width={280}
              height={100}
            />
            <div className="flex flex-col items-center justify-center gap-5 mt-5">
              <h3 className="primary-font text-center px-5">
                Enjoy Effortless <br />
                Meals
              </h3>
              <hr className="w-0.5 h-8 border-0 bg-[#e6af55]" />
              <p className=" text-center font-base md:px-[10%]">
                Unpack and savor balanced, restaurant-quality meals — no stress,
                just good food.
              </p>
            </div>
          </div>
        </div>
        <Button
          className="primary-font uppercase text-lg bg-[#e6af55] p-5 text-center cursor-pointer font-semibold"
          onClick={() => router.push("/order")}
        >
          <p className="text-[#03141C]! subbtnFont">Subscribe Now</p>
        </Button>
      </div>
    </section>
  );
};

export default Steps;
