import Cuisines from "@/components/Cusines";
import CusinesPlan from "@/components/CusinesPlan";
import FeatureSlider from "@/components/FeatureSlider";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import Steps from "@/components/Steps";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Feature Section */}
      <FeatureSlider />

      {/* Steps */}
      <Steps />

      {/* Cusines */}
      <Cuisines />

      {/* Facts */}
      <StatsSection />

      {/* Cuisines Plan */}
      <CusinesPlan />

      <Testimonial />
      
      {/* Corporate Plan */}
    </>
  );
}
