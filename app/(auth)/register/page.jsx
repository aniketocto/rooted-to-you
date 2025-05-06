"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { usePaymentContext } from "@/app/context/PaymentContext";
import GoogleSocialLink from "@/components/GoogleSocialLink";
import FbSocialLink from "@/components/FbSocialLink";

const formSchema = z.object({
  phoneNumber: z.string().refine((value) => /^[6-9]\d{9}$/.test(value), {
    message: "Please enter a valid Indian mobile number",
  }),
});

const Page = () => {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [invalidIndexes, setInvalidIndexes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(0);

  const { startPaymentSession } = usePaymentContext();

  useEffect(() => {
    let interval;
    if (showOtpInput && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [showOtpInput, timer]);

  const onChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    form.setValue("phoneNumber", value, { shouldValidate: true });
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Step 1: Send Mobile Number to `/api/v1/customers/login`
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: values.phoneNumber }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to verify mobile number.");
        setIsLoading(false);
        return;
      }
      if (response.ok) {
        setShowOtpInput(true);
        setIsLoading(false);
        setResendDisabled(true);
        setTimer(120);
      } else {
        setErrorMessage(otpData.error || "Failed to send OTP.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error); 
      setErrorMessage("Something went wrong. Please try again."); 
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const phoneNumber = form.getValues("phoneNumber");

      if (!phoneNumber || !/^[6-9]\d{9}$/.test(phoneNumber)) {
        setErrorMessage("Invalid mobile number.");
        setIsLoading(false);
        return;
      }
      if (!otp || !/^\d{6}$/.test(otp)) {
        setErrorMessage("Invalid OTP.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/verifyOtp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const userData = {
          id: data.data.id,
          data: data.data,
          token: data.token,
          status: data.data.status,
        };
        login(userData);
        router.back();
      } else {
        setErrorMessage(data.error || "OTP verification failed.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setTimer(120);
    setOtp("");
    setInvalidIndexes([]);

    try {
      const phoneNumber = form.getValues("phoneNumber");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage("Failed to resend OTP.");
        setResendDisabled(false);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      setResendDisabled(false);
    }
  };

  return (
    <div className="max-w-[85%] w-[1270px] max-h-full h-[500px] flex border border-[#E6AF55] rounded-2xl my-32 mx-auto">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="max-w-[90%] w-fit flex flex-col items-center gap-1 justify-center">
          <Image
            src="/images/logo.png"
            alt="Rooted to you"
            width={120}
            height={100}
            className="relative"
          />
          <h3 className="primary-font text-white!">Welcome Back</h3>
          <p className="secondary-font font-base-1 mt-[-2%] mb-4">
            Welcome Back, Please enter your details
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-2 w-full mt-5"
            >
              {!showOtpInput ? (
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-fit block text-[12px]! bg-[#03141c] px-2 absolute left-5 top-[-5%]">
                        Mobile Number
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center border border-white h-12 rounded-md p-2 text-white bg-[#08141b]">
                          <span className="text-lg text-white px-2">+91</span>
                          <Input
                            type="tel"
                            placeholder="Enter Here"
                            {...field}
                            onChange={onChange}
                            maxLength={10}
                            className="w-full bg-transparent border-none outline-none"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-red-500!">
                        {form.formState.errors.phoneNumber?.message ||
                          errorMessage}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              ) : (
                <div className="space-y-4 md:w-full ">
                  <p className="text-center text-white">
                    OTP sent to {form.getValues("phoneNumber")}
                  </p>
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup className="flex gap-x-1 justify-center items-center w-full">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={`rounded-lg border-2 w-18 h-16 text-center text-2xl
                                      focus:outline-none focus:ring-2 focus:ring-blue-400
                                      ${
                                        invalidIndexes.includes(index)
                                          ? "border-red-500"
                                          : "border-gray-300 focus:border-blue-500"
                                      }`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="flex justify-between items-center">
                    <p className="flex items-center justify-center gap-2 text-xl">
                      <Image
                        src="/images/timer.png"
                        alt="Resend OTP"
                        width={20}
                        height={20}
                      />
                      {`${String(Math.floor(timer / 60)).padStart(
                        2,
                        "0"
                      )}:${String(timer % 60).padStart(2, "0")}`}
                    </p>
                    <p
                      className={`primary-font text-lg  transition-all duration-500 ${
                        resendDisabled
                          ? "text-gray-500 cursor-not-allowed"
                          : "cursor-pointer hover:text-[#e6af55]! hover:text-xl "
                      }`}
                      onClick={handleResend}
                    >
                      Resend OTP
                    </p>
                  </div>
                  <p className="primary-font text-red-500!">{errorMessage}</p>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={() => setShowOtpInput(false)}
                      className="w-1/2 bg-[#E6AF55] text-lg text-[#03141C]! primary-font cursor-pointer"
                    >
                      <p className="font-base ">Back</p>
                    </Button>
                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6}
                      className="w-1/2 bg-[#E6AF55] text-lg text-[#03141C] primary-font cursor-pointer"
                    >
                      <p className="font-base ">
                        {isLoading ? "Verifying..." : "Verify"}
                      </p>
                    </Button>
                  </div>
                </div>
              )}
              {!showOtpInput && (
                <Button
                  type="submit"
                  disabled={form.formState.errors.phoneNumber || isLoading}
                  className="w-full bg-[#E6AF55] text-lg flex justify-center items-center text-[#03141C] primary-font cursor-pointer"
                >
                  <p className="font-base">
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </p>
                </Button>
              )}
            </form>
          </Form>

          {!showOtpInput ? (
            <>
              <p className="font-base-4 primary-font p-2 mt-3 text-center">
                By clicking on proceed , you have read and agree to the Rooted
              </p>
              <Link
                href="/tmx"
                className="font-base-2 secondary-font underline"
              >
                Terms of Use & Privacy Policy
              </Link>
              <div className="flex flex-row w-full items-center justify-between mt-5">
                <hr className="w-1/3 bg-white h-[1px]" />
                <p className="primary-font lg:text-lg text-sm small-text">
                  Or Login with
                </p>
                <hr className="w-1/3 bg-white h-[1px]" />
              </div>
              <div className="flex w-full items-center justify-center gap-12 py-5">
                <FbSocialLink />
                <GoogleSocialLink />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="w-1/2 border-l border-[#E6AF55] relative hidden sm:block">
        <Image
          src="/images/login-img.png"
          alt="Login banner"
          fill
          objectFit="cover"
          className="rounded-r-2xl"
        />
      </div>
    </div>
  );
};

export default Page;
