"use client";

import React, { useEffect, useState } from "react";
import "./thanks.css";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/helper";

const Page = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message1, setMessage1] = useState(
    "Thank you for subscribing to Rooted!"
  );
  const [message2, setMessage2] = useState(
    "Get ready to enjoy wholesome, flavourful Indian meals delivered straight to your desk"
  );
  const [isFeedback, setIsFeedback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("authenticatedUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id) fetchProfile(parsedUser.id);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (customerId) => {
  
    try {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${customerId}`
      );
      if (!res.ok) throw new Error("Network response was not ok");

      const result = await res.json();
      if (result?.data) setProfile(result.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get("type");

    if (type === "form-submission") {
      setMessage1(
        "We've received your response. Thanks for reaching out to Rooted!"
      );
      setMessage2("Our team will get back to you shortly"); // Clear secondary message
      setIsFeedback(true); // Flag as feedback
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-fit text-center relative">
      <img
        src="/images/decorative.png"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 h-[500px] md:w-full object-cover"
        alt=""
      />
      <div className="w-fit flex m-auto items-center justify-center flex-col main-div">
        <h1 className="thanks-head">
          {isFeedback
            ? "Thank You"
            : `Dear ${profile?.firstName || "User"} ${
                profile?.lastName || ""
              } Congratulations`}
        </h1>

        {!isFeedback && <p className="thanks-text">You're Officially Rooted</p>}

        <p className="thanks-content">{message1}</p>
        {message2 && <p className="thanks-content">{message2}</p>}

        <div className="flex justify-center flex-wrap items-center gap-5 mt-10">
          {!isFeedback && (
            <Button
              className="primary-font uppercase bg-[#e6af55] text-center cursor-pointer font-semibold md:p-3 lg:p-5  px-6 py-6"
              onClick={() => router.push("/profile")}
            >
              <p className="text-[#03141C]! subbtnFont secondary-font">
                See Your Subscription Details
              </p>
            </Button>
          )}
          <Button
            className="primary-font uppercase bg-[#e6af55] text-center cursor-pointer font-semibold md:p-3 lg:p-5  px-6 py-6"
            onClick={() => {
              if (isFeedback) {
                router.back(); // Go to previous page
              } else {
                router.push("/"); // Go to homepage
              }
            }}
          >
            <p className="text-[#03141C]! subbtnFont secondary-font">
              Close Page
            </p>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
