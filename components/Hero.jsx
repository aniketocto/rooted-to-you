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

  const onSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
    setDeliverState(false);

    try {
      const response = await fetch(
        `http://13.201.35.112:5000/api/v1/pincodes/check-availability?pincode=${values.zipCode}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setErrorMessage(data.error || "Unavailable for delivery");
      } else {
        if (data && data.isAvailable) {
          console.log("checked and available");
          setErrorMessage("Available for delivery in this area.");
          setDeliverState(true);
        } else {
          console.log("checked and unavailable");
          setDeliverState(false);
          setErrorMessage("Available for delivery in this area.");
        }
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="hero-bg  w-full h-dvh flex flex-col items-start justify-center px-0 sm:px-10">
        <div className="flex flex-col items-start justify-center w-full md:w-1/2 gap-5 mt-[10%] px-5">
          <h1 className="primary-font text-[#E6AF55] font-bold">
            Eat. Connect. Celebrate.
          </h1>
          <p className="primary-font font-base mb-5">
            Say goodbye to unhealthy takeouts and meal-prep stress. Rooted to
            You brings expertly curated, fresh, and nutritious meals straight to
            your doorstep. Whether at home or the office, enjoy
            restaurant-quality food at everyday prices.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-5 flex flex-col md:flex-row w-44 md:w-96"
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
                          e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                        className="md:w-[350px] w-[200px] border border-gray-400 rounded-md bg-transparent px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#e6af55] text-center cursor-pointer font-bold rounded-sm px-5"
              >
                <p className="primary-font subbtnFont uppercase text-[#03141C]!">
                  Get Started
                </p>
              </Button>
            </form>
            <div className="h-5">
              {errorMessage && (
                <p className="text-red-500 font-base">{errorMessage}</p>
              )}
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
