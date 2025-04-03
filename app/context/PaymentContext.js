"use client";

import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  const [paymentSession, setPaymentSession] = useState(null);

  const startPaymentSession = (sessionData) => {
    setPaymentSession(sessionData);
  };
  

  const clearPaymentSession = () => {
    setPaymentSession(null);
  };

  return (
    <PaymentContext.Provider
      value={{ paymentSession, startPaymentSession, clearPaymentSession }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
