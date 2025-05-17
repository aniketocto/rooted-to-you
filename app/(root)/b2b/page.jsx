"use client";

import CorporatePlan from "@/components/CorporatePlan";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./b2b.css";
import { Button } from "@/components/ui/button";
import { NextSeo } from "next-seo";

const Page = () => {
  const router = useRouter();
  const smoothScrollTo = (target, duration) => {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const scroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Ensure it doesn't go past 100%

      window.scrollTo(0, startPosition + distance * progress);

      if (elapsed < duration) {
        window.requestAnimationFrame(scroll);
      }
    };

    window.requestAnimationFrame(scroll);
  };

  return (
    <>
      <title>For Businesses | Rooted To You</title>
      <meta
        name="description"
        content=" Foster a vibrant, united workplace. Choose our meals for your team and serve the true essence of lunch that makes them bond"
      />
      <section className="relative w-full h-dvh flex-col justify-center b2b-banner items-start mb-32 bg-cover bg-bottom flex">
        <div className="flex flex-col items-center md:items-start justify-center w-full md:w-[100%] gap-5 -mt-[10%] md:mt-[10%] px-8 bcb-banner">
          <h1 className="secondary-font text-[#E6AF55] font-bold hidden md:block tab-view">
            Convenient.
            <br /> Diverse. <br />
            Inclusive.
          </h1>
          <p className="primary-font hero-font font-base mb-5 hidden md:block tab-view">
            Hassle-free for employees and cost-effective for corporates,<br /> Rooted
            brings people together through their shared love for<br /> food, fostering
            a culture of mutual respect.
          </p>
          <Button
            className="primary-font uppercase bg-[#e6af55] text-center cursor-pointer font-semibold md:p-3 lg:p-5  px-6 py-6 tab-view-btn"
            onClick={() => {
              const section = document.getElementById("corporateplan");
              if (section) {
                smoothScrollTo(section, 500); // Adjust duration (1000 ms = 1 second)z
              }
            }}
          >
            <p className="text-[#03141C]! subbtnFont secondary-font">
              Enquire Now
            </p>
          </Button>
        </div>
      </section>

      <section className="w-full h-full px-8 md:px-15 md:my-28 my-10 text-center">
        <h2 className="main-head secondary-font w-full font-semibold mb-5">
          Here’s how partnering with Rooted can transform your business
          environment
        </h2>
      </section>

      {/* Mission Section */}
      <section className="w-full flex flex-col items-center gap-10 mb-10 relative  overflow-hidden">
        <img
          src="/images/decorative.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <img
          src="/images/decorative.png"
          className="absolute top-0 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <img
          src="/images/decorative.png"
          className="absolute bottom-0 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <div
          className="md:w-full z-10 w-[90%] flex items-center flex-col md:flex-row justify-center gap-10"
          data-aos="fade-up"
        >
          <Image
            src="/images/bcb1.png"
            width={379}
            height={452}
            alt="Our Mission"
            className="w-[200px]"
          />

          <div className="md:w-[60%] w-full flex justify-center items-start gap-5 flex-col">
            <h4 className="primary-font text-white! font-semibold">
              Boost Inter-Cultural Respectability Amongst Employees{" "}
            </h4>
            <p className="primary-font font-base-1 text-left">
              When employees share food, they are not just exchanging dishes,
              but also their culture, traditions and values. This very exchange
              fosters understanding and respect, breaking down barriers and
              building a more inclusive workplace. Through these shared
              experiences, food becomes a powerful tool for promoting
              inter-cultural respect.
            </p>
          </div>
        </div>

        <div
          className="md:w-full z-10 w-[90%] flex flex-col md:flex-row-reverse items-center justify-center gap-10"
          data-aos="fade-up"
        >
          <Image
            src="/images/bcb2.png"
            width={379}
            height={452}
            alt="Our Mission"
            className="w-[200px]"
          />

          <div className="md:w-[60%] w-full flex justify-end items-start gap-5 flex-col">
            <h4 className="primary-font text-white! font-semibold">
              Bolsters Creativity by Reducing Food Monotony
            </h4>
            <p className="primary-font font-base-1 text-left">
              Our ever-changing menus break the cycle of food monotony,
              stimulating a sense of newness and inspiring creativity. When
              employees look forward to meal times to explore new tastes and
              dishes, it translates into a more dynamic and innovative approach
              to their work.
            </p>
          </div>
        </div>
        <div
          className="md:w-full z-10 w-[90%] flex items-center flex-col md:flex-row justify-center gap-10"
          data-aos="fade-up"
        >
          <Image
            src="/images/bcb3.png"
            width={379}
            height={452}
            alt="Our Mission"
            className="w-[200px]"
          />

          <div className="md:w-[60%] w-full flex justify-center items-start gap-5 flex-col">
            <h4 className="primary-font text-white! font-semibold">
              Increases Post-Lunch Productivity
            </h4>
            <p className="primary-font font-base-1 text-left">
              Our approach to a balanced and wholesome meal ensures that
              employees are content with joy, without being overly heavy,
              keeping your team energized, focused, and ready to tackle the
              challenges of the afternoon with renewed vigour.
            </p>
          </div>
        </div>

        <div
          className="md:w-full z-10 w-[90%] flex flex-col md:flex-row-reverse items-center justify-center gap-10"
          data-aos="fade-up"
        >
          <Image
            src="/images/bcb4.png"
            width={379}
            height={452}
            alt="Our Mission"
            className="w-[200px]"
          />

          <div className="md:w-[60%] w-full flex justify-end items-start gap-5 flex-col">
            <h4 className="primary-font text-white! font-semibold">
              Encourages Interaction
            </h4>
            <p className="primary-font font-base-1 text-left">
              Our Culture Chronicles initiative elevates meal times by
              encouraging not just the sharing of food, but also the stories
              behind it. This creates opportunities for teams to connect more
              deeply, sparking richer conversations and interactions around the
              meals they enjoy together.
            </p>
          </div>
        </div>
        <div
          className="md:w-full z-10 w-[90%] flex items-center flex-col md:flex-row justify-center gap-10"
          data-aos="fade-up"
        >
          <Image
            src="/images/bcb5new.png"
            width={379}
            height={452}
            alt="Our Mission"
            className="w-[200px]"
          />

          <div className="md:w-[60%] w-full flex justify-center items-start gap-5 flex-col">
            <h4 className="primary-font text-white! font-semibold">
              Curtails Operating Costs of Cafeterias
            </h4>
            <p className="primary-font font-base-1 text-left">
              Managing an in-house cafeteria can be a significant financial and
              operational burden. Partnering with Rooted proves to be a highly
              cost-effective alternative, eliminating the need for extensive
              cafeteria operations while still providing your employees with
              high-quality, diverse dining options.
            </p>
          </div>
        </div>

        <div
          className="md:w-full z-10 w-[90%] flex flex-col md:flex-row-reverse items-center justify-center gap-10"
          data-aos="fade-up"
        >
          <Image
            src="/images/bcb6.png"
            width={379}
            height={452}
            alt="Our Mission"
            className="w-[200px]"
          />

          <div className="md:w-[60%] w-full flex justify-end items-start gap-5 flex-col">
            <h4 className="primary-font text-white! font-semibold">
              Promotes Sustainability
            </h4>
            <p className="primary-font font-base-1 text-left">
              From ethically sourcing the freshest ingredients to utilising
              packaging that's not only eco-friendly but also recyclable. We are
              rooted into significantly maximizing every corporate’s
              environment-friendly impact.
            </p>
          </div>
        </div>
      </section>

      <CorporatePlan />
    </>
  );
};

export default Page;
