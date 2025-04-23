"use client";

import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { PaymentProvider } from "../context/PaymentContext";

const RootLayout = ({ children }) => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      mirror: false,
    });
    Aos.refresh();
  }, []);

  return (
    <PaymentProvider>
      {children}
    </PaymentProvider>
  );
};

export default RootLayout;
