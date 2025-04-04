"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePicker from "@/components/DatePicker";
import DetailForm from "@/components/DetailForm";
import { usePaymentContext } from "@/app/context/PaymentContext";
import AlertBox from "@/components/AlertBox";

const cuisineChoice = [
  {
    id: "M",
    label: "Maharshtra",
  },
  {
    id: "B",
    label: "Bengali",
  },
  {
    id: "S",
    label: "South India",
  },
  {
    id: "G",
    label: "Gujrati",
  },
  {
    id: "P",
    label: "Punjabi",
  },
];

const FormSchema = z.object({
  time: z.enum(["dinner", "lunch"], {
    required_error: "Please select time.",
  }),
  dietType: z.enum(["veg", "non-veg"], {
    required_error: "Please select food type.",
  }),
  cuisineChoice: z
    .array(z.string())
    .refine(
      (value) => value.length === 0 || (value.length >= 1 && value.length <= 5),
      {
        message: "You can select up to 5 cuisines.",
      }
    ),
  selectedDates: z.object(
    {
      startDate: z.date(),
      endDate: z.date(),
      count: z.number().min(1),
    },
    {
      required_error: "Please select valid dates.",
    }
  ),
  weekendType: z.string(),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      time: undefined,
      dietType: undefined,
      cuisineChoice: ["M", "B", "S", "G", "P"],
      selectedDates: { startDate: undefined, endDate: undefined, count: 0 },
      weekendType: "all",
    },
  });

  const { paymentSession, startPaymentSession } = usePaymentContext();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(7);
  const [weekendType, setWeekendRule] = useState("all");
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [detailFormat, setDetailFormat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const mealPrices = {
    lunch: 200,
    dinner: 220,
  };

  const foodTypePrices = {
    veg: 50,
    "non-veg": 100,
  };

  const deliveringPrices = 50;

  const subTotal = useMemo(() => {
    if (selectedTime && selectedFoodType && highlightedDates.length > 0) {
      const mealPrice = mealPrices[selectedTime] || 0;
      const foodExtra = foodTypePrices[selectedFoodType] || 0;
      const daysCount = highlightedDates.length;

      const baseTotal = mealPrice + foodExtra;
      setBasePrice(baseTotal);
      const newSubTotal = (mealPrice + foodExtra) * daysCount;
      setTotal(newSubTotal);
      const newTaxAmount = (newSubTotal + deliveringPrices) * 0.18;
      setTaxAmount(newTaxAmount.toFixed(2));
      return newSubTotal + newTaxAmount + deliveringPrices;
    }
    return 0;
  }, [selectedTime, selectedFoodType, highlightedDates]);

  useEffect(() => {
    if (selectedCuisines.length === 0) {
      setSelectedCuisines(cuisineChoice.map((c) => c.id));
    } else {
      form.setValue("cuisineChoice", selectedCuisines, {
        shouldValidate: true,
      });
    }
  }, [selectedCuisines, form]);

  useEffect(() => {
    if (highlightedDates.length > 0) {
      const startDate = highlightedDates[0];
      const endDate = highlightedDates[highlightedDates.length - 1];

      form.setValue(
        "selectedDates",
        {
          startDate,
          endDate,
          count: highlightedDates.length,
        },
        {
          shouldValidate: true,
        }
      );
    }
    form.setValue("weekendType", weekendType);
  }, [highlightedDates, weekendType, form]);

  function handleCuisineSelection(id) {
    let updatedCuisines;
    if (selectedCuisines.includes(id)) {
      updatedCuisines = selectedCuisines.filter((cuisine) => cuisine !== id);
    } else if (selectedCuisines.length < 5) {
      updatedCuisines = [...selectedCuisines, id];
    } else {
      return;
    }

    setSelectedCuisines(updatedCuisines);
  }

  async function onSubmit(data) {
    const daysCount = data.selectedDates?.count || 0;
    const planType = daysCount > 7 ? "monthly" : "weekly";
    const storedUser = localStorage.getItem("authenticatedUser");
    const userData = storedUser ? JSON.parse(storedUser) : null;

    const updatedData = {
      boxId: 2,
      customerId: userData?.id || null,
      status: userData?.status || "inactive",
      amount: subTotal,
      subscriptionType: planType,
      startDate: data.selectedDates?.startDate || null,
      endDate: data.selectedDates?.endDate || null,
    };

    const sessionData = {
      ...updatedData,
      daysCount,
      sessionActive: true,
      deliPrice: deliveringPrices,
      tax: taxAmount,
      deitType: selectedFoodType,
      mealTime: selectedDuration,
      basePrice: basePrice
    };

    startPaymentSession(sessionData);
    const token = userData?.token;

    try {
      const response = await fetch(
        "http://13.201.35.112:5000/api/v1/subscriptions/buy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        setIsSubmitting(true);
        setTimeout(() => {
          setDetailFormat((prev) => !prev);
          setIsSubmitting(false);
        }, 2000);
      } else {
        setError(`❌ Subscription failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("❌ An error occurred while submitting subscription.");
    }
  }

  return (
    <section className="w-full h-fit flex justify-center items-center my-52">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100} // Increase quality (0-100)
        className="absolute top-0 z-[-1] w-full"
      />

      <div className="max-w-[1440px] w-full h-full flex flex-col md:flex-row items-baseline justify-start md:mx-10 mx-5">
        {detailFormat ? (
          <div className="flex md:w-1/2 w-full flex-col">
            <Button
              variant="ghost"
              className="w-fit px-5 border-white border cursor-pointer ml-6"
              onClick={() => setDetailFormat((prev) => !prev)}
            >
              <p className="flex justify-center items-center gap-5">
                <Image
                  src="/images/right-arrow.png"
                  width={20}
                  height={20}
                  alt="Go Back"
                  className="invert rotate-180"
                />
                Go Back
              </p>
            </Button>
            <DetailForm />
          </div>
        ) : (
          <div className="md:w-1/2 w-full h-full p-6">
            <h2 className="text-2xl font-bold primary-font">
              Presidential Meal
            </h2>
            <Separator className="w-[600px] h-[2px] bg-[#D2D2D2]" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:w-2/3 w-full space-y-6 mt-10"
              >
                {/* Meal Time Selection */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">
                        SELECT MEAL TIME
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedTime(value);
                          }}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {/* Lunch Option */}
                          <FormItem className="flex-1 m-0 p-0 space-y-0">
                            <FormControl>
                              <div className="relative w-full">
                                <RadioGroupItem
                                  value="lunch"
                                  id="lunch"
                                  className="sr-only"
                                />
                                <FormLabel
                                  htmlFor="lunch"
                                  className={`flex justify-center items-center h-12 w-full rounded-md border-2 cursor-pointer transition-all
                                  ${
                                    selectedTime === "lunch"
                                      ? "bg-[#e6af55] text-white border-gray-100"
                                      : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                                  }`}
                                >
                                  <Image
                                    src="/images/lunch.png"
                                    alt="lunch"
                                    width={20}
                                    height={10}
                                    className=" w-auto h-auto"
                                  />
                                  Lunch
                                </FormLabel>
                              </div>
                            </FormControl>
                          </FormItem>

                          {/* Dinner Option */}
                          <FormItem className="flex-1 m-0 p-0 space-y-0">
                            <FormControl>
                              <div className="relative w-full">
                                <RadioGroupItem
                                  value="dinner"
                                  id="dinner"
                                  className="sr-only"
                                />
                                <FormLabel
                                  htmlFor="dinner"
                                  className={`flex justify-center items-center h-12 w-full rounded-md border-2 cursor-pointer transition-all
                                  ${
                                    selectedTime === "dinner"
                                      ? "bg-[#e6af55] text-white border-gray-100"
                                      : "border-gray-200 hover:bg-gray-500 hover:text-white hover:border-gray-900"
                                  }`}
                                >
                                  <Image
                                    src="/images/dinner.png"
                                    alt="lunch"
                                    width={20}
                                    height={10}
                                    className=" w-auto h-auto"
                                  />
                                  Dinner
                                </FormLabel>
                              </div>
                            </FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-500!" />
                    </FormItem>
                  )}
                />

                {/* Meal Type Selection */}
                <FormField
                  control={form.control}
                  name="dietType"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">
                        SELECT MEAL TYPE
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedFoodType(value);
                          }}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {/* Veg Option */}
                          <FormItem className="flex-1 m-0 p-0 space-y-0">
                            <FormControl>
                              <div className="relative w-full">
                                <RadioGroupItem
                                  value="veg"
                                  id="veg"
                                  className="sr-only"
                                />
                                <FormLabel
                                  htmlFor="veg"
                                  className={`flex justify-center items-center gap-5 h-12 w-full rounded-md border-2 cursor-pointer transition-all
                                ${
                                  selectedFoodType === "veg"
                                    ? "bg-[#e6af55] text-white border-gray-100"
                                    : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                                }`}
                                >
                                  <Image
                                    src="/images/veg.png"
                                    alt="veg"
                                    width={25}
                                    height={10}
                                    className=" w-auto h-auto"
                                  />
                                  Veg
                                </FormLabel>
                              </div>
                            </FormControl>
                          </FormItem>

                          {/* Non-Veg Option */}
                          <FormItem className="flex-1 m-0 p-0 space-y-0">
                            <FormControl>
                              <div className="relative w-full">
                                <RadioGroupItem
                                  value="non-veg"
                                  id="non-veg"
                                  className="sr-only"
                                />
                                <FormLabel
                                  htmlFor="non-veg"
                                  className={`flex justify-center items-center h-12 w-full rounded-md border-2 cursor-pointer transition-all
                                ${
                                  selectedFoodType === "non-veg"
                                    ? "bg-[#e6af55] text-white border-gray-100"
                                    : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                                }`}
                                >
                                  <Image
                                    src="/images/non-veg.png"
                                    alt="Non veg"
                                    width={25}
                                    height={10}
                                    className=" w-auto h-auto"
                                  />
                                  Non Veg
                                </FormLabel>
                              </div>
                            </FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-500!" />
                    </FormItem>
                  )}
                />

                {/* Cuisine Selection - with empty default state */}
                <FormField
                  control={form.control}
                  name="cuisineChoice"
                  render={() => (
                    <FormItem>
                      <div className="">
                        <FormLabel className="text-base font-medium flex justify-between items-center">
                          SELECT CUISINE
                          <p>Remove any cuisine you don't want</p>
                        </FormLabel>
                      </div>
                      <div className="flex flex-wrap gap-3  w-full md:w-[600px]">
                        {cuisineChoice.map(({ id, label }) => (
                          <FormItem key={id} className="w-44">
                            <FormControl>
                              <div className="relative w-full">
                                <Checkbox
                                  id={id}
                                  checked={selectedCuisines.includes(id)}
                                  onCheckedChange={() =>
                                    handleCuisineSelection(id)
                                  }
                                  className="sr-only peer"
                                />
                                <FormLabel
                                  htmlFor={id}
                                  className={`flex justify-center items-center h-12 w-full text-center px-10 rounded-md border-2 cursor-pointer transition-all ${
                                    selectedCuisines.includes(id)
                                      ? "bg-[#e6af55] text-white border-gray-100"
                                      : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                                  }`}
                                >
                                  {label}
                                </FormLabel>
                              </div>
                            </FormControl>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage className="text-red-500!" />
                    </FormItem>
                  )}
                />

                {/* Date Selection */}
                <FormField
                  control={form.control}
                  name="selectedDates"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">
                        SELECT YOUR MEAL DATES
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          onDateChange={(dates) => {
                            if (Array.isArray(dates) && dates.length > 0) {
                              setHighlightedDates(dates);
                              const startDate = dates[0];
                              const endDate = dates[dates.length - 1];

                              form.setValue(
                                "selectedDates",
                                {
                                  startDate,
                                  endDate,
                                  count: dates.length,
                                },
                                {
                                  shouldValidate: true,
                                }
                              );
                            }
                          }}
                          onWeekendRuleChange={(rule) => {
                            setWeekendRule(rule);
                            form.setValue("weekendType", rule);
                          }}
                          onSelectedDaysChange={(days) => {
                            setSelectedDuration(days);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500!" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-[#e6af55] w-full hover:bg-[#d49c3e] text-[#03141C] text-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Next"}
                  {!isSubmitting && (
                    <Image
                      src="/images/right-arrow.png"
                      alt="right-arrow"
                      width={20}
                      height={15}
                    />
                  )}
                </Button>
              </form>
            </Form>
          </div>
        )}

        <div className="lg:w-1/2 w-full lg:sticky top-20 self-start px-4">
          <div className="w-full bg-[#197A8A99] text-white p-6 border border-dashed border-teal-600 shadow-lg">
            <h2 className="text-2xl! primary-font font-bold border-b border-teal-600 pb-2 mb-3 text-orange-300">
              Details for lunch
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-base secondary-font">Meal Plan</span>
                <span className="capitalize font-base secondary-font">
                  Presidentail
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Meal Time</span>
                <span className="capitalize font-base secondary-font">
                  {selectedTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Meal Type</span>
                <span className="capitalize font-base secondary-font">
                  {selectedFoodType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Duration</span>
                <span className="font-base secondary-font">
                  {selectedDuration === 7
                    ? "1 Week"
                    : selectedDuration
                    ? "1 Month"
                    : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Start date</span>
                <span className="font-base secondary-font">
                  {highlightedDates.length > 0
                    ? highlightedDates[0].toDateString()
                    : "-----"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">End date</span>
                <span className="font-base secondary-font">
                  {highlightedDates.length > 0
                    ? highlightedDates[
                        highlightedDates.length - 1
                      ].toDateString()
                    : "-----"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Days</span>
                <span className="font-base secondary-font">
                  {highlightedDates.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Price</span>
                <span className="font-base secondary-font">
                  ₹{basePrice} / Meal Plan
                </span>
              </div>
            </div>

            <h2 className="text-2xl! primary-font font-bold border-b border-teal-600 pb-2 mt-4 mb-3 text-orange-300">
              Bill Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-base secondary-font">Sub Total</span>
                <span className="font-base secondary-font">₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">
                  Delivery Charges
                </span>
                <span className="font-base secondary-font">
                  ₹{deliveringPrices}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Tax</span>
                <span className="font-base secondary-font">₹{taxAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">
                  Discount Amount
                </span>
                <span className="font-base secondary-font">₹0.00</span>
              </div>
            </div>

            <div className="border-t border-teal-600 mt-4 pt-2 text-lg font-semibold flex justify-between">
              <span className="font-base secondary-font">Grand Total</span>
              <span className="font-base secondary-font">₹{subTotal}</span>
            </div>
          </div>
        </div>
      </div>
      <AlertBox
        open={open}
        setOpen={setOpen}
        title="Error"
        description={error}
      />
    </section>
  );
};

export default Page;
