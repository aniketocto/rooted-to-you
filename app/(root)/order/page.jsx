'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const orderPage = () => {
  const router = useRouter();
  return (
    <section className="w-full h-fit flex justify-center items-center my-20">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100} // Increase quality (0-100)
        className="absolute top-0 z-[-1]"
      />
      <div className="max-w-[1240px] w-full h-full flex flex-col  items-baseline justify-start md:mx-10 mx-5 gap-32">
        <div className="flex justify-start items-start flex-col md:flex-row gap-5">
          <div className="rounded-md w-full md:w-1/2 h-full overflow-hidden">
            <Image
              src="/images/executive-meal.jpg"
              width={612}
              height={698}
              alt="Executive Meal"
            />
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-start ">
            <h2 className="secondary-font mb-5 font-light">
              The Executive Meal
            </h2>
            <p className="primary-font text-2xl mb-5">
              A wholesome, balanced meal with 5 to 6 curated components,
              delivering variety without the hassle.
            </p>

            <div className="border border-[#e6af55] rounded-md p-5 md:p-10 mb-10">
              <ul className="list-with-image list-inside primary-font pl-5 mb-8 text-xl space-y-4">
                <li className="">
                  <span className="font-semibold">Zero Decision-Making</span> :
                  Enjoy a new cuisine every day.
                </li>
                <li className="">
                  <span className=" font-semibold">Balanced & Nourishing</span>{" "}
                  : Thoughtfully designed for taste and well-being.
                </li>
                <li className="">
                  <span className="font-semibold">Complete Meal</span> :
                  Includes rice, Dal, one vegetable, and Indian breads, plus a
                  choice of snack, sweet, or salad.
                </li>
                <li className="">
                  <span className=" font-semibold">Seamless Convenience</span>:
                  Quick, satisfying, and hassle-free.
                </li>
              </ul>
            </div>

            <Button
              className="primary-font uppercase text-lg bg-[#e6af55]  text-center cursor-pointer font-semibold"
              onClick={() => router.push("/order/executive")}
            >
              <p className="text-[#03141C]! ">Subscribe Now</p>
            </Button>
          </div>
        </div>

        <div className="flex justify-start items-start flex-col md:flex-row-reverse gap-10">
          <div className="rounded-md w-full md:w-1/2 h-full overflow-hidden ">
            <Image
              src="/images/presidential-meal.jpg"
              width={612}
              height={698}
              alt="presidential Meal"
            />
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-start ">
            <h2 className="secondary-font mb-5 font-light">
              The Presidential Meal
            </h2>
            <p className="primary-font text-2xl mb-5">
              An indulgent 8 to 9-component spread, designed for those who savor
              variety and richness.
            </p>

            <div className="border border-[#e6af55] rounded-md p-5 md:p-10 mb-10">
              <ul className="list-with-image list-inside primary-font  pl-5 mb-8 text-xl space-y-4">
                <li className="">
                  Personalized Experience: Choose 3 cuisines from 5 for a
                  diverse dining journey.
                </li>
                <li className="">
                  Signature Dishes: Featuring chef-special creations for a
                  refined taste.
                </li>
                <li className="">
                  Complete & Satisfying: Includes Rice, Dal, One Veg, Indian
                  Breads, Salad, Entrée, Sweet, plus a choice of Papad, Pickle,
                  or Healthy Beverage, finished with Mukhwas.
                </li>
                <li className="">
                  Elaborate Yet Compact: A well-balanced meal that blends
                  indulgence with everyday ease.
                </li>
              </ul>
            </div>
            <Button
              className="primary-font uppercase text-lg bg-[#e6af55]  text-center cursor-pointer font-semibold"
              onClick={() => router.push("/order/presidential")}
            >
              <p className="text-[#03141C]! ">Subscribe Now</p>
            </Button>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default orderPage;
