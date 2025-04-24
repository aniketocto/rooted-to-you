"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Steps = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile = width <= 768px
    };

    handleResize(); // check on first load
    window.addEventListener("resize", handleResize); // update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      img: "/images/step_1.png",
      title: "Choose Your Plan",
      desc: "Pick between Executive or Presidential. Customize to match your taste and schedule.",
    },
    {
      img: "/images/step_2.png",
      title: "Set Your Schedule",
      desc: "Choose how many meals you want and when. Pause, modify, or cancel anytime.",
    },
    {
      img: "/images/step_3.png",
      title: "Freshly Cooked & Delivered",
      desc: "Meals are cooked fresh daily with premium, preservative-free ingredients and delivered to your door.",
    },
    {
      img: "/images/step_4.png",
      title: "Enjoy Effortless Meals",
      desc: "Unpack and savor balanced, restaurant-quality meals — no stress, just good food.",
    },
  ];

  return (
    <section className="w-full h-fit flex flex-col justify-center items-center relative gap-5 my-10 overflow-hidden">
      <img src="/images/decorative.png" className="absolute top-0 -z-1 h-[500px] md:w-full object-cover" alt="" />
      <img src="/images/decorative.png" className="absolute bottom-0 -z-1 h-[500px] md:w-full object-cover" alt="" />
      <div className="w-full h-fit flex flex-wrap items-center gap-10 xl:gap-20 justify-center py-10 md:px-10 px-5">
        <h2
          className="secondary-font  text-center"
          data-aos={isMobile ? "fade-up" : ""}
          style={{lineHeight: 'normal'}}
        >
          Effortless, Healthy Eating in <br /> Just 4 Steps
        </h2>

        <div className="grid w-full grid-cols-2 place-content-center sm:grid-cols-2 lg:grid-cols-4 md:gap-0 gap-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex justify-start items-center flex-col group transition-all duration-500"
            >
              <Image
                src={step.img}
                alt={step.title}
                width={280}
                height={100}
                className={`transition-transform duration-300 ${
                  isMobile ? "scale-105" : "group-hover:scale-105"
                }`}
              />

              <h3 className="secondary-font text-center px-5 md:px-10 mt-5 transition-colors duration-300 group-hover:text-[#e6af55] text-[#e6af55]">
                {step.title}
              </h3>

              <hr className="w-0.5 h-8 my-2 border-0 bg-[#e6af55]" />
              <div
                className={`flex flex-col items-center justify-center gap-5 transition-all duration-500 ${
                  isMobile
                    ? ""
                    : "opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0"
                }`}
                data-aos={isMobile ? "fade-up" : ""}
                data-aos-delay={isMobile ? index * 100 : ""}
              >
                <p className="text-center font-base primary-font md:px-[10%]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="primary-font uppercase text-lg bg-[#e6af55] p-3 md:p-5 text-center cursor-pointer font-semibold"
          onClick={() => router.push("/order")}
        >
          <p className="text-[#03141C]! subbtnFont">Subscribe Now</p>
        </Button>
      </div>
    </section>
  );
};

export default Steps;
