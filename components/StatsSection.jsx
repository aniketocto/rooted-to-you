'use client';

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 1000, suffix: "+", text: "Subscribers" },
  { value: 50000, suffix: "+", text: "Meals Delivered" },
  { value: 250, suffix: "+", text: "Postal Locations" },
  { value: 99, suffix: "%", text: "Record On-Time Delivery" },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="w-full md:h-[400px] overflow-hidden justify-center items-center my-20 flex relative"
      style={{
        backgroundImage: "url('/images/about-deco.png')",
        backgroundSize: "cover",
        backgroundPosition: "bottom top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="max-w-[100%] w-full h-[20vh] grid grid-cols-2 md:grid-cols-4 gap-8"
        data-aos="zoom-in"
      >
        {stats.map(({ value, suffix, text }, index) => (
          <div
            key={text}
            className="flex flex-col justify-center items-center gap-2 relative"
          >
            <h1 className="secondary-font text-4xl font-bold">
              {inView ? <CountUp end={value} duration={2} /> : 0}
              {suffix}
            </h1>
            <p className="primary-font xl:text-3xl text-center">{text}</p>

            {/* Vertical Separator */}
            {index !== stats.length - 1 && (
              <div className="hidden lg:block absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-[2px] h-full bg-[#e6af55]"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
