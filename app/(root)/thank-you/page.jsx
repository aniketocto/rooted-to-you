"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import "./thanks.css";

const page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  let message = "Excited to serve you Rooted meals.";
  if (type === "feedback-form-submission") {
    message = "We value your feedback and try to improve day by day.";
  } else if (type === "contact-form-submission") {
    message = "Our executive will get in touch with you soon.";
  }

  return (
    <section className="flex flex-col items-center justify-center h-[60vh] text-center relative">
      <img
        src="/images/decorative.png"
        className="absolute top-0 -z-1 h-[500px] md:w-full object-cover"
        alt=""
      />
      <h1 className="thanks-head">Thank You</h1>
      <p className="thanks-text">{message}</p>
    </section>
  );
};

export default page;
