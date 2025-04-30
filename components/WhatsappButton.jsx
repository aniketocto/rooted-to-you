"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <a
          href="https://wa.me/+9118002680268" // <-- replace with your WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="transition-transform transform hover:scale-110">
            <img src="/images/wp.svg" className="w-14" alt="WhatsApp Button" />
          </div>
        </a>
      )}
    </>
  );
}
