import CorporatePlan from "@/components/CorporatePlan";
import Cuisines from "@/components/Cusines";
import CusinesPlan from "@/components/CusinesPlan";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import Steps from "@/components/Steps";
import Testimonial from "@/components/Testimonial";
import { Separator } from "@/components/ui/separator";
import { features } from "@/lib/helper";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Feature Section */}
      <section
        className="w-full h-[300px] flex justify-center items-center md:my-24 featureBoxes"
        style={{
          backgroundImage: "url('/images/about-deco.png')",
          backgroundSize: "cover",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full flex flex-wrap items-center justify-center md:mx-10 mx-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5 w-full">
            {features.map(({ label, img }, index) => (
              <div
                key={label}
                className="p-9 h-[150px] flex flex-col gap-5 items-center justify-center"
                data-aos="fade-down"
                data-aos-delay={index * 100} // stagger animation: 0ms, 100ms, 200ms...
              >
                <Image
                  src={img}
                  alt={label}
                  width={60}
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
      {/* <div className="w-full absolute z-[-1] decoDiv">
        <img
          src="/images/about-deco.png"
          alt="Section Divider"
          className="w-full hidden md:block"
        />
      </div> */}
      {/* Cusines */}
      <div className="w-full h-full">
        <Cuisines />
      </div>

      {/* Facts */}
      <StatsSection />

      {/* Cusines Plan */}
      <CusinesPlan />

      {/* <Testimonial /> */}

      {/* Corporate Plan */}
      {/* <CorporatePlan /> */}
    </>
  );
}
