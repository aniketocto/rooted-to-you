"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./order.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import { NextSeo } from "next-seo";

const OrderPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("authenticatedUser");
    if (user) {
      setIsLoggedIn(true);
    }

    localStorage.removeItem("mealFormData");
  }, []);

  const handleNavigate = (path) => {
    if (isLoggedIn) {
      router.push(path);
    } else {
      router.push(`/register?redirectTo=${encodeURIComponent(path)}`);
    }
  };

  return (
    <>
      <title>Meal Plans | Rooted To You</title>
      <meta
        name="description"
        content=" Executive and Presidential Meals according to your needs and preferences at your doorstep."
      />
      <section className="w-full h-fit flex justify-center items-center mt-32 px-[4%]">
        {/* <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100}
        className="absolute w-full top-0 z-[-1] "
        style={{
          objectFit: "cover"
        }}
      /> */}
        <img
          src="/images/nav-bg.jpg"
          className="absolute w-full h-[300px] object-cover z-[-1] top-0"
          alt=""
        />

        <div className="max-w-[1350px] w-full h-full flex flex-col items-baseline justify-start">
          <Breadcrumbs />
          {/* Executive Meal */}
          <div className="flex justify-center h-fit  items-start flex-col flexCol md:flex-row gap-0 md:gap-5">
            <div className="rounded-md w-full md:w-fit h-fit overflow-hidden">
              <Image
                src="/images/Executive-Cuisine.png"
                alt="Executive Meal"
                width={690}
                height={590}
                className="w-[1000px] max-w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full flex flex-col items-start justify-start">
              <h2
                className="secondary-font font-light"
                style={{ lineHeight: "50px" }}
              >
                The Executive Meal <br />
              </h2>
              <span className="primary-font text-white! text-sm pl-1.5">
                (5 to 6 components)
              </span>

              <p className="primary-font font-base-1 my-5">
                <em>
                  Rice, Dal, One Veg, Indian Breads Any 1 of Snack or Sweet or
                  Salad
                </em>
              </p>
              <div className="border border-[#e6af55] rounded-md p-5 pb-0 md:pb-0 mb-10">
                <ul className="list-with-image list-inside primary-font pl-5 mb-8 font-base-1 space-y-4">
                  <li>
                    <span className="font-semibold">Zero Decision-Making</span>:
                    Enjoy a new cuisine every day.
                  </li>
                  <li>
                    <span className="font-semibold">Balanced & Nourishing</span>
                    : Thoughtfully designed for taste and well-being.
                  </li>
                  <li>
                    <span className="font-semibold">Seamless Convenience</span>:
                    Quick, satisfying, and hassle-free.
                  </li>
                </ul>
              </div>
              <Button
                className="primary-font font-base-1 mb-28 bg-[#e6af55] p-6 flex items-center justify-center text-center cursor-pointer font-semibold"
                onClick={() => handleNavigate("/order/executive")}
              >
                <p className="text-[#03141C]! subbtnFont">Subscribe Now</p>
              </Button>
            </div>
          </div>

          {/* Presidential Meal */}
          <div className="flex justify-center items-start flex-col flexCol md:flex-row-reverse gap-0 md:gap-5">
            <div className="rounded-md w-full md:w-fit h-fit overflow-hidden">
              <Image
                src="/images/Presidential-Cuisine.png"
                alt="Presidential Meal"
                width={590}
                height={490}
                className="w-[1000px] max-w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full flex flex-col items-start justify-start">
              <h2
                className="secondary-font font-light"
                style={{ lineHeight: "50px" }}
              >
                The Presidential Meal{" "}
              </h2>
              <span className="primary-font text-white! text-sm pl-1.5">
                (8 to 9 components)
              </span>

              <p className="primary-font font-base-1 my-5">
                <em>
                  Rice, Dal, One Veg, Indian Breads, Salad, Entree, Sweet, Papad
                  / Pickle / Healthy Beverage, Mukhwas
                </em>
              </p>
              <div className="border border-[#e6af55] rounded-md p-5 pb-0 md:pb-0 mb-10">
                <ul className="list-with-image list-inside primary-font pl-5 mb-8 font-base-1 space-y-4">
                  <li>
                    <span className="font-semibold">
                      Personalized Experience
                    </span>
                    : Choose 3 cuisines from 5 for a diverse dining journey.
                  </li>
                  <li>
                    <span className="font-semibold">Elaborate Yet Compact</span>
                    : A well-balanced meal that blends indulgence with everyday
                    ease.
                  </li>
                  <li>
                    <span className="font-semibold">Complete & Satisfying</span>
                    : A fulfilling dining experience crafted to nourish,
                    delight, and leave you content.
                  </li>
                </ul>
              </div>
              <Button
                className="primary-font font-base-1 mb-28 bg-[#e6af55] p-6 flex items-center justify-center text-center cursor-pointer font-semibold"
                onClick={() => handleNavigate("/order/presidential")}
              >
                <p className="text-[#03141C]! subbtnFont">Subscribe Now</p>
              </Button>
            </div>
          </div>
        </div>
        <img
          src="/images/decorative.png"
          className="absolute bottom-0 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
      </section>
      {/* Trial Plan */}
      <section className="flex relative justify-center items-start flex-col flexCol md:flex-row gap-2 mb-32 px-5">
        <img
          src="/images/decorative.png"
          className="absolute top-0 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <div className="w-full md:w-[25%] flex justify-center items-center flex-col">
          <Image
            src="/images/Trial-Executive.png"
            alt="executive"
            width={330}
            height={420}
            quality={100}
          />
          <h3 className="mb-5 secondary-font">Executive Meal</h3>
          <Button
            className="primary-font uppercase bg-[#e6af55] text-center cursor-pointer font-semibold md:p-3 lg:p-5  px-6 py-6"
            onClick={() => handleNavigate("/order/executive?mode=trial")}
          >
            <p className="text-[#03141C]! subbtnFont">Order Now</p>
          </Button>
        </div>
        <div className="trial w-full md:w-[50%] h-full flex justify-center items-center flex-col">
          <p>Taste First, Subscribe Later</p>
          <h3>Try a Rooted Meal - Just One Click Away!</h3>
          <p>
            Authenticated Indian meals crafted with love <br />
            No Commitment. Just Pure Flavour
          </p>
        </div>
        <div className="w-full md:w-[25%] flex justify-center items-center flex-col">
          <Image
            src="/images/Trial-Presidential.png"
            alt="executive"
            width={330}
            height={420}
            quality={100}
          />
          <h3 className="mb-5 secondary-font">Presidential Meal</h3>
          <Button
            className="primary-font uppercase bg-[#e6af55] text-center cursor-pointer font-semibold md:p-3 lg:p-5  px-6 py-6"
            onClick={() => handleNavigate("/order/presidential?mode=trial")}
          >
            <p className="text-[#03141C]! subbtnFont secondary-font">
              Order Now
            </p>
          </Button>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
