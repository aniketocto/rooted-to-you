"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import AlertBox from "./AlertBox";

const FacebookLoginButton = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: "v18.0",
      });
      setSdkLoaded(true);
    };

    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      setSdkLoaded(true); // Already loaded
    }
  }, []);

  const handleFacebookLogin = () => {
    if (!sdkLoaded) return;

    FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/auth/facebook`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: accessToken }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log("Facebook login response:", res);
              if (res?.data && res?.token) {
                const userData = {
                  id: res.data.id,
                  data: res.data,
                  token: res.token,
                  status: res.data.status,
                };
                login(userData);
                const redirectPath = new URLSearchParams(window.location.search).get("redirectTo");
                router.push(redirectPath || "/");
              } else {
                throw new Error("Facebook login failed.");
              }
            })
            .catch(() => {
              setError("Facebook login failed. Please try again.");
              setOpen(true);
            });
        } else {
          setError("Facebook login cancelled or failed.");
          setOpen(true);
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div>
      <button
        onClick={handleFacebookLogin}
        disabled={!sdkLoaded}
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Image
          src="/images/facebook.png"
          alt="Facebook"
          width={20}
          height={20}
          className="mr-2"
        />
        Login with Facebook
      </button>
      <AlertBox open={open} setOpen={setOpen} description={error} />
    </div>
  );
};

export default FacebookLoginButton;
