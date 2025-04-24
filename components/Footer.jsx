import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../app/styles/footer.css";

const Footer = () => {
  return (
    <div className="footer-bg flex-col secondary-font w-full h-fit flex justify-center items-center px-5 md:px-18 ">
      <Image
        src="/images/footer-border.png"
        alt=""
        width={1420}
        height={20}
        className="w-full"
      />
      <div className="flex h-fit py-12 md:flex-row flex-col justify-around item-start gap-5">
        <div className="md:w-[40%] h-full flex flex-col justify-items-start items-start gap-4">
          <Image
            src="/images/logo.png"
            alt="Rooted to you"
            width={130}
            height={130}
          />
          <div className="flex flex-col">
            <p className="primary-font font-base mt-2">
              <strong className="footer-head">
                {" "}
                Ingenium Food Ventures Pvt Ltd.
              </strong>{" "}
              <br />
              <span className="footer-font">
                Delivering a real taste of India through authentic and diverse
                flavors, we bring the essence of regional cultures to your
                doorstep, ensuring you always stay true to your roots.
              </span>
            </p>
          </div>
          <div>
            <p className="primary-font font-base mt-2">
              <strong className="footer-head">Address:</strong> <br />
              <span className="footer-font">
                Ingenium Food Ventures Pvt Ltd. Unit 10 & 11, Ground Floor,
                Narayan Plaza Building, Saki Vihar Road, Mumbai, MH - 400072
              </span>
            </p>
          </div>
        </div>
        <div className="md:w-[30%] h-full flex flex-col justify-center gap-2 items-start md:mt-12  md:pl-20">
          <p className="primary-font footer-head mt-2">
            <strong>Quick Links</strong>
          </p>
          <div className="flex flex-col justify-around text-lg items-start gap-1 primary-font!">
            <Link href="/" className="footer-font">
              Home
            </Link>
            <Link href="/about" className="footer-font">
              Our Roots
            </Link>
            <Link href="/order" className="footer-font">
              Meal Plans
            </Link>
            <Link href="/b2b" className="footer-font">
              B2B
            </Link>
            <Link href="/blogs" className="footer-font">
              Blogs
            </Link>
            <Link href="/contact" className="footer-font">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="md:w-[30%] h-full flex flex-col justify-start items-start gap-5  md:mt-12">
          <div className="w-full flex flex-col justify-start gap-3">
            <div className="flex flex-col gap-2">
              <p className="primary-font footer-head mt-2">
                <strong>Follow Us</strong>
              </p>
              <div className="w-full flex flex-row justify-start gap-3">
                <a
                  href="https://www.instagram.com/rootedtoyou/"
                  target="_blank"
                >
                  <Image
                    src="/images/instagram.png"
                    alt="Instagram"
                    width={30}
                    height={100}
                    className="socialImg"
                  />
                </a>
                <a
                  href="https://www.facebook.com/share/1DUG9Btxbg/"
                  target="_blank"
                >
                  <Image
                    src="/images/facebook.png"
                    alt="Facebook"
                    width={30}
                    height={100}
                    className="socialImg"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/rooted-to-you/"
                  target="_blank"
                >
                  <Image
                    src="/images/linkedin.png"
                    alt="Linkedin"
                    width={30}
                    height={100}
                    className="socialImg"
                  />
                </a>
              </div>
            </div>
            <div className="w-full flex-col flex justify-around gap-2">
              <p className="primary-font font-base-1">
                <strong>Call Us</strong>
              </p>
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
        <Link href="/faqs">FAQs</Link>
        {/* <CancellationPolicyDialog /> */}
      </div>
    </div>
  );
};

export default Footer;
