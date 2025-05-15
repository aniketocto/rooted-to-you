"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const formSchema = z.object({
  zipCode: z
    .string()
    .length(6, { message: "Zip Code must be exactly 6 digits." })
    .regex(/^\d{6}$/, { message: "Only numbers are allowed." }),
});

const Hero = () => {
  const [deliverState, setDeliverState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
    },
  });

  useEffect(() => {
    localStorage.removeItem("mealFormData");
  }, []);

  const onSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
    setDeliverState(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/pincodes/check-availability?pincode=${values.zipCode}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setErrorMessage("✅ Delivery is available in your area!");
        setDeliverState(true);
      } else {
        setErrorMessage("❌ Sorry, we don't deliver to this area yet.");
        setDeliverState(false);
      }
    } catch (error) {
      console.error(error);
      setDeliverState(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-dvh  flex justify-center items-center ">
      <Swiper
        className="mySwiper w-full h-full"
        modules={[Autoplay]}
        loop={true}
        speed={1000}
        allowTouchMove={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
      >
        <SwiperSlide>
          <div className=" w-full h-full hero-bg-1 flex flex-col items-start justify-end md:justify-center px-0 sm:px-10">
            <div className="flex flex-col item-center md:items-start justify-center w-full md:w-[58%] gap-5 mt-[10%] px-8">
              <h1 className="secondary-font text-[#197a8a]! font-bold text-center md:text-left md:block  hidden">
                Eat. <br /> Connect. <br />
                Celebrate.
              </h1>

              <p className="primary-font hero-font  mb-5 md:block text-[#03141C]! hidden">
                With Rooted, indulge in the authenticity of Indian flavours and
                cuisines, connect with vibrant regional cultures, and celebrate
                the joy of discovery and sharing wholesome meals.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="gap-5 flex  w-full md:w-96"
                >
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Pin Code"
                            {...field}
                            maxLength={6}
                            pattern="[0-9]{6}"
                            inputMode="numeric"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                            }}
                            className="md:w-[350px] w-full border border-gray-400 rounded-md text-[#03141C]! bg-transparent px-3 py-2"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500!" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#e6af55] text-center cursor-pointer font-bold rounded-sm px-5 disabled:opacity-50"
                  >
                    <p className="secondary-font subbtnFont  text-[#03141C]!">
                      {isLoading ? "Checking..." : "Check Pincode"}
                    </p>
                  </Button>
                </form>
                <div className="h-5" aria-live="polite">
                  {errorMessage && (
                    <p
                      className={`text-sm font-medium ${
                        deliverState ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" w-full h-full hero-bg-2 flex flex-col items-start justify-end md:justify-center px-0 sm:px-10">
            <div className="flex flex-col item-center md:items-start justify-center w-full md:w-[60%] gap-5 mt-[10%] px-8">
              <h1 className="secondary-font text-[#E6AF55] font-bold text-center md:text-left md:block  hidden">
                New Day, <br /> New Cuisine, <br /> New Meal.
              </h1>

              <p className="primary-font hero-font  mb-5 md:block  hidden">
                Say goodbye to unhealthy takeouts and meal-prep stress. Rooted
                to You brings expertly curated, fresh, and nutritious meals
                straight to your doorstep. Whether at home or the office, enjoy
                restaurant-quality food at everyday prices.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="gap-5 flex  w-full md:w-96"
                >
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Pin Code"
                            {...field}
                            maxLength={6}
                            pattern="[0-9]{6}"
                            inputMode="numeric"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                            }}
                            className="md:w-[350px] w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500!" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#e6af55] text-center cursor-pointer font-bold rounded-sm px-5 disabled:opacity-50"
                  >
                    <p className="secondary-font subbtnFont  text-[#03141C]!">
                      {isLoading ? "Checking..." : "Check Pincode"}
                    </p>
                  </Button>
                </form>
                <div className="h-5" aria-live="polite">
                  {errorMessage && (
                    <p
                      className={`text-sm font-medium ${
                        deliverState ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
