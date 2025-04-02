"use client";

import React from "react";
import { PaymentProvider } from "../context/PaymentContext";

const RootLayout = ({ children }) => {
  return <PaymentProvider>{children}</PaymentProvider>;
};

export default RootLayout;
