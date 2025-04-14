"use client";

import { usePaymentContext } from "@/app/context/PaymentContext";
import DetailForm from "@/components/DetailForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { paymentSession } = usePaymentContext();
  const router = useRouter();
  const {
    boxId,
    subscriptionType,
    startDate,
    endDate,
    amount,
    dietType,
    weekendType,
    shippingAmount,
    gst,
    mealTime,
  } = paymentSession || {};
  const formattedStartDate =
    startDate instanceof Date ? startDate.toDateString() : startDate;
  const formattedEndDate =
    endDate instanceof Date ? endDate.toDateString() : endDate;

  useEffect(() => {
    const user = localStorage.getItem("authenticatedUser");
    if (!user) {
      router.replace("/register");
    }
  }, [router]);
  return (
    <section className="w-full h-fit flex secondary-font justify-center items-center my-20 lg:mt-52 lg:mb-20">
      {/* <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100} // Increase quality (0-100)
        className="absolute top-0 z-[-1] w-full"
      /> */}
      <img
        src="/images/nav-bg.jpg"
        className="absolute w-full h-1/3 object-cover z-[-1] top-0"
        alt=""
      />
      <div className="max-w-[1290px] w-full h-full flex flexCol flex-col md:flex-row items-end justify-center md:mx-10 mx-5">
        <div className="flex detailWidth flex-1">
          <DetailForm />
        </div>
        <div className="w-full self-start mt-[5%] flex flex-1 px-4">
          <div className="w-[90%] detailWidth bg-[#197A8A99] text-white p-6 border border-dashed border-[#e6af55] shadow-lg">
            <h2 className="text-2xl! primary-font font-bold border-b border-teal-600 pb-2 mb-3 text-orange-300">
              Details for lunch
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-base primary-font">Meal Plan</span>
                <span className="capitalize font-base primary-font">
                  {boxId === 1 ? "Executive" : "Presidential"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Meal Time</span>
                <span className="capitalize font-base primary-font">
                  {mealTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Meal Type</span>
                <span className="capitalize font-base primary-font">
                  {dietType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Plan</span>
                <span className="font-base primary-font capitalize">
                  {subscriptionType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Start date</span>
                <span className="font-base primary-font">
                  {formattedStartDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">End date</span>
                <span className="font-base primary-font">
                  {formattedEndDate}
                </span>
              </div>
            </div>

            <h2 className="text-2xl! primary-font font-bold border-y border-teal-600 py-2 mt-4 mb-3 text-orange-300">
              Bill Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-base primary-font">Sub Total</span>
                <span className="font-base primary-font">
                  ₹{Math.round(amount || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base primary-font">Delivery Charges</span>
                <span className="font-base primary-font">
                  ₹{Math.round(shippingAmount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-base primary-font">GST</span>
                <span className="font-base primary-font">
                  ₹{(amount * gst || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-teal-600 mt-4 pt-2 text-lg font-semibold flex justify-between">
              <span className="font-base primary-font">Grand Total</span>
              <span className="font-base primary-font">
                ₹{Math.round(amount + shippingAmount + amount * gst)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
