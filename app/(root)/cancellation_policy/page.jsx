import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="w-full h-fit flex justify-center items-center my-20 mt-36">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100}
        className="absolute top-0 z-[-1]"
      />
      <div className="max-w-[1240px] w-full h-full flex flex-col items-baseline justify-center md:mx-10 mx-5">
        <h2 className="secondary-font text-[#e6af55] text-center w-full mb-10">
          Cancellation Policy
        </h2>
        <p className="text-xl primary-font text-justify">
          To intimate Us about the cancellation of the subscription Service for
          any other reason post the time period provided in this Section above,
          You will be required to email Us at info@rootedtoyou.com. Upon
          cancellation, the remainder, post deductions, if any, will be refunded
          to You, on a case to case basis after due investigation, to the same
          account from which the payment was made in accordance with the formula
          provided hereunder: Total Subscription Amount (before GST) (÷) 26
          subscriptions days) (–) the number of used service days (=) Refund
          Amount.
        </p>
      </div>
    </section>
  );
};

export default page;
