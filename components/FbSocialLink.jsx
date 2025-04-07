"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertBox from "./AlertBox";

const LoginSocialFacebook = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook),
  { ssr: false }
);

const FbSocialLink = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSuccess = async ({ provider, data }) => {
    console.log("Facebook Login Success:", provider, data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/auth/facebook`,
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
        router.push("/");
      } else {
        setError("Facebook login failed. Please try again.");
        setOpen(true);
      }
    } catch (error) {
      console.error("Facebook Login Error:", error);
      setError("Network error. Please try again.");
      setOpen(true);
    }
  };

  const handleFailure = () => {
    setError("Facebook login failed. Please try again.");
    setOpen(true);
  };

  return (
    <div>
      {process.env.NEXT_PUBLIC_FACEBOOK_APP_ID && (
        <LoginSocialFacebook
          appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
          onResolve={handleSuccess}
          onReject={handleFailure}
        >
          <Image
            src="/images/loginfacebook.png"
            width={40}
            height={30}
            quality={100}
            alt="Facebook Login"
            className="cursor-pointer"
          />
        </LoginSocialFacebook>
      )}

      <AlertBox open={open} setOpen={setOpen} description={error} />
    </div>
  );
};

export default FbSocialLink;
