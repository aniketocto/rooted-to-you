"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Testimonial() {
  return (
    <div className="relative px-4 py-12">
      <Swiper
        slidesPerView={1.3}
        centeredSlides={true}
        spaceBetween={30}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="mySwiper"
        breakpoints={{
          1024: { slidesPerView: 1.6 },
          768: { slidesPerView: 1.3 },
          0: { slidesPerView: 1 },
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[300px] overflow-hidden px-10 py-2 borderImage">
            <div className="w-1/3 h-full">
              <img
                src="/images/testimonial1.jpg"
                alt="Henry Paddington"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="w-2/3 px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <span className="text-2xl!">"</span>Our team consists of highly
                qualified specialists with international experience in the field
                of Web development, mobile development, Product management and
                design. <br />

              </p>
              <h4 className="text-yellow-300 font-semibold mb-1">
                Henry Paddington
              </h4>
              <p className="text-gray-400 text-sm">TextLab CEO</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom navigation buttons (no arrow icons used) */}
      <div className="flex justify-center gap-6 mt-8 ">
        <div className="w-52 flex justify-around items-center gap-5">
          <button className="swiper-button-prev secondary-font text-white!">
            Prev
          </button>
          <button className="swiper-button-next secondary-font text-white!">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
