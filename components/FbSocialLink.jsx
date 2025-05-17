"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AlertBox from "./AlertBox";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FbSocialLink = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFbSdkLoaded, setIsFbSdkLoaded] = useState(false);

  // Initialize Facebook SDK
  useEffect(() => {
    // Check if FB SDK is already loaded
    if (window.FB) {
      setIsFbSdkLoaded(true);
      return;
    }

    // Function to initialize the Facebook SDK
    const initFacebookSdk = () => {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v16.0' // Use the appropriate version
        });
        setIsFbSdkLoaded(true);
      };

      // Load the Facebook SDK
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    initFacebookSdk();
  }, []);

  const handleSuccess = async ({ data }) => {
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
      console.log("Facebook Login Response:", res);

      if (response.ok && res?.data && res?.token) {
        const userData = {
          id: res.data.id,
          data: res.data,
          token: res.token,
          status: res.data.status,
        };
        login(userData);

        const urlParams = new URLSearchParams(window.location.search);
        const redirectPath = urlParams.get("redirectTo");

        // Redirect to the specified path or fallback to home
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.push("/"); // Default redirect if no redirectTo parameter
        }
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

  const handleFailure = (error) => {
    console.error("Facebook login error:", error);
    setError("Facebook login failed. Please try again.");
    setOpen(true);
  };

  return (
    <div>
      {isFbSdkLoaded ? (
        <FacebookLogin
          appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
          autoLoad={false}
          callback={handleSuccess}
          onFailure={handleFailure}
          render={(renderProps) => (
            <button
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={renderProps.onClick}
              disabled={!isFbSdkLoaded}
            >
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
              Login with Facebook
            </button>
          )}
        />
      ) : (
        <button
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md opacity-70 cursor-not-allowed"
          disabled
        >
          <Image
            src="/images/facebook.png"
            alt="Facebook"
            width={20}
            height={20}
            className="mr-2"
          />
          Loading Facebook...
        </button>
      )}
      <AlertBox open={open} setOpen={setOpen} description={error} />
    </div>
  );
};

export default FbSocialLink;