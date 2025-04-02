'use client'

import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <PaymentContext.Provider value={{ totalAmount, setTotalAmount }}>
      {children}
    </PaymentContext.Provider>
  );
};
