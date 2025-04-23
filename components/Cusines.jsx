"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Cuisines = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isHoveringPopup, setIsHoveringPopup] = useState(false);
  const timeoutRef = useRef();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const cuisines = [
    {
      id: 1,
      name: "Maharashtr-ian Cuisine",
      img: "Maharshtra.png",
      desc: "Experience the bold and earthy flavours of the Vidarbha region, the subtle sweetness infused in the cuisine of the Peshwas, and the fiery zest of Kolhapur dishes uncovering dishes that area testament to the state's vibrant culture and traditions.",
    },
    {
      id: 2,
      name: "Punjabi Cuisine",
      img: "Punjabi.png",
      desc: "At Rooted, we believe in exploring beyond the roti, naan, sarso da saag, and butter chicken. While the classics hold a special place in our hearts, the culinary treasure trove of Northern India is brimming with undiscovered gems that await your palate.",
    },
    {
      id: 3,
      name: "South Indian  Cuisine",
      img: "SouthIndia.png",
      desc: "Imagine savouring the rich, layered complexity of Chettinad cuisine, the earthy comforts of Udupis vegetarian fare and the delicate seafood wonders of the Malabar coast. We are passionate about introducing you to the lesser-known yet incredibly flavorful dishes that define the essence of Southern India.",
    },
    {
      id: 4,
      name: "Gujarati Cuisine",
      img: "Gujrat.png",
      desc: "Embark on a culinary exploration with the Gujarati Culinary Landscape where the ethos of simplicity meets the essence of lavishness in every dish. Each dish, though simple in its ingredients, is lavish in its preparation and presentation, embodies the spirit of Gujarati hospitality where every guest is treated like royalty.",
    },
    {
      id: 5,
      name: "Bengali Cuisine",
      img: "Bengal.png",
      desc: "Witness first-hand, the Bengali JholJhaal, where stories are rooted in spices, sweets and inter mingle with longstanding traditions, coming from the lanes of Kolkata to the shores of the Sundarbans.",
    },
  ];

  const handleMouseEnter = (id) => {
    clearTimeout(timeoutRef.current);
    setHoveredCard(id);
    setTimeout(() => {
      setIsPopupVisible(true);
    }, 10); // Immediately show the popup
  };

  const handleMouseLeave = () => {
    // Only start the timeout if we're not hovering over the popup
    if (!isHoveringPopup) {
      timeoutRef.current = setTimeout(() => {
        setIsPopupVisible(false); // Close the popup after delay
        setHoveredCard(null); // Unmount after animation
      }, 500); // Delay closing the popup for 1 second
    }
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false); // Close popup immediately
    timeoutRef.current = setTimeout(() => {
      setHoveredCard(null); // Unmount after animation
    }, 300); // Match the transition duration for smooth closing
  };

  const handlePopupMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHoveringPopup(true); // Keep popup open if hovering over it
  };

  const handlePopupMouseLeave = () => {
    setIsHoveringPopup(false);
    timeoutRef.current = setTimeout(() => {
      setIsPopupVisible(false); // Close popup after 1 second
      setHoveredCard(null); // Unmount after animation
    }, 500); // Wait for 1 second before closing the popup
  };

  return (
    <section className="w-full h-fit flex relative flex-col justify-center items-center gap-20 my-14">
      <h2 className="secondary-font w-full px-2 font-bold text-center mb-8">
        A Culinary Journey Across India, <br /> One Meal at a Time
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {cuisines.map((cuisine) => (
          <div
            key={cuisine.id}
            className="relative cusineBox shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => handleMouseEnter(cuisine.id)}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundImage: `url('/images/${cuisine.img}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full p-7 gap-5">
              <h5 className="text-center secondary-font uppercase text-black! font-bold mb-2">
                {cuisine.name}
              </h5>
              <Image
                src="/images/cusine-arrow.png"
                alt={cuisine.name}
                width={28}
                height={28}
                className="w-5 h-auto invert"
              />
            </div>
          </div>
        ))}

        {hoveredCard && (
          <div
            className="absolute top-1/3 flex items-center justify-center w-fit h-fit bg-opacity-50 z-50"
            onClick={handlePopupClose}
          >
            <div
              className={`bg-white shadow-2xl cusineBoxPop p-6 transition-all duration-700 ease-in-out origin-center relative overflow-hidden
                ${
                  isPopupVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }
              `}
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: `url('/images/${
                  cuisines.find((c) => c.id === hoveredCard)?.img
                }')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 1000,
              }}
            >
              <div className="h-full flex flex-col items-center justify-center relative">
                <div className="flex-grow flex flex-col items-center gap-2 justify-center rounded-lg p-6 mb-4 text-white">
                  <h3
                    className="text-center secondary-font text-2xl uppercase text-white! font-bold mb-2"
                    style={{
                      textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {cuisines.find((c) => c.id === hoveredCard)?.name}
                  </h3>
                  <p
                    className="text-center cuisineExplore font-base-1 text-black primary-font mb-4"
                    style={{
                      textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {cuisines.find((c) => c.id === hoveredCard)?.desc}
                  </p>
                  <Button
                    className="primary-font uppercase text-lg bg-[#e6af55] text-center cursor-pointer font-semibold"
                    onClick={() => router.push("/about")}
                  >
                    <p className="text-[#03141C]! subbtnFont">Explore Now</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cuisines;
