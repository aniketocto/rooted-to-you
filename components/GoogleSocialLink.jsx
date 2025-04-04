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
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSuccess = ({ provider, data }) => {
    console.log("Google Login Success:", provider, data);

    // const userData = {
    //   name: data.name,
    //   email: data.email,
    //   token: data.access_token,
    // };

    // login(userData);
    // router.push("/");
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
      <AlertBox
        open={open}
        setOpen={setOpen}
        title="Error"
        description={error}
      />
    </div>
  );
};

export default GoogleSocialLink;
