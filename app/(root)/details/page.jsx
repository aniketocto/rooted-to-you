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

  // console.log("Payment session details:", startDate, endDate);
  // console.log("Payment session details:", paymentSession);

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
  useEffect(() => {
    if (!paymentSession?.sessionActive) {
      console.warn("🔒 Payment session not active, redirecting...");
      router.replace("/");
    }
  }, [paymentSession]);

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
        className="absolute w-full h-[300px] object-cover z-[-1] top-0"
        alt=""
      />
      <div className="max-w-[1290px] w-full h-full flex flexCol flex-col md:flex-row items-end justify-center md:mx-10 mx-5">
        <div className="flex detailWidth flex-1">
          <DetailForm />
        </div>
        <div className="w-full self-start mt-[5%] flex flex-1 px-4">
          <div className="w-[90%] detailWidth bg-[#197A8A99] text-white p-6 border border-dashed border-[#e6af55] shadow-lg">
            <h2 className="text-2xl! secondary-font font-bold border-b border-teal-600 pb-2 mb-3 text-orange-300">
              Details for meal
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-base secondary-font">Meal Plan</span>
                <span className="capitalize font-base secondary-font">
                  {boxId === 1 ? "Executive" : "Presidential"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Meal Time</span>
                <span className="capitalize font-base secondary-font">
                  {mealTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Meal Type</span>
                <span className="capitalize font-base secondary-font">
                  {dietType === "non_veg" ? "Non-Veg" : "Veg"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Plan</span>
                <span className="font-base secondary-font capitalize">
                  {subscriptionType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">Start date</span>
                <span className="font-base secondary-font">
                  {formattedStartDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">End date</span>
                <span className="font-base secondary-font">
                  {formattedEndDate}
                </span>
              </div>
            </div>

            <h2 className="text-2xl! secondary-font font-bold border-y border-teal-600 py-2 mt-4 mb-3 text-orange-300">
              Bill Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-base secondary-font">Sub Total</span>
                <span className="font-base secondary-font">
                  ₹{Math.round(amount || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font">
                  Delivery Charges
                </span>
                <span className="font-base secondary-font">
                  ₹{Math.round(shippingAmount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-base secondary-font">GST</span>
                <span className="font-base secondary-font">
                  ₹{Math.round(amount * gst || 0)}
                </span>
              </div>
            </div>

            <div className="border-t border-teal-600 mt-4 pt-2 text-lg font-semibold flex justify-between">
              <span className="font-base secondary-font">Grand Total</span>
              <span className="font-base secondary-font">
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
