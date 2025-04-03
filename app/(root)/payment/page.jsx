"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Script from "next/script";
import { usePaymentContext } from "@/app/context/PaymentContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { paymentSession } = usePaymentContext();

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("authenticatedUser");

    // If either `authenticatedUser` or `paymentSession.sessionActive` is missing, redirect
    if (!storedUser || !paymentSession?.sessionActive) {
      console.warn("Unauthorized access attempt, redirecting...");
      router.replace("/"); // Redirect to home or another safe page
      return;
    }

    try {
      setUserDetails(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error parsing authenticated user:", error);
    }
  }, [paymentSession, router]);

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
         
        </div>
      </div>
    </section>
  );
};

export default Page;
