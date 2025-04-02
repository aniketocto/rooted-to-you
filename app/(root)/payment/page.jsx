"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Script from "next/script";
import { usePaymentContext } from "@/app/context/PaymentContext";

const Page = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { totalAmount } = usePaymentContext();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("rootedUserDetails");
    const storedMealData = sessionStorage.getItem("rootedUserMealData");

    if (storedMealData) {
      console.log("Retrieved Meal Data:", storedMealData);
      try {
        setMealData(JSON.parse(storedMealData));
      } catch (error) {
        console.error("Error parsing stored meal data:", error);
      }
    }

    if (storedUserDetails) {
      try {
        setUserDetails(JSON.parse(storedUserDetails));
      } catch (error) {
        console.error("Error parsing stored user details:", error);
      }
    }
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Send totalAmount to the backend API
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const data = await response.json();

      const option = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "Rooted to You",
        description: "Meal Order",
        order_id: data.orderId,
        handler: function (response) {
          alert("Payment successful" + response);
        },
        prefill: {
          name: userDetails?.firstName + " " + userDetails?.lastName,
          email: userDetails?.email,
          contact: userDetails?.phone,
        },
        theme: {
          color: "#197a8a",
        },
      };

      const rzpy1 = new window.Razorpay(option);
      rzpy1.open();
      rzpy1.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description}`);
        console.error("Payment failed:", response.error);
      });
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="w-full h-fit flex flex-col justify-center items-center my-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-[1440px] w-full h-full flex flex-col items-center justify-center md:mx-10 mx-5">
        <div className="w-full my-10 px-5">
          <h2 className="text-2xl font-bold primary-font text-left w-full">
            Order Summary
          </h2>
          <Separator className="w-full h-[3px] bg-[#197A8A99]" />
        </div>

        <div className="max-w-[1440px] w-[90%] flex flex-col md:flex-row items-start md:gap-10 md:mx-10 mx-5">
          {/* Personal Details */}
          <div className="md:w-1/2 w-full p-6">
            <h2 className="text-2xl! font-bold primary-font">
              Personal Details
            </h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />
            <div className="space-y-2 text-sm my-8">
              <div className="flex justify-between">
                <span>Full Name</span>{" "}
                <span>
                  {userDetails?.firstName} {userDetails?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Mobile No.</span> <span>{userDetails?.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Email Address</span> <span>{userDetails?.email}</span>
              </div>
            </div>
            <h2 className="text-2xl! font-bold primary-font">
              Address Details
            </h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />
            <div className="space-y-2 text-sm my-8">
              <div className="flex justify-start gap-5">
                <span>Address:</span> <span>{userDetails?.address}</span>
              </div>
              <div className="flex justify-between">
                <span>City</span> <span>{userDetails?.city}</span>
              </div>
            </div>
            <h2 className="text-2xl! font-bold primary-font">Payment Option</h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />
            <div className="space-y-2 text-sm my-8">
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="bg-[#e6af55] w-full hover:bg-[#d49c3e] text-[#03141C] text-center cursor-pointer"
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </div>

          {/* Meal Details */}
          <div className="md:w-1/2 w-full bg-[#197A8A99] text-white p-6 border border-dashed border-teal-600 shadow-lg">
            <h2 className="text-2xl! font-bold primary-font text-orange-300 border-b border-teal-600 pb-2 mb-3">
              Details for Lunch
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Meal Time</span>{" "}
                <span className="capitalize">
                  {mealData?.boxtype === "e" ? "Executive" : "Presidential"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Meal Time</span>{" "}
                <span className="capitalize">{mealData?.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Meal Type</span>{" "}
                <span className="capitalize">{mealData?.foodType}</span>
              </div>
              <div className="flex justify-between">
                <span>Plan</span>{" "}
                <span>
                  {mealData?.selectedDates.count > 7 ? "Monthly" : "Weekly"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Start Date</span>{" "}
                <span>
                  {
                    // Format the date as "4 April, 2025"
                    new Date(
                      mealData?.selectedDates?.startDate
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Date</span>{" "}
                <span>
                  {" "}
                  {
                    // Format the date as "4 April, 2025"
                    new Date(
                      mealData?.selectedDates?.endDate
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Days</span>{" "}
                <span>{mealData?.selectedDates?.count}</span>
              </div>
              <div className="flex justify-between">
                <span>Price</span> <span>₹110.00 / Meal</span>
              </div>
            </div>

            <h2 className="text-2xl! font-bold primary-font text-orange-300 border-b border-teal-600 pb-2 mt-4 mb-3">
              Bill Summary
            </h2>
            <div className="space-y-2 text-sm">
              {/* <div className="flex justify-between">
                <span>Sub Total</span>{" "}
                <span>₹{mealData?.selectedDates?.length * 110}</span>
              </div> */}
              <div className="flex justify-between">
                <span>Delivery Charges</span> <span>₹840</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span> <span>₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span> <span>₹0.00</span>
              </div>
            </div>
            <div className="border-t border-teal-600 mt-4 pt-2 text-lg font-semibold flex justify-between">
              <span>Grand Total</span> <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
