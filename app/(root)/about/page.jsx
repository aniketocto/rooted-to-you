"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import "./about.css";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <section className="relative w-full h-dvh flex-col justify-end md:justify-center about-banner items-start mb-32 bg-cover bg-bottom hidden md:flex">
        <div className="relative z-10 text-white text-left w-fit px-6 ml-[4%] mt-[12%]">
          <h1 className="secondary-font font-bold text-[6vw]!">
            Rooted in <br /> Tradition, <br /> Crafted for <br /> Today
          </h1>
        </div>
      </section>

      <img
        src="/images/aboutMob.png"
        alt=""
        className="block md:hidden w-full"
      />

      <section className="about-section">
        <p className="primary-font font-base-1">
          At Rooted to You, we believe that food is more than just
          nourishment—it’s a cultural experience, a bridge to our heritage, and
          a celebration of flavors passed down through generations. Our mission
          is to bring India’s rich and diverse food culture under one roof,
          reviving traditional recipes with a modern twist to suit today’s
          fast-paced lifestyle.
        </p>
        <br />
        <p className="primary-font font-base-1">
          Rooted in authenticity and crafted for convenience, our meals honor
          the essence of Indian cuisine while embracing contemporary tastes.
          Whether it's the comforting warmth of home-cooked flavors or the
          excitement of discovering regional delicacies, every meal we serve
          tells a story of tradition, passion, and innovation.
        </p>
      </section>

      {/* Purpose Section */}
      <section className="about-section">
        <img
          src="/images/decorative.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <div
          className="md:w-full z-10 w-full flex items-center flex-col md:flex-row justify-start gap-10"
          data-aos="fade-up"
        >
          <div className="md:w-[30%] w-full flex flex-row items-center justify-start">
            <Image
              src="/images/mission.png"
              width={230}
              height={327}
              alt="Our Mission"
              className="w-[50%] sm:w-full"
            />
          </div>
          <div className=" w-full flex justify-center items-start gap-5 flex-col">
            <h2 className="secondary-font font-semibold">Purpose</h2>
            <p className="primary-font font-base-1 text-left">
              At Rooted to You, we believe that food is more than just
              nourishment—it’s a cultural experience, a bridge to our heritage,
              and a celebration of flavors passed down through generations. our
              meals honor the essence of Indian cuisine while embracing
              contemporary tastes. Whether it's the comforting warmth of
              home-cooked flavors or the excitement of discovering regional
              delicacies, every meal we serve tells a story of tradition,
              passion, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <img
          src="/images/decorative.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <h2 className="secondary-font  font-semibold mb-15">Values</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-15">
          <div className="flex-1/2 flex flex-col items-start justify-start gap-5 border-2 p-5 rounded-3xl  border-[#e6af55]">
            <h3 className="primary-font text-white!  text-2xl font-semibold">
              Reconnect
            </h3>
            <p className="primary-font font-base-1 text-left">
              We believe, sharing food is key to cultivating new connections and
              fostering new bonds.Our meals are to be shared, encouraging
              conversations and creating moments thatbring us closer.
            </p>
          </div>
          <div className="flex-1/2 flex flex-col items-start justify-start gap-5 border-2 p-5 rounded-3xl border-[#e6af55]">
            <h3 className="primary-font text-white! text-2xl font-semibold">
              Share
            </h3>
            <p className="primary-font font-base-1 text-left">
              We help you understand your food’s origins, cultural significance,
              and appreciate the hands that prepared it. This deeper connection
              encourages mindful eating, appreciation of culinary arts, and a
              more meaningful dining experience.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-15 mt-15">
          <div className="flex-1/2 flex flex-col items-start justify-start gap-5 border-2 p-5 rounded-3xl border-[#e6af55] ">
            <h3 className="primary-font text-white! text-2xl font-semibold">
              Sustain
            </h3>
            <p className="primary-font font-base-1 text-left">
              We’re rooted in our commitment to positive environmental impact.
              Our eco-friendly packaging promotes recycling and proper
              disposal—offering a guilt-free meal and a healthier planet.
            </p>
          </div>
          <div className="flex-1/2 flex flex-col items-start justify-start gap-5 border-2 p-5 rounded-3xl border-[#e6af55]">
            <h3 className="primary-font text-white! text-2xl font-semibold">
              Rebuild
            </h3>
            <p className="primary-font font-base-1 text-left">
              Rooted champions inclusivity through a diverse range of cultural
              tastes and preferences. We’re building a community that welcomes
              all to explore the rich flavors of our country—together.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section my-32! h-[70dvh]">
        <img
          src="/images/decorative.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <div className="relative flex flex-col md:flex-row items-start justify-start gap-15">
          <div className="flex-1/2 flex flex-col md:flex-row items-start justify-start gap-5 ">
            <img src="/images/main.png" />
            <div className="flex flex-col items-start justify-start gap-5">
              <h3 className="secondary-font text-left">Our Founder</h3>
              <p className="primary-font text-sm md:text-lg text-left">
                Rooted was founded by, Saurabh Wadkar, a globetrotting chef and
                food entrepreneur whose journey-from the corridors of Le Cordon
                Bleu to kitchens in Mumbai, Southern Australia, Bangkok,
                California, and Boston has always been guided by one belief:
                that the most powerful food stories begin at home.
              </p>
              <p className="primary-font text-left">
                <em className="text-left">"Bringing back the joy of eating"</em>{" "}
                <br />
                <span>Saurabh Wadkar</span>
              </p>
            </div>
          </div>

          <div className="flex-1/2 flex flex-col items-start justify-start gap-5 border-0 md:border-l-2 border-[#e6af55] md:pl-5">
            <div className="flex flex-col items-start justify-start gap-5">
              <h3 className="secondary-font text-left">Team Of Food Lovers</h3>
              <p className="primary-font text-sm md:text-lg text-left">
                Backed by a passionate team of chefs, food lovers, and
                hospitality professionals, we're not just serving meals-we're
                nurturing a quiet revolution. One that brings forth the rich
                heritage, diverse flavours of India to our everyday lives.
                Because what matters most isn't just what we eat-it's how it
                makes us feel.
              </p>
              <div className="flex flex-wrap items-center justify-start gap-5 mt-5">
                <img src="/images/1st.png" alt="" />
                <img src="/images/2nd.png" alt="" />
                <img src="/images/3rd.png" alt="" />
                <img src="/images/4th.png" alt="" />
                <img src="/images/5th.png" alt="" />
                <img src="/images/6th.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="about-section py-5! borders relative overflow-hidden">
        <img
          src="/images/decorative.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <div>
          <h2 className="secondary-font  font-semibold mb-10">
            Our Business Partners
          </h2>
          <div>
            <div className="flex flex-wrap items-center justify-around gap-5 px-[5% ] mt-5">
              <img
                src="/images/partner1.png"
                className="w-[40%] md:w-[15%]"
                alt=""
              />
              <img
                src="/images/partner2.png"
                className="w-[100px] md:w-[120px]"
                alt=""
              />
              <img
                src="/images/partner3.png"
                className="w-[100px] md:w-[120px]"
                alt=""
              />
              <img
                src="/images/partner4.png"
                className="w-[40%] md:w-[15%]"
                alt=""
              />
              <img
                src="/images/partner5.png"
                className="w-[40%] md:w-[20%]"
                alt=""
              />
              <img
                src="/images/partner6.png"
                className="w-[40%] md:w-[10%]"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
