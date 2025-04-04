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
                className="p-4 h-[220px] border border-white rounded-sm flex flex-col gap-5 items-center justify-center"
              >
                <Image
                  src={img}
                  alt={label}
                  width={50}
                  height={50}
                  quality={100}
                  className="factImg"
                />
                <h4 className="secondary-font text-center text-[#E6AF55]!">
                  {label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <Steps />

      {/* Cusines */}
      <Cuisines />

      {/* Facts */}
      <section className="w-full md:h-[400px] justify-center items-center my-20 flex relative">
        <div className="max-w-[100%] w-full h-[20vh] grid grid-cols-2 lg:grid-cols-4 gap-8  ">
          <Image
            src="/images/decorative.png"
            alt=""
            width={1440}
            height={403}
            quality={100}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:block hidden"
          />

          {[
            { value: "99%", text: "Record On-Time Delivery" },
            { value: "50,000+", text: "Meals Delivered" },
            { value: "1000+", text: "Subscribers" },
            { value: "250+", text: "Postal Locations" },
          ].map(({ value, text }, index) => (
            <div
              key={text}
              className="flex flex-col justify-center items-center gap-2 relative"
            >
              <h1 className="secondary-font">{value}</h1>
              <p>{text}</p>

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
