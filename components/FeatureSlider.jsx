"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { features } from "@/lib/helper";

const FeatureSlider = () => {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, 
    speed: 4000, 
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false, 
    draggable: false, 
    swipe: false, 
    touchMove: false, 
    responsive: [
      {
        breakpoint: 1280, // screens < 1280px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // screens < 768px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640, // screens < 640px
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="w-full mt-10">
      <Slider {...settings}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex! flex-1/2 flex-col items-center justify-center p-4"
          >
            <img
              src={feature.img}
              alt={feature.label}
              className="w-20 h-20 md:w-24 md:h-24 mb-2 object-contain"
            />
            <p className="text-center text-sm md:text-base primary-font px-5">
              {feature.label}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeatureSlider;
