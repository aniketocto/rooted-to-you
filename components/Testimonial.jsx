"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Testimonial() {
  return (
    <div className="relative md:px-4 md:py-12 p-4">
      <img
        src="/images/decorative.png"
        className="absolute top-0 -z-1 h-[500px] md:w-full object-cover"
        alt=""
      />
      <h2 className="secondary-font text-center mb-10" data-aos="fade-down">
        Testimonials
      </h2>
      <Swiper
        slidesPerView={2.3}
        centeredSlides={true}
        spaceBetween={30}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        speed={1000}
        className="mySwiper"
        breakpoints={{
          1024: { slidesPerView: 1.6 },
          768: { slidesPerView: 1.3 },
          0: { slidesPerView: 1 },
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full md:w-/3 px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                Lunchtime used to feel like a chore what to cook, what to eat.
                Now with Rooted, it’s something I actually look forward to. I
                love guessing where the meal is from each day, and it’s sparked
                some lovely conversations at the table.
                <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font font-semibold mb-1">
                Aparna Padgaonkar
              </h4>
              <p className="text-gray-400 primary-font text-sm">
                Writer & Author
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full  px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                I’ve always loved Indian food but never realized just how
                diverse it really is. Rooted has been an eye-opener. One day
                it’s a Maharashtrian pithla-bhakri, the next it’s a Bengali
                shukto… I’m hooked. <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font  font-semibold mb-1">
                Deepika Hirwey
              </h4>
              <p className="text-gray-400 primary-font  text-sm">
                Unstoppable CEO
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full  px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                Rooted’s variety of regional cuisines is simply amazing each and
                every dish was authentic and flavorful. It’s evident they use
                quality ingredients and traditional recipes. Perfect for anyone
                who wants to enjoy homely Indian meals without cooking!
                <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font  font-semibold mb-1">
                Nihal Vaidya
              </h4>
              <p className="text-gray-400 primary-font  text-sm">
                Film Producer
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4*/}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full  px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                I struggled with finding food that wasn’t oily, repetitive, or
                expensive. Rooted gives me a perfect balance clean, regional
                meals that keep changing and keep me healthy. It’s convenient,
                affordable, and genuinely tasty.
                <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font  font-semibold mb-1">
                Archana Soparkar
              </h4>
              <p className="text-gray-400 primary-font  text-sm">
                Zumba and Fitness Trainer
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full  px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                I used to dread lunch either it was the same restaurant food or
                boring dabba meals. Rooted has completely transformed my
                afternoons. Every day feels like I’ve ordered from a new region
                of India. The best part? I don’t have to think or plan anything.
                Just heat, eat, and smile.
                <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font  font-semibold mb-1">
                Sandipan Bhattacharya
              </h4>
              <p className="text-gray-400 primary-font  text-sm">
                Creative Manager
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 6 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full  px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                Rooted’s meal subscription is a total game changer for busy
                office days. No more scrambling to plan or order just clean,
                great-quality food that shows up like clockwork. It keeps things
                simple, hygienic, and satisfying.
                <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font  font-semibold mb-1">
                Tushar Motwani
              </h4>
              <p className="text-gray-400 primary-font  text-sm">
                Director - Creative Agency
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 7 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full  px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                I’m genuinely impressed with the Rooted meal subscription! Every
                lunch I receive is not only healthy and delicious but also
                served hot, which makes a huge difference. The variety of dishes
                they offer keeps me excited and looking forward to each meal
                there’s always something new and tasty to try.
                <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font  font-semibold mb-1">
                Milind Labhe.
              </h4>
              <p className="text-gray-400 primary-font  text-sm">
                CTO and Co-founder
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 8 */}
        <SwiperSlide>
          <div className="flex items-center w-full flex-col md:flex-row min-h-[250px] overflow-hidden md:px-10 px-2 py-2 borderImage">
            <div className="w-full  px-6 py-4 text-white">
              <p className="font-base-1 primary-font mb-4 leading-relaxed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 310 310"
                  className="inline-block -mt-5"
                >
                  <path
                    d="M123.15 201.35C46.46 144.43 68.53 98.48 113.39 46.9c7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.24-77.39 90.03-70.64 154.3 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.06 135.08-4.16 78.4-56.36zm145.45 0c-76.69-56.92-54.62-102.87-9.76-154.45 7.44-8.56 1.42-21.89-9.93-21.89-3.19 0-6.27 1.16-8.68 3.25-32.67 28.25-77.39 90.03-70.64 154.31 2.46 26.66 4.99 43.91 20.61 75.15 43.22 67.05 135.08-4.17 78.4-56.37z"
                    fill="#FFF"
                  ></path>
                </svg>
                Rooted to You meal subscription service really hit the spot. The
                packaging was clean and convenient—perfect for a busy workday.
                The portion size was just right for a satisfying yet light
                lunch. If you're looking for a reliable and delicious office
                delivery option, Rooted is a great choice. Give them a try and
                enjoy a flavorful, stress-free lunch!
                <br />
              </p>
              <h4 className="text-[#e6af55] secondary-font  font-semibold mb-1">
                Javed Akhtar
              </h4>
              <p className="text-gray-400 primary-font  text-sm">
                CEO -Travel & Leisure
              </p>
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
          <hr className="w-10 h-0.5 bg-white"/>
          <button className="swiper-button-next secondary-font text-white!">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
