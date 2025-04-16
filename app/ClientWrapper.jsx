"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientWrapper({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <PaymentProvider>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </PaymentProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
