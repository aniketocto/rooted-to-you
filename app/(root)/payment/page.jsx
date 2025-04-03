"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Script from "next/script";
import { usePaymentContext } from "@/app/context/PaymentContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [redeemWallet, setRedeemWallet] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const { clearPaymentSession, paymentSession } = usePaymentContext();
  const {
    amount,
    boxId,
    daysCount,
    deliPrice,
    endDate,
    id,
    sessionActive,
    startDate,
    status,
    subscriptionType,
    tax,
    deitType,
    mealTime,
  } = paymentSession || {};

  const formattedStartDate =
    startDate instanceof Date ? startDate.toLocaleDateString() : startDate;
  const formattedEndDate =
    endDate instanceof Date ? endDate.toLocaleDateString() : endDate;

  const router = useRouter();

  const finalPrice = useMemo(() => {
    if (!paymentSession) return 0;

    let price = amount; // Base amount from session
    let discount = 0;

    // Apply Coupon Discount (Example: 10% discount for "SAVE10")
    if (couponCode === "SAVE10") {
      discount = price * 0.1; // 10% discount
    }

    // Deduct Wallet Balance (Assume we have a wallet balance in userDetails)
    let walletBalance = userDetails?.data?.walletBalance || 0;
    if (redeemWallet) {
      const deduction = Math.min(walletBalance, price);
      walletBalance -= deduction; // Reduce wallet balance
      price -= deduction; // Apply deduction to price
    }

    // Apply Discount & Ensure Non-Negative Price
    price -= discount;
    return Math.max(price, 0); // Prevent negative price
  }, [paymentSession, couponCode, redeemWallet, userDetails]);

  const token = userDetails?.data.token;

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ amount: finalPrice }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      if (!data.orderId) {
        throw new Error("Invalid order ID received");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalPrice * 100,
        currency: "INR",
        name: "Rooted to You",
        description: "Meal Order",
        order_id: data.orderId,
        handler: function (response) {
          alert(
            "✅ Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
          clearPaymentSession();
        },
        prefill: {
          name: `${userDetails?.firstName} ${userDetails?.lastName}`,
          email: userDetails?.email,
          contact: userDetails?.phone,
        },
        theme: { color: "#197a8a" },
      };

      const rzpy1 = new window.Razorpay(options);
      rzpy1.open();

      rzpy1.on("payment.failed", function (response) {
        console.error("❌ Payment Failed:", response.error);

        alert(`
          ❌ Payment Failed! 
          Reason: ${response.error.reason} 
          Description: ${response.error.description} 
          Code: ${response.error.code}
        `);

        console.log("Error Details:", response.error);
      });
    } catch (error) {
      console.error("❌ Error in payment:", error);
      alert(
        "⚠️ An error occurred while processing the payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authenticatedUser");

    if (!storedUser || !paymentSession?.sessionActive) {
      console.warn("Unauthorized access attempt, redirecting...");
      router.replace("/");
      return;
    }

    try {
      setUserDetails(JSON.parse(storedUser));
      console.log("pay data", paymentSession);
    } catch (error) {
      console.error("Error parsing authenticated user:", error);
    }
  }, [paymentSession, router]);

  useEffect(() => {
    if (userDetails && paymentSession) {
    }
  }, [userDetails, paymentSession]);
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
                <span>Full Name</span>
                <span>
                  {userDetails?.data?.firstName} {userDetails?.data?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Mobile No.</span>
                <span>{userDetails?.data?.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Email Address</span>
                <span>{userDetails?.data?.email}</span>
              </div>
            </div>

            <h2 className="text-2xl! font-bold primary-font">
              Address Details
            </h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />

            <div className="space-y-2 text-sm my-8">
              <div className="flex justify-start gap-5">
                <span>Address:</span>
                <span>
                  {userDetails?.data?.address1} {userDetails?.data?.address2}
                </span>
              </div>
              <div className="flex justify-start gap-12">
                <span>City</span>
                <span>{userDetails?.data?.city}</span>
              </div>
            </div>

            <h2 className="text-2xl! font-bold primary-font">Payment Option</h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />

            {/* Redeem Wallet Checkbox */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="redeemWallet"
                checked={redeemWallet}
                onChange={() => setRedeemWallet(!redeemWallet)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="redeemWallet" className="text-sm cursor-pointer">
                Redeem from Wallet
              </label>
            </div>

            {/* Coupon Code Input */}
            <div className="mt-4">
              <label htmlFor="couponCode" className="text-sm block mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                id="couponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border p-2 w-full rounded-md"
              />
            </div>

            <div className="space-y-2 text-sm my-8">
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="bg-[#e6af55] w-full hover:bg-[#d49c3e] text-[#03141C] text-center cursor-pointer"
              >
                {isProcessing ? "Processing..." : `Pay ₹${finalPrice}`}
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full lg:sticky top-20 self-start px-4">
            <div className="w-full bg-[#197A8A99] text-white p-6 border border-dashed border-teal-600 shadow-lg">
              <h2 className="text-2xl! primary-font font-bold border-b border-teal-600 pb-2 mb-3 text-orange-300">
                Details for lunch
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
                    {deitType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Plan</span>
                  <span className="font-base secondary-font">
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
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Days</span>
                  <span className="font-base secondary-font">{daysCount}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="font-base secondary-font">Price</span>
                  <span className="font-base secondary-font">
                    ₹110.00 / Meal Plan
                  </span>
                </div> */}
              </div>

              <h2 className="text-2xl! primary-font font-bold border-b border-teal-600 pb-2 mt-4 mb-3 text-orange-300">
                Bill Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Sub Total</span>
                  <span className="font-base secondary-font">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-base secondary-font">
                    Delivery Charges
                  </span>
                  <span className="font-base secondary-font">₹{deliPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Tax</span>
                  <span className="font-base secondary-font">₹{tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-base secondary-font">
                    Discount Amount
                  </span>
                  <span className="font-base secondary-font text-red-500">
                    - ₹{(amount - finalPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-teal-600 mt-4 pt-2 text-lg font-semibold flex justify-between">
                <span className="font-base secondary-font">Grand Total</span>
                <span className="font-base secondary-font">₹{finalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
