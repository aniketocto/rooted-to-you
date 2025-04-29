"use client";

import React, { useEffect, useState } from "react";
import "./thanks.css";

const page = () => {
  const [message, setMessage] = useState("Excited to serve you Rooted meals.");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get("type");

    if (type === "feedback-form-submission") {
      setMessage("We value your feedback and try to improve day by day.");
    } else if (type === "contact-form-submission") {
      setMessage("Our executive will get in touch with you soon.");
    }
  }, []);

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
