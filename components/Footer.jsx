import Image from "next/image";
import Link from "next/link";
import React from "react";


const Footer = () => {
  return (
    <div className="footer-bg flex-col secondary-font w-full h-fit flex justify-center items-center px-6 lg:px-15 xl:px-20">
      <Image src='/images/footer-border.png' alt="" width={1420} height={20} className="w-full" />
      <div className="flex h-fit py-12 md:flex-row flex-col justify-around item-start gap-5">
        <div className="md:w-[40%] h-full flex flex-col justify-items-start items-start gap-4">
          <Image
            src="/images/logo.png"
            alt="Rooted to you"
            width={130}
            height={130}
          />
          <div className="flex flex-col">
            <p className="primary-font font-base-1 mt-2">
              Ingenium Food Ventures Pvt Ltd. <br />
              Delivering a real taste of India through authentic and diverse
              flavors, we bring the essence of regional cultures to your
              doorstep, ensuring you always stay true to your roots.
            </p>
          </div>
        </div>
        <div className="md:w-[20%] h-full flex flex-col justify-start gap-4 items-start md:ml-14">
          <p className="font-base">Quick Links</p>
          <div className="flex flex-col justify-around items-start gap-3 primary-font!">
            <Link href="/">Home</Link>
            <Link href="/about">Why Rooted?</Link>
            <Link href="/">Meal Plans</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="md:w-[40%] h-full flex flex-col justify-start items-start gap-5">
          <div>
            <p className="primary-font font-base-1 mt-2">
              Address: Ingenium Food Ventures Pvt Ltd. Unit 10 & 11, Ground
              Floor, Narayan Plaza Building, Saki Vihar Road, Mumbai, MH -
              400072
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-start xl:gap-16 lg:gap-5 gap-3 ">
            <div className="flex flex-col gap-2">
              <p className="secondary-font font-base-1">Follow Us</p>
              <div className="w-full flex flex-row justify-start gap-3">
                <a href="">
                  <Image
                    src="/images/instagram.png"
                    alt="Instagram"
                    width={40}
                    height={100}
                    className="socialImg"
                  />
                </a>
                <a href="">
                  <Image
                    src="/images/facebook.png"
                    alt="Facebook"
                    width={40}
                    height={100}
                    className="socialImg"
                  />
                </a>
                <a href="">
                  <Image
                    src="/images/linkedin.png"
                    alt="Linkedin"
                    width={40}
                    height={100}
                    className="socialImg"
                  />
                </a>
              </div>
            </div>
            <div className="w-full flex-col flex justify-around gap-2">
              <p className="secondary-font font-base-1">Call Us</p>
              <a href="tel: +912260600012">
                <p className="secondary-font font-base-1 flex justify-start gap-2 items-center">
                  <Image
                    src="/images/call.png"
                    alt="call"
                    width={20}
                    height={20}
                    className="contactImg"
                  />
                  +91 2260600012
                </p>
              </a>
              <a href="tel: +912269012696">
                <p className="secondary-font font-base-1 flex justify-start gap-2 items-center">
                  <Image
                    src="/images/call.png"
                    alt="call"
                    width={20}
                    height={20}
                    className="contactImg"
                  />
                  +91 2269012696 (11-6 PM)
                </p>
              </a>
              <a href="mailto: reachout@rootedtoyou.com">
                <p className="secondary-font font-base-1 flex justify-start gap-2 items-center">
                  <Image
                    src="/images/mail.png"
                    alt="mail"
                    width={20}
                    height={20}
                    className="contactImg"
                  />
                  reachout@rootedtoyou.com
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-[#b88e56] w-full h-1 border-0" />
      <div className="w-full max-w-7xl sm:h-28 h-fit py-5 flex justify-around flex-col gap-4 sm:gap-0 sm:flex-row items-center secondary-font font-base-1">
        <Link href="/privacy_policy">Privacy Policy</Link>
        <Link href="/terms_condition">Terms & Conditions</Link>
        <Link href="/cancellation_policy">Cancellation Policy</Link>
      </div>
    </div>
  );
};


export default Footer;





