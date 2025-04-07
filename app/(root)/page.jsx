import Cuisines from "@/components/Cusines";
import CusinesPlan from "@/components/CusinesPlan";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import { Separator } from "@/components/ui/separator";
import { features } from "@/lib/helper";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Feature Section */}
      <section className="w-full h-full flex justify-center items-center my-[100px]">
        <div className="w-full h-full flex flex-wrap items-center justify-center md:mx-10 mx-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 w-full">
            {features.map(({ label, img }) => (
              <div
                key={label}
                className="p-4 h-[150px] border-white border-[0.5px] rounded-sm flex flex-col gap-5 items-center justify-center"
              >
                <Image
                  src={img}
                  alt={label}
                  width={50}
                  height={50}
                  quality={100}
                  className="factImg"
                />
                <h4 className="secondary-font text-center font-light! factFontSize text-[#E6AF55]!">
                  {label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <Steps />

      {/* Decorative Divider Image */}
      <div className="w-full relative z-[-1] mt-[-15%]">
        <img
          src="/images/about-deco.png"
          alt="Section Divider"
          className="w-full hidden md:block"
        />
      </div>
      {/* Cusines */}
      <div className="w-full h-full mt-[-15%]">
        <Cuisines />
      </div>

      {/* Facts */}
      <section
        className="w-full md:h-[400px] overflow-hidden justify-center items-center my-20 flex relative"
        style={{
          backgroundImage: "url('/images/about-deco.png')",
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[100%] w-full h-[20vh] grid grid-cols-2 md:grid-cols-4 gap-8  ">
          {[
            { value: "1000+", text: "Subscribers" },
            { value: "50,000+", text: "Meals Delivered" },
            { value: "250+", text: "Postal Locations" },
            { value: "99%", text: "Record On-Time Delivery" },
          ].map(({ value, text }, index) => (
            <div
              key={text}
              className="flex flex-col justify-center items-center gap-2 relative"
            >
              <h1 className="secondary-font">{value}</h1>
              <p className="secondary-font xl:text-3xl md: text-center">
                {text}
              </p>

              {/* Add vertical separator for large screens between 1, 2, and 3 */}
              {index !== 3 && (
                <div className="hidden lg:block absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-[2px] h-full bg-[#e6af55]"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Cusines Plan */}
      <CusinesPlan />
    </>
  );
}
