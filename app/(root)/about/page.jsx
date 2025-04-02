"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <>
      <section className="w-full h-full flex justify-center flex-col items-center mb-32">
        <img src="/images/about.png" alt="" className="w-full" />
        <div className="w-full h-full px-32 my-32">
          <p className="primary-font font-base text-center">
            At Rooted to You, we believe that food is more than just
            nourishment—it’s a cultural experience, a bridge to our heritage,
            and a celebration of flavors passed down through generations. Our
            mission is to bring India’s rich and diverse food culture under one
            roof, reviving traditional recipes with a modern twist to suit
            today’s fast-paced lifestyle.
          </p>
          <br />
          <p className="primary-font font-base text-center">
            Rooted in authenticity and crafted for convenience, our meals honor
            the essence of Indian cuisine while embracing contemporary tastes.
            Whether it's the comforting warmth of home-cooked flavors or the
            excitement of discovering regional delicacies, every meal we serve
            tells a story of tradition, passion, and innovation.
          </p>
        </div>
        <div className="w-full h-full flex justify-center items-center flex-col gap-10 relative mb-10">
          <div className="w-full flex items-center justify-center gap-10">
            <div className="w-[20%] flex items-center justify-start">
              <Image
                src="/images/mission.png"
                width={379}
                height={452}
                alt="Our Mission"
              />
            </div>
            <div className="w-[60%] flex justify-center items-start gap-5 flex-col">
              <h2 className="secondary-font">Mission</h2>
              <p className="primary-font font-base text-left">
                At Rooted to You, our mission is to preserve and celebrate
                India's rich culinary heritage while making it accessible and
                convenient for modern lifestyles. We strive to bring authentic,
                time-honored recipes to the table, infused with a contemporary
                touch—ensuring every meal is wholesome, flavorful, and
                effortlessly enjoyable.
              </p>
            </div>
          </div>
          <img
            src="/images/about-deco.png"
            alt=""
            className="w-full h-fit absolute"
          />
          <div className="w-full flex flex-row-reverse items-center justify-center gap-10">
            <div className="w-[20%] flex items-center justify-center">
              <Image
                src="/images/mission.png"
                width={379}
                height={452}
                alt="Our Mission"
              />
            </div>
            <div className="w-[60%] flex justify-end items-start gap-5 flex-col">
              <h2 className="secondary-font">Mission</h2>
              <p className="primary-font font-base text-left">
                At Rooted to You, our mission is to preserve and celebrate
                India's rich culinary heritage while making it accessible and
                convenient for modern lifestyles. We strive to bring authentic,
                time-honored recipes to the table, infused with a contemporary
                touch—ensuring every meal is wholesome, flavorful, and
                effortlessly enjoyable.
              </p>
            </div>
          </div>
        </div>

        <Button
          className="primary-font uppercase text-lg bg-[#e6af55] px-10 py-5 flex items-center justify-center  text-center cursor-pointer font-semibold"
          onClick={() => router.push("/order")}
        >
          <p className="text-[#03141c]! text-2xl mt-1.5">Subscribe Now</p>
        </Button>
      </section>
    </>
  );
};

export default page;
