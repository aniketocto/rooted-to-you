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

  const handleSuccess = ({ provider, data }) => {
    console.log("Facebook Login Success:", provider, data);

    const userData = {
      name: data.name,
      email: data.email,
      token: data.access_token,
    };

    login(userData);
    router.push("/");
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

      <AlertBox
        open={open}
        setOpen={setOpen}
        title="Error"
        description={error}
      />
    </div>
  );
};

export default FbSocialLink;
