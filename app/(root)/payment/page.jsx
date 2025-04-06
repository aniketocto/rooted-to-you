"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Script from "next/script";
import { usePaymentContext } from "@/app/context/PaymentContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AlertBox from "@/components/AlertBox";
import { useAuth } from "@/app/context/AuthContext";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { clearPaymentSession, paymentSession } = usePaymentContext();

  const [token, setToken] = useState(null);
  const [walletUsedAmount, setWalletUsedAmount] = useState(0);
  const [redeemWallet, setRedeemWallet] = useState(false);

  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState(0);
  const [couponValid, setCouponValid] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);

  const [tax, setTax] = useState(0);

  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);

  const [finalPrice, setFinalPrice] = useState(0);

  const {
    boxId,
    customerId,
    status,
    subscriptionType,
    startDate,
    endDate,
    amount,
    cuisineChoice,
    itemCode,
    itemNames,
    dietType,
    weekendType,
    daysCount,
    selectedDatesArray,
    sessionActive,
    shippingAmount,
    gst,
    mealTime,
  } = paymentSession || {};

  const formattedStartDate =
    startDate instanceof Date ? startDate.toDateString() : startDate;
  const formattedEndDate =
    endDate instanceof Date ? endDate.toDateString() : endDate;

  useEffect(() => {
    // if (!user || !paymentSession?.sessionActive) {
    //   console.warn("Unauthorized access attempt, redirecting...");
    //   router.replace("/");
    //   return;
    // }

    setToken(user?.token);
    if (user?.wallet && user?.wallet > 0) {
      setWalletUsedAmount(user?.wallet); // Initial wallet amount
    }
  }, [user, paymentSession, router]);

  console.log(walletUsedAmount);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/coupons/list?size=10`
        );
        const data = await response.json();
        setAvailableCoupons(data?.coupons || []);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      setCouponValid(false);
      setActiveCoupon(null);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/coupons/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code: couponCode,
            value: amount,
            boxId: boxId,
            subscriptionType: subscriptionType,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCouponMessage(data.message || "Coupon applied successfully!");
        setCouponValid(true);
        setActiveCoupon(data.coupons);
      } else {
        setCouponMessage(data.error || "Invalid Coupon Code!");
        setCouponValid(false);
        setActiveCoupon(null);
      }
    } catch (error) {
      console.error("Coupon apply error:", error);
      setCouponMessage("Not a valid Coupon Code!");
      setCouponValid(false);
      setActiveCoupon(null);
    }

    console.log("Active Coupon", activeCoupon);

    const matchedCoupon = availableCoupons.find(
      (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (matchedCoupon) {
      // Check if the coupon is applicable for the current subscription type and box
      const isApplicable =
        matchedCoupon.subscriptionType === subscriptionType &&
        matchedCoupon.boxId.toString() === boxId.toString();

      if (isApplicable && matchedCoupon.status === "active") {
        // Check if the coupon is valid for the current date
        const now = new Date();
        const validFrom = new Date(matchedCoupon.validFrom);
        const validTo = new Date(matchedCoupon.validTo);

        if (now >= validFrom && now <= validTo) {
          setCouponMessage("Coupon applied successfully!");
          setCouponValid(true);
          setActiveCoupon(matchedCoupon);
        } else {
          setCouponMessage("This coupon has expired or is not yet valid");
          setCouponValid(false);
          setActiveCoupon(null);
        }
      } else {
        setCouponMessage("This coupon is not applicable for your current plan");
        setCouponValid(false);
        setActiveCoupon(null);
      }
    } else {
      setCouponMessage("Invalid coupon code");
      setCouponValid(false);
      setActiveCoupon(null);
    }
  };

  const recalculatePricing = () => {
    if (!paymentSession || !user) return;

    const basePrice = amount || 0;

    // Step 1: Calculate GST on base price
    const calculatedGst = basePrice * (gst || 0);
    const priceWithGst = basePrice + calculatedGst;

    // Step 2: Add shipping
    const totalBeforeDiscounts = priceWithGst + shippingAmount;

    // Step 3: Apply coupon discount (on total before discounts)
    let couponDiscount = 0;
    if (couponValid && activeCoupon) {
      if (activeCoupon.discountType === "percentage") {
        couponDiscount =
          (totalBeforeDiscounts * parseFloat(activeCoupon.value)) / 100;
      } else if (activeCoupon.discountType === "fixed") {
        couponDiscount = parseFloat(activeCoupon.value);
      }
    }

    const afterCoupon = Math.max(totalBeforeDiscounts - couponDiscount, 0);

    // Step 4: Apply wallet deduction if enabled
    const walletDeduction = redeemWallet
      ? Math.min(walletUsedAmount, afterCoupon)
      : 0;

    const finalTotal = Math.max(afterCoupon - walletDeduction, 0);

    // ✅ Final price should be whole number and in paise
    const finalAmount = Math.round(finalTotal);

    // Save computed values
    setDiscountedAmount(Math.round(couponDiscount));
    setTax(Math.round(calculatedGst));
    setFinalPrice(finalAmount); // Final price in paise (no decimals)
  };
  console.log("Final Price",finalPrice)
  useEffect(() => {
    recalculatePricing();
  }, [
    redeemWallet,
    amount,
    walletUsedAmount,
    gst,
    paymentSession,
    user,
    couponValid,
    activeCoupon,
  ]);
  const amountInPaise = finalPrice * 100;
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const payload = {
        amount: finalPrice,
        currency: "INR",
        shippingAmount: shippingAmount,
        discount: discountedAmount || 0,
        gst: tax,
        walletAmount: walletUsedAmount || 0,
        couponCode: couponCode,
        subscriptionType: subscriptionType,
        boxId: boxId,
        dietType: dietType,
        weekendType: weekendType,
        cuisineChoice: cuisineChoice,
        startDate: startDate,
        endDate: endDate,
        status: status,
        customerId: customerId,
        itemCode: itemCode,
        itemNames: itemNames,
        deliveryType: mealTime,
        selectedDates: selectedDatesArray,
      };

      console.log("pay data", payload);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/payments/order`,  //create-order
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        setError("Failed to create order");
      }

      const data = await response.json();
      if (!data.orderId) {
        setError("Invalid order ID received");
      }
      const razorPayAmount = data.amount * 100;
      console.log(razorPayAmount)
      console.log("Amount in paise", amountInPaise)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amountInPaise.toString(), // Razorpay expects amount in paise
        currency: "INR",
        name: "Rooted to You",
        description: "Meal Order",
        order_id: data.id, //orderId here
        handler: async function (response) {
          alert(
            "✅ Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
          try {
            const successResponse = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/payments/success`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                  // ...payload,
                  razorpayPaymentId: response.razorpay_payment_id,
                  orderCreationId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );

            const result = await successResponse.json();
            console.log("✅ Payment Success API Response:", result);
            clearPaymentSession();
            // router.push("/profile");
          } catch (error) {
            console.error("❌ Error calling payment success API:", error);
          }
        },
        prefill: {
          name: `${user?.data?.firstName} ${user?.data?.lastName}`,
          email: user?.data?.email,
          contact: user?.data?.phoneNumber,
        },
        theme: { color: "#197a8a" },
      };

      const rzpy1 = new window.Razorpay(options);
      rzpy1.open();

      rzpy1.on("payment.failed", async function (response) {
        console.error("❌ Payment Failed:", response.error);

        setError(`
          ❌ Payment Failed! 
          Reason: ${response.error.reason} 
          Description: ${response.error.description} 
          Code: ${response.error.code}
        `);

        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/payments/failed`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: data.orderId, // <- This is the orderId you got from /payments/order
              }),
            }
          );
        } catch (err) {
          console.error("❌ Error calling payment failed API:", err);
        }
      });
    } catch (error) {
      console.error("❌ Error in payment:", error);
      setError(
        "⚠️ An error occurred while processing the payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

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
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Mobile No.</span>
                <span>{user?.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Email Address</span>
                <span>{user?.email}</span>
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
                  {user?.address1} {user?.address2}
                </span>
              </div>
              <div className="flex justify-start gap-12">
                <span>City</span>
                <span>{user?.city}</span>
              </div>
            </div>

            <h2 className="text-2xl! font-bold primary-font">Payment Option</h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />

            {/* Redeem Wallet Checkbox */}
            {walletUsedAmount > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="redeemWallet"
                  checked={redeemWallet}
                  onChange={(e) => setRedeemWallet(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="redeemWallet"
                  className="text-sm cursor-pointer"
                >
                  Redeem from Wallet (₹{walletUsedAmount})
                </label>
              </div>
            )}

            {/* Coupon Code Input with Apply Button */}
            <div className="mt-4">
              <label htmlFor="couponCode" className="text-sm block mb-1">
                Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    if (couponValid) {
                      setCouponValid(false);
                      setCouponMessage("");
                      setActiveCoupon(null);
                    }
                  }}
                  placeholder="Enter coupon code"
                  className="border p-2 flex-grow rounded-md"
                />
                <Button
                  onClick={handleApplyCoupon}
                  className="bg-[#197A8A] hover:bg-[#156b79] text-white"
                >
                  Apply
                </Button>
              </div>
              {couponMessage && (
                <p
                  className={`text-sm mt-1 ${
                    couponValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {couponMessage}
                </p>
              )}
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
                    {dietType}
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
              </div>

              <h2 className="text-2xl! primary-font font-bold border-b border-teal-600 pb-2 mt-4 mb-3 text-orange-300">
                Bill Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Sub Total</span>
                  <span className="font-base secondary-font">
                    ₹{(amount || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-base secondary-font">
                    Delivery Charges
                  </span>
                  <span className="font-base secondary-font">
                    ₹{shippingAmount}
                  </span>
                </div>
                {discountedAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="font-base secondary-font">
                      Discount Amount
                    </span>
                    <span className="font-base secondary-font text-red-500">
                      - ₹{discountedAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                {redeemWallet && (
                  <div className="flex justify-between">
                    <span className="font-base secondary-font">Wallet</span>
                    <span className="font-base secondary-font text-red-500">
                      - ₹{walletUsedAmount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="font-base secondary-font">GST</span>
                  <span className="font-base secondary-font">
                    ₹{(tax || 0).toFixed(2)}
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
      <AlertBox open={open} setOpen={setOpen} description={error} />
    </section>
  );
};

export default Page;
