"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertBox from "@/components/AlertBox";

const GoogleSocialLink = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);

    try {
      if (!credentialResponse) {
        setError("No credential received from Google.");
        setOpen(true);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: credentialResponse.credential }), // ✅ correct shape
        }
      );

      const res = await response.json();
      console.log("Google Login Backend Response:", res);

      if (response.ok) {
        const userData = {
          id: res.data.id,
          data: res.data,
          token: res.token,
          status: res.data.status,
        };
        console.log(userData);
        
        login(userData);

        router.push("/");
      } else {
        setError("Google login failed. Please try again.");
        setOpen(true);
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Network error. Please try again.");
      setOpen(true);
    }
  };

  const handleFailure = () => {
    setError("Google login failed. Please try again.");
    setOpen(true);
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />

      {/* Reusable AlertBox */}
      <AlertBox open={open} setOpen={setOpen} description={error} />
    </div>
  );
};

export default GoogleSocialLink;
