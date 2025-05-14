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
import { X } from "lucide-react";

const Page = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
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
    const fetchUserDetails = async () => {
      const storedUser = localStorage.getItem("authenticatedUser");

      if (!storedUser) {
        console.warn("🚫 No user in localStorage, redirecting...");
        // router.replace("/"); // Redirect to home/login if not authenticated
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setToken(parsedUser.token);
      setWalletUsedAmount(parsedUser.wallet || 0);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${parsedUser.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedUser.token}`,
            },
          }
        );

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("❌ Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (!paymentSession?.sessionActive) {
      console.warn("🔒 Payment session not active, redirecting...");
      // router.replace("/");
    }
  }, [paymentSession]);

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

  // const handleApplyCoupon = async () => {
  //   if (!couponCode.trim()) {
  //     setCouponMessage("Please enter a coupon code");
  //     setCouponValid(false);
  //     setActiveCoupon(null);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/coupons/apply`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           code: couponCode,
  //           value: amount,
  //           boxId: boxId,
  //           subscriptionType: subscriptionType,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log(data)

  //     if (response.ok) {
  //       setCouponMessage(data.message || "Coupon applied successfully!");
  //       setCouponValid(true);
  //       setActiveCoupon(data.coupons);
  //     } else {
  //       setCouponMessage(data.error || "Invalid Coupon Code!");
  //       setCouponValid(false);
  //       setActiveCoupon(null);
  //     }
  //   } catch (error) {
  //     console.error("Coupon apply error:", error);
  //     setCouponMessage("Not a valid Coupon Code!");
  //     setCouponValid(false);
  //     setActiveCoupon(null);
  //   }

  //   const matchedCoupon = availableCoupons.find(
  //     (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase()
  //   );

  //   if (matchedCoupon) {
  //     // Check if the coupon is applicable for the current subscription type and box
  //     const isApplicable =
  //       matchedCoupon.subscriptionType === subscriptionType &&
  //       matchedCoupon.boxId.toString() === boxId.toString();

  //     if (isApplicable && matchedCoupon.status === "active") {
  //       // Check if the coupon is valid for the current date
  //       const now = new Date();
  //       const validFrom = new Date(matchedCoupon.validFrom);
  //       const validTo = new Date(matchedCoupon.validTo);

  //       if (now >= validFrom && now <= validTo) {
  //         setCouponMessage("Coupon applied successfully!");
  //         setCouponValid(true);
  //         setActiveCoupon(matchedCoupon);
  //       } else {
  //         setCouponMessage("This coupon has expired or is not yet valid");
  //         setCouponValid(false);
  //         setActiveCoupon(null);
  //       }
  //     } else {
  //       setCouponMessage("This coupon is not applicable for your current plan");
  //       setCouponValid(false);
  //       setActiveCoupon(null);
  //     }
  //   } else {
  //     setCouponMessage("Invalid coupon code");
  //     setCouponValid(false);
  //     setActiveCoupon(null);
  //   }
  // };

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

      if (response.ok && data.success) {
        setCouponMessage(data.message || "Coupon applied successfully!");
        setCouponValid(true);
        setActiveCoupon(data?.data); // Use the coupon data from the API response
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
  };
  console.log("Applied Coupon data", activeCoupon);

  const recalculatePricing = () => {
    if (!paymentSession || !user) return;

    const basePrice = amount || 0;

    // Step 1: Apply coupon discount to base price
    let discountedBasePrice = basePrice;
    let couponDiscount = 0;

    if (couponValid && activeCoupon) {
      couponDiscount = activeCoupon.discountValue || 0;
      discountedBasePrice = Math.max(basePrice - couponDiscount, 0);
    }

    // Step 2: Calculate GST on the discounted base price
    const calculatedGst = discountedBasePrice * (gst || 0);

    // Step 3: Add GST and shipping to get total
    const priceWithGst = discountedBasePrice + calculatedGst;
    const totalAfterTaxAndShipping = priceWithGst + shippingAmount;

    // Step 4: Apply wallet deduction if enabled
    const walletDeduction = redeemWallet
      ? Math.min(walletUsedAmount, totalAfterTaxAndShipping)
      : 0;

    const finalTotal = Math.max(totalAfterTaxAndShipping - walletDeduction, 0);

    // ✅ Final price should be whole number and in paise
    const finalAmount = Math.round(finalTotal);

    // Save computed values
    setDiscountedAmount(Math.round(couponDiscount));
    setTax(Math.round(calculatedGst));
    // setFinalPrice(finalAmount); 
    setFinalPrice(1); 
  };

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
  const amountWallet = redeemWallet ? walletUsedAmount : 0;
  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const payload = {
        amount: finalPrice,
        currency: "INR",
        shippingAmount: shippingAmount,
        discount: discountedAmount || 0,
        gst: tax,
        walletAmount: amountWallet,
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
        address1: userData?.data?.address1,
        address2: userData?.data?.address2,
        city: userData?.data?.city,
        pincode: userData?.data?.pincode,
        department: userData?.data?.department,
        designation: userData?.data?.designation,
        state: "maharashtra",
      };

      console.log("Payload", payload)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/payments/create-order`, //create-order
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
        setError(
          "Oops! Something went wrong while creating your order. Please check your internet connection or try again in a few minutes."
        );
      }

      const data = await response.json();
      if (!data.orderId) {
        setError("Invalid order ID received");
      }
      const razorPayAmount = data.amount * 100;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amountInPaise.toString(), // Razorpay expects amount in paise
        currency: "INR",
        name: "Rooted to You",
        description: "Meal Order",
        order_id: data.id, //orderId here
        handler: async function (response) {
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
            const successData = await successResponse.json();

            router.push("/thank-you");

            setTimeout(() => {
              clearPaymentSession();
              localStorage.removeItem("mealFormData");
            }, 300);
            
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
          localStorage.removeItem("mealFormData");
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
    <section className="w-full h-fit flex justify-center items-center my-20 lg:mt-48 lg:mb-20">
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
        <div className="w-full my-10 md:px-5">
          <h2 className="text-3xl font-bold primary-font text-left w-full">
            Order Summary
          </h2>
          <Separator className="w-full h-[3px] bg-[#197A8A99]" />
        </div>

        <div className="max-w-[1440px] md:w-[90%] w-full flex flex-col md:flex-row items-start md:gap-10 md:mx-10">
          <div className="lg:w-1/2 w-full self-start px-4">
            <div className="w-full bg-[#197A8A99] text-white p-6 border border-dashed border-teal-600 shadow-lg">
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
                    {dietType.replace("_", "-")}
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

              <h2 className="text-2xl! secondary-font font-bold border-y border-teal-600 py-2 pb-2 mt-4 mb-3 text-orange-300">
                Bill Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-base secondary-font">Sub Total</span>
                  <span className="font-base secondary-font">
                    ₹{amount || 0}
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
                    <span className="font-base secondary-font text-[#BAD398]">
                      - ₹{discountedAmount}
                    </span>
                  </div>
                )}
                {redeemWallet && (
                  <div className="flex justify-between">
                    <span className="font-base secondary-font">Wallet</span>
                    <span className="font-base secondary-font text-[#BAD398]">
                      - ₹{walletUsedAmount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="font-base secondary-font">Tax (G.S.T.)</span>
                  <span className="font-base secondary-font">₹{tax || 0}</span>
                </div>
              </div>

              <div className="border-t border-teal-600 mt-4 pt-2 text-lg font-semibold flex justify-between">
                <span className="font-base secondary-font">Grand Total</span>
                <span className="font-base secondary-font">₹{finalPrice}</span>
              </div>
            </div>
          </div>
          {/* Personal Details */}
          <div className="md:w-1/2 w-full p-6">
            <h2 className="text-2xl! font-bold primary-font">
              Personal Details
            </h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />

            <div className="space-y-2 text-sm my-8">
              <div className="flex justify-between">
                <span className="font-base secondary-font capitalize">
                  Full Name
                </span>
                <span className="font-base secondary-font capitalize">
                  {userData?.data.firstName} {userData?.data.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font capitalize">
                  Mobile No.
                </span>
                <span className="font-base secondary-font capitalize">
                  {userData?.data.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-base secondary-font capitalize">
                  Email Address
                </span>
                <span className="font-base secondary-font">
                  {userData?.data.email}
                </span>
              </div>
            </div>

            <h2 className="text-2xl! font-bold primary-font">
              Address Details
            </h2>
            <Separator className="w-full h-[2px] bg-[#D2D2D2]" />

            <div className="space-y-2 text-sm my-8">
              <div className="flex justify-start gap-5">
                <span className="font-base secondary-font capitalize">
                  Address:
                </span>
                <span className="font-base secondary-font capitalize">
                  {userData?.data.address1} {userData?.data.address2}
                </span>
              </div>
              <div className="flex justify-start gap-12">
                <span className="font-base secondary-font capitalize">
                  City
                </span>
                <span className="font-base secondary-font capitalize">
                  {userData?.data.city}
                </span>
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
                {/* Input with clear button wrapper */}
                <div className="relative w-full">
                  <input
                    type="text"
                    id="couponCode"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponMessage("");
                      setCouponValid(false);
                      setActiveCoupon(null);
                    }}
                    placeholder="Enter coupon code"
                    className="border p-2 pr-10 w-full rounded-md"
                  />
                  {couponCode && (
                    <button
                      type="button"
                      onClick={() => {
                        setCouponCode("");
                        setCouponMessage("");
                        setCouponValid(false);
                        setActiveCoupon(null);
                      }}
                      className="absolute right-2 text-2xl top-[50%] -translate-y-1/2 -translate-x-1/2 text-gray-500 hover:text-[#d49c3e] cursor-pointer"
                    >
                      <X />
                    </button>
                  )}
                </div>

                <Button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim() || couponMessage}
                  className={`text-white transition-colors py-5 ${
                    !couponCode.trim() || couponMessage
                      ? "bg-gray-300"
                      : "bg-[#e6af55] hover:bg-[#d49c3e] cursor-pointer"
                  }`}
                >
                  <p className="font-base secondary-font text-[#03141C]!">
                    Apply
                  </p>
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

            <div className="gap-2 text-sm my-8 flex">
              <Button
                type="button"
                className="bg-[#e6af55] flex-1 hover:bg-[#d49c3e] text-[#03141C] text-center cursor-pointer"
                disabled={isProcessing}
                onClick={() => router.back()}
              >
                <Image
                  src="/images/right-arrow.png"
                  alt="right-arrow"
                  width={20}
                  height={15}
                  className=" rotate-180"
                />
                <p className="text-xl text-[#03141C]!  secondary-font">
                  {isProcessing ? "Back" : "Back"}
                </p>
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="bg-[#e6af55] flex-1/2 hover:bg-[#d49c3e] text-[#03141C] text-center cursor-pointer"
              >
                {isProcessing ? "Processing..." : `Pay ₹${finalPrice}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AlertBox open={open} setOpen={setOpen} description={error} />
    </section>
  );
};

export default Page;
