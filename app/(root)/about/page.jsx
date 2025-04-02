"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <section
        className="relative w-full h-screen flex flex-col justify-center items-start mb-32 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about-banner.jpg')" }}
      >

        <div className="relative z-10 text-white text-left w-fit px-6 ml-[4%] mt-[12%]">
          <h1 className="secondary-font font-bold text-3xl md:text-7xl!">
            Rooted in <br /> Tradition, <br /> Crafted for <br /> Today
          </h1>
        </div>
      </section>

      <section className="w-full h-full px-8 md:px-32 mb-28 text-center">
        <p className="primary-font text-lg">
          At Rooted to You, we believe that food is more than just
          nourishment—it’s a cultural experience, a bridge to our heritage, and
          a celebration of flavors passed down through generations. Our mission
          is to bring India’s rich and diverse food culture under one roof,
          reviving traditional recipes with a modern twist to suit today’s
          fast-paced lifestyle.
        </p>
        <br />
        <p className="primary-font text-lg">
          Rooted in authenticity and crafted for convenience, our meals honor
          the essence of Indian cuisine while embracing contemporary tastes.
          Whether it's the comforting warmth of home-cooked flavors or the
          excitement of discovering regional delicacies, every meal we serve
          tells a story of tradition, passion, and innovation.
        </p>
      </section>

      {/* Mission Section */}
      <section className="w-full flex flex-col items-center gap-10 mb-10 relative">
        <div className="md:w-full z-10 w-[90%] flex items-center flex-col md:flex-row justify-center gap-10">
          <div className="md:w-[20%] w-full flex flex-row items-center justify-start">
            <Image
              src="/images/mission.png"
              width={379}
              height={452}
              alt="Our Mission"
            />
          </div>
          <div className="md:w-[60%] w-full flex justify-center items-start gap-5 flex-col">
            <h2 className="secondary-font text-2xl font-semibold">Mission</h2>
            <p className="primary-font text-lg text-left">
              At Rooted to You, our mission is to preserve and celebrate India's
              rich culinary heritage while making it accessible and convenient
              for modern lifestyles. We strive to bring authentic, time-honored
              recipes to the table, infused with a contemporary touch—ensuring
              every meal is wholesome, flavorful, and effortlessly enjoyable.
            </p>
          </div>
        </div>

        {/* Decorative Background Image */}
        <img
          src="/images/about-deco.png"
          alt="Decorative"
          className="absolute w-full h-auto md:block hidden z-0 pointer-events-none"
        />

        <div className="md:w-full z-10 w-[90%] flex flex-col md:flex-row-reverse items-center justify-center gap-10">
          <div className="md:w-[20%] w-full flex items-center justify-center">
            <Image
              src="/images/vission.png"
              width={379}
              height={452}
              alt="Our Mission"
            />
          </div>
          <div className="md:w-[60%] w-full flex justify-end items-start gap-5 flex-col">
            <h2 className="secondary-font text-2xl font-semibold">Vission</h2>
            <p className="primary-font text-lg text-left">
            To redefine everyday dining by making fresh, nutritious, and expertly curated meals easily accessible to those with busy lifestyles. Rooted to You envisions a world where people no longer rely on unhealthy takeouts or struggle with meal prep—where wholesome, restaurant-quality food is just a doorstep away, offering convenience without compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe Button */}
      <div className="w-full flex justify-center">
        <Button
          className="primary-font uppercase text-lg mb-28 bg-[#e6af55] px-10 py-5 flex items-center justify-center text-center cursor-pointer font-semibold"
          onClick={() => router.push("/order")}
        >
          <p className="text-[#03141c]! text-2xl mt-1.5">Subscribe Now</p>
        </Button>
      </div>
    </>
  );
};

export default Page;
