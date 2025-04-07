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
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const cuisineChoice = [
  {
    id: "1",
    itemCode: "M",
    label: "Maharshtra",
  },
  {
    id: "2",
    itemCode: "B",
    label: "Bengali",
  },
  {
    id: "3",
    itemCode: "S",
    label: "South Indian",
  },
  {
    id: "4",
    itemCode: "G",
    label: "Gujrati",
  },
  {
    id: "5",
    itemCode: "P",
    label: "Punjabi",
  },
];

const FormSchema = z.object({
  time: z.enum(["dinner", "lunch"], {
    required_error: "Please select time.",
  }),
  dietType: z.enum(["veg", "non_veg"], {
    required_error: "Please select food type.",
  }),
  cuisineChoice: z.array(z.number()).optional(),
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
  selectedDatesArray: z.array(z.date()).optional(),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      time: undefined,
      dietType: undefined,
      selectedDates: { startDate: undefined, endDate: undefined, count: 0 },
      weekendType: "all",
    },
  });
  const router = useRouter();
  const { startPaymentSession } = usePaymentContext();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
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
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState([]);
  const deliveringPrices = 1500;
  const gstTax = 0.06;
  const selectedBoxId = 1;

  useEffect(() => {
    const user = localStorage.getItem("authenticatedUser");
    if (!user) {
      router.replace("/register");
    }
  }, [router]);

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/boxes/list`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch boxes");
        }

        const data = await response.json();
        setBoxes(data.mealBoxes);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  useEffect(() => {
    if (highlightedDates.length > 0) {
      setTimeout(() => {
        const startDate = highlightedDates[0];
        const endDate = highlightedDates[highlightedDates.length - 1];

        form.setValue(
          "selectedDates",
          { startDate, endDate, count: highlightedDates.length },
          { shouldValidate: true }
        );
      }, 0);
    }

    form.setValue("weekendType", weekendType);
  }, [highlightedDates, weekendType, form]);

  useEffect(() => {
    if (!boxes.length) return;

    const selectedBox = boxes.find((box) => box.id === selectedBoxId);
    if (!selectedBox) return;

    let mealbasePrice;

    if (selectedDuration === 7) {
      mealbasePrice = selectedBox.weekPrice;
    } else if (selectedDuration > 7) {
      mealbasePrice = selectedBox.monthPrice;
    } else {
      return;
    }

    const beforeTax = mealbasePrice + deliveringPrices;
    const tax = mealbasePrice * gstTax;
    const finalSubTotal = beforeTax + tax;

    setBasePrice(Math.round(mealbasePrice));
    setTaxAmount(tax.toFixed(2));
    setTotal(Math.round(finalSubTotal));
  }, [selectedDuration, boxes]);

  async function onSubmit(data) {
    const daysCount = data.selectedDates?.count || 0;
    const planType = daysCount > 7 ? "monthly" : "weekly";
    const storedUser = localStorage.getItem("authenticatedUser");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const formattedDateArray =
      data.selectedDatesArray?.map((date) =>
        format(new Date(date), "yyyy-MM-dd")
      ) || [];
    const formattedStartDate = data.selectedDates?.startDate
      ? format(new Date(data.selectedDates.startDate), "yyyy-MM-dd")
      : null;

    const formattedEndDate = data.selectedDates?.endDate
      ? format(new Date(data.selectedDates.endDate), "yyyy-MM-dd")
      : null;

    const token = userData?.token;
    const customerId = userData?.id;

    const cuisineIds = cuisineChoice.map((c) => c.id);
    const itemCodes = cuisineChoice.map((c) => c.itemCode).join(", ");
    const itemNames = cuisineChoice.map((c) => c.label).join(", ");

    const updatedData = {
      boxId: 1,
      customerId: customerId || null,
      status: userData?.status || "inactive",
      subscriptionType: planType,
      startDate: data.selectedDates?.startDate || null,
      endDate: data.selectedDates?.endDate || null,
      amount: basePrice,
      cuisineChoice: cuisineIds,
      itemCode: itemCodes,
      itemNames: itemNames,
      dietType: selectedFoodType,
      weekendType: weekendType,
    };

    const sessionData = {
      ...updatedData,
      daysCount,
      sessionActive: true,
      shippingAmount: deliveringPrices,
      gst: gstTax,
      mealTime: selectedTime,
      selectedDatesArray: formattedDateArray,
    };

    try {
      const activeRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/subscriptions/active/${userData?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            startDate: data.selectedDates?.startDate,
          }),
        }
      );

      const activeData = await activeRes.json();
      // console.log(activeData)
      console.log(activeData);
      if (activeData.success && activeData.status === "active") {
        const existingEndDate = new Date(activeData.subscription.endDate);
        const selectedStartDate = new Date(data.selectedDates?.startDate);

        if (selectedStartDate <= existingEndDate) {
          const formattedEndDate = existingEndDate.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          setError(
            `❌ You already have an active subscription that ends on ${formattedEndDate}. Please select a start date after this.`
          );
          setOpen(true);
          return;
        }
      }

      // ✅ Start payment session
      startPaymentSession(sessionData);

      setIsSubmitting(true);
      setTimeout(() => {
        router.push("/details");
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("API Error:", error);
      setError("❌ An error occurred while checking subscription.");
      setOpen(true);
    }
  }

  return (
    <section className="w-full h-fit flex secondary-font justify-center items-center my-52">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100} // Increase quality (0-100)
        className="absolute top-0 z-[-1] w-full"
      />
      <div className="max-w-[1440px] w-full h-full flex flex-col md:flex-row items-center justify-center md:mx-10 mx-5">
        <div className="md:w-1/2 w-full h-full p-6">
          <h2 className="text-2xl font-bold primary-font">Exectuive Meal</h2>
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
                                className={`flex justify-center  items-center text-xl h-15 w-full rounded-md border-2 cursor-pointer transition-all
                                  ${
                                    selectedTime === "lunch"
                                      ? "bg-[#e6af55] text-white  border-gray-100"
                                      : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                                  }`}
                              >
                                <Image
                                  src="/images/lunch.svg"
                                  alt="lunch"
                                  width={5}
                                  height={5}
                                  className="w-8"
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
                                className={`flex justify-center  items-center text-xl h-15 w-full rounded-md border-2 cursor-pointer transition-all
                                  ${
                                    selectedTime === "dinner"
                                      ? "bg-[#e6af55] text-white border-gray-100"
                                      : "border-gray-200 hover:bg-gray-500 hover:text-white hover:border-gray-900"
                                  }`}
                              >
                                <Image
                                  src="/images/dinner.svg"
                                  alt="lunch"
                                  width={20}
                                  height={10}
                                  className="w-8"
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
                                className={`flex justify-center items-center gap-3 text-xl h-15 w-full rounded-md border-2 cursor-pointer transition-all
                                ${
                                  selectedFoodType === "veg"
                                    ? "bg-[#e6af55] text-white border-gray-100"
                                    : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                                }`}
                              >
                                <Image
                                  src="/images/veg.svg"
                                  alt="veg"
                                  width={6}
                                  height={6}
                                  className="w-8"
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
                                value="non_veg"
                                id="non_veg"
                                className="sr-only"
                              />
                              <FormLabel
                                htmlFor="non_veg"
                                className={`flex justify-center  items-center  gap-3 text-xl h-15 w-full rounded-md border-2 cursor-pointer transition-all
                                ${
                                  selectedFoodType === "non_veg"
                                    ? "bg-[#e6af55] text-white border-gray-100"
                                    : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                                }`}
                              >
                                <Image
                                  src="/images/nveg.svg"
                                  alt="Non veg"
                                  width={25}
                                  height={10}
                                  className="w-6"
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
                            form.setValue("selectedDatesArray", dates);
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-[#e6af55] w-full hover:bg-[#d49c3e] text-xl text-[#03141C] text-center"
                disabled={isSubmitting}
              >
                <p className="text-xl text-[#03141C]!  secondary-font">{isSubmitting ? "Processing..." : "Next"}</p>
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

        <div className="lg:w-[40%] w-full lg:sticky top-[10%] self-start px-4 mt-[5%]">
          <div className="w-full bg-[#197A8A99] text-white p-6 border border-dashed border-[#e6af55] shadow-lg">
            <h2 className="text-2xl! primary-font font-bold border-b border-white pb-2 mb-3 text-orange-300">
              Details for lunch
            </h2>
            <div className="space-y-2 text-md">
              <div className="flex justify-between">
                <span className="font-base primary-font">Meal Plan</span>
                <span className="capitalize font-base primary-font">
                  Executive
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Meal Time</span>
                <span className="capitalize font-base primary-font">
                  {selectedTime || "-----"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Meal Type</span>
                <span className="capitalize font-base primary-font">
                  {selectedFoodType || "-----"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Duration</span>
                <span className="font-base primary-font">
                  {selectedDuration === 7
                    ? "1 Week"
                    : selectedDuration
                    ? "1 Month"
                    : "-----"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Start date</span>
                <span className="font-base primary-font">
                  {highlightedDates.length > 0
                    ? highlightedDates[0].toDateString()
                    : "-----"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">End date</span>
                <span className="font-base primary-font">
                  {highlightedDates.length > 0
                    ? highlightedDates[
                        highlightedDates.length - 1
                      ].toDateString()
                    : "-----"}
                </span>
              </div>
            </div>

            <h2 className="text-2xl! primary-font font-bold  border-y border-white py-2 mt-4 mb-3 text-orange-300">
              Bill Summary
            </h2>
            <div className="space-y-2 text-md">
              <div className="flex justify-between">
                <span className="font-base primary-font">Sub Total</span>
                <span className="font-base primary-font">₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">
                  Delivery Charges
                </span>
                <span className="font-base primary-font">
                  ₹{deliveringPrices}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Tax</span>
                <span className="font-base primary-font">₹{taxAmount}</span>
              </div>
            </div>

            <div className="border-t border-white mt-4 pt-2 text-lg font-semibold flex justify-between">
              <span className="font-base primary-font">Grand Total</span>
              <span className="font-base primary-font">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      <AlertBox open={open} setOpen={setOpen} description={error} />
    </section>
  );
};

export default Page;
