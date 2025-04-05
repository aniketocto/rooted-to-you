"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Script from "next/script";
import { usePaymentContext } from "@/app/context/PaymentContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AlertBox from "@/components/AlertBox";

const Page = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tax, setTax] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponValue, setCouponValue] = useState(0);
  const [redeemWallet, setRedeemWallet] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("")
  const router = useRouter();
  const deliPrice = 50;
  const [walletUsedAmount, setWalletUsedAmount] = useState(0);

  const [finalPrice, setFinalPrice] = useState(0);

  const { clearPaymentSession, paymentSession } = usePaymentContext();
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
    sessionActive,
    shippingAmount,
    gst,
    mealTime,
  } = paymentSession || {};

  const formattedStartDate =
    startDate instanceof Date ? startDate.toLocaleDateString() : startDate;
  const formattedEndDate =
    endDate instanceof Date ? endDate.toLocaleDateString() : endDate;
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("authenticatedUser");

    if (!storedUser || !paymentSession?.sessionActive) {
      console.warn("Unauthorized access attempt, redirecting...");
      router.replace("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUserDetails(parsedUser);
      setToken(parsedUser?.token); // ✅ works now
      setWalletUsedAmount(parsedUser?.wallet)
      
    } catch (error) {
      console.error("Error parsing authenticated user:", error);
    }
  }, [paymentSession, router]);

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
    if (!paymentSession || !userDetails) return;

    let price = amount || 0;
    let discount = 0;

    // Calculate coupon discount if valid
    if (couponValid && activeCoupon) {
      if (activeCoupon.discountType === "percentage") {
        discount = (price * parseFloat(activeCoupon.value)) / 100;
      } else if (activeCoupon.discountType === "fixed") {
        discount = parseFloat(activeCoupon.value);
      }
    }
    setCouponValue(discount);
    const priceAfterDiscount = Math.max(price - discount, 0);

    // Calculate wallet deduction if enabled
    const walletDeduction = redeemWallet
      ? Math.min(walletUsedAmount, priceAfterDiscount)
      : 0;

    const afterWallet = priceAfterDiscount - walletDeduction;
    const calculatedGst = afterWallet * (gst || 0);
    const total = afterWallet + calculatedGst + deliPrice;

    setDiscountedAmount(discount);
    setTax(calculatedGst);
    setFinalPrice(Math.max(Math.round(total * 100) / 100, 0));
  };

  useEffect(() => {
    recalculatePricing();
  }, [
    redeemWallet,
    amount,
    walletUsedAmount,
    gst,
    paymentSession,
    userDetails,
    couponValid,
    activeCoupon,
  ]);

  useEffect(() => {}, [userDetails, paymentSession]);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const payload = {
        amount: Math.round(finalPrice),
        currency: "INR",
        shippingAmount: deliPrice || 0,
        discount: discountedAmount || 0,
        gst: tax || 0,
        walletAmount: walletUsedAmount,
        couponCode: couponValue,
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
      };

      console.log("pay data", payload);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/payments/order`,
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

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(finalPrice) * 100, // Razorpay expects amount in paise
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
                  Authorization: `Bearer ${userDetails?.token}`,
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
            // router.push("/success");
          } catch (error) {
            console.error("❌ Error calling payment success API:", error);
          }
        },
        prefill: {
          name: `${userDetails?.data?.firstName} ${userDetails?.data?.lastName}`,
          email: userDetails?.data?.email,
          contact: userDetails?.data?.phoneNumber,
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
                onChange={(e) => setRedeemWallet(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="redeemWallet" className="text-sm cursor-pointer">
                Redeem from Wallet (₹{walletUsedAmount})
              </label>
            </div>

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
                {isProcessing
                  ? "Processing..."
                  : `Pay ₹${finalPrice.toFixed(2)}`}
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
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Days</span>
                  <span className="font-base secondary-font">{daysCount}</span>
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
                    ₹{deliPrice.toFixed(2)}
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
                {walletUsedAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="font-base secondary-font">
                      Wallet Amount
                    </span>
                    <span className="font-base secondary-font text-red-500">
                      - ₹{walletUsedAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Tax</span>
                  <span className="font-base secondary-font">
                    ₹{(tax || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-teal-600 mt-4 pt-2 text-lg font-semibold flex justify-between">
                <span className="font-base secondary-font">Grand Total</span>
                <span className="font-base secondary-font">
                  ₹{finalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertBox
        open={open}
        setOpen={setOpen}
        description={error}
      />
    </section>
  );
};

export default Page;
