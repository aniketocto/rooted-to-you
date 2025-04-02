"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CusinesPlan = () => {
  const router = useRouter();
  return (
    <section className="w-full h-fit flex flex-col justify-center items-center gap-5 my-10">
      <div className="max-w-[1440px] w-full h-fit flex flex-wrap items-center gap-20 justify-center py-10  md:mx-10 mx-5">
        <h2 className="secondary-font text-center">Our Cuisine Plans</h2>
        <div className="w-[95%] h-full flex justify-center flex-col md:flex-row items-center gap-2.5">
          <div className="flex flex-1 h-full justify-center flex-col md:flex-row items-center gap-2.5">
            <Image
              src="/images/executive.png"
              alt="executive"
              width={330}
              height={420}
            />
            <div className="w-[90%] md:w-1/2 md:h-[400px] h-fit flex flex-col items-center justify-start border border-white p-6">
              <h3 className="primary-font text-2xl! mb-5 w-full text-left">
                The Executive Meal
              </h3>
              <p className="secondary-font font-base mb-5">
                A wholesome, balanced meal with 5 to 6 curated components
              </p>
              <ul className="list-disc list-inside pl-0 mb-8 w-full">
                <li className="mb-4">Zero Decision-Making</li>
                <li className="mb-4">Balanced & Nourishing</li>
                <li className="mb-4">Complete Meal</li>
                <li className="mb-4">Seamless Convenience</li>
              </ul>
              <Button
                className="primary-font uppercase text-lg bg-[#e6af55]  text-center cursor-pointer font-semibold"
                onClick={() => router.push("/order/executive")}
              >
                <Image
                  src="/images/right-arrow.png"
                  alt="Presidential Meal"
                  width={25}
                  height={25}
                  className="rotate-180"
                />
                <p className="text-[#03141C]! ">Subscribe Now</p>
              </Button>
            </div>
          </div>
          <div className="flex flex-1 h-full justify-center flex-col md:flex-row-reverse items-center gap-2.5">
            <Image
              src="/images/presidential.png"
              alt="presidential "
              width={330}
              height={420}
            />
            <div className="w-[90%] md:w-1/2 md:h-[400px] h-fit flex flex-col items-center justify-start border border-white p-6">
              <h3 className="primary-font text-2xl!  mb-5 w-full text-left">
                The Presidential Meal
              </h3>
              <p className="secondary-font font-base mb-5">
                A wholesome, balanced meal with 8 to 9 curated components
              </p>
              <ul className="list-disc list-inside pl-0 mb-8 w-full">
                <li className="mb-4">Personalized Experience</li>
                <li className="mb-4">Signature Dishes</li>
                <li className="mb-4">Complete & Satisfying</li>
                <li className="mb-4">Elaborate Yet Compact</li>
              </ul>
              <Button
                className="primary-font uppercase text-lg bg-[#e6af55]  text-center cursor-pointer font-semibold"
                onClick={() => router.push("/order/presidential")}
              >
                <p className="text-[#03141C]!">Subscribe Now</p>
                <Image
                  src="/images/right-arrow.png"
                  alt="Presidential Meal"
                  width={25}
                  height={25}
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
