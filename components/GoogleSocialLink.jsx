"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertBox from "@/components/AlertBox"; // ✅ Reusable AlertBox

const LoginSocialGoogle = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialGoogle),
  { ssr: false }
);

const GoogleSocialLink = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSuccess = async ({ provider, data }) => {
    console.log("Google Login Success:", provider, data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.access_token }),
        }
      );

      const res = await response.json();
      if (response.ok && res?.data && res?.token) {
        const userData = {
          id: res.data.id,
          data: res.data,
          token: res.token,
          status: res.data.status,
        };
        login(userData);
        // startPaymentSession(userData);

        router.push("/");
      } else {
        setError("Google login failed. Please try again.");
        setOpen(true);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("Network error. Please try again.");
      setOpen(true);
    }
  };

  const handleFailure = () => {
    setError("Google Login Failed. Please try again.");
    setOpen(true);
  };

  return (
    <div>
      <LoginSocialGoogle
        client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onResolve={handleSuccess}
        onReject={handleFailure}
      >
        <Image
          src="/images/google.png"
          width={40}
          height={30}
          quality={100}
          alt="Google Login"
          className="cursor-pointer"
        />
      </LoginSocialGoogle>

      {/* ✅ Use reusable AlertBox */}
      <AlertBox open={open} setOpen={setOpen} description={error} />
    </div>
  );
};

export default GoogleSocialLink;
