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

  const cuisines = [
    {
      id: 1,
      name: "Maharashtrian Cuisine",
      img: "Maharshtra.png",
      desc: "A balance of fiery Kolhapuri curries, tangy aamti dal, and comforting bhakri, celebrating Maharashtra's diverse flavors. Every bite tells a story of tradition, from Peshwa-era delicacies to rustic village-style cooking.",
    },
    {
      id: 2,
      name: "Punjabi Cuisine",
      img: "Punjabi.png",
      desc: "From creamy dal makhani to tandoori-kissed rotis, Punjabi food is rich, robust, and packed with soul-satisfying flavors. Slow-cooked dals and smoky tandoori dishes bring the true essence of North India to your plate.",
    },
    {
      id: 3,
      name: "South Indian  Cuisine",
      img: "SouthIndia.png",
      desc: "Chettinad spices, Udupi classics, and Malabar seafood, South Indian cuisine is a vibrant blend of textures and aromas. Fragrant coconut, curry leaves, and tamarind create layers of depth in every dish.",
    },
    {
      id: 4,
      name: "Gujarati Cuisine",
      img: "Gujrat.png",
      desc: "Soft theplas, fragrant undhiyu, and comforting khichdi, Gujarati food is a harmony of flavors, perfect for any occasion. A cuisine where sweetness meets spice, turning even the simplest meal into a celebration.",
    },
    {
      id: 5,
      name: "Bengali Cuisine",
      img: "Bengal.png",
      desc: "Mustard-laced fish curries, delicate posto, and melt-in-your-mouth sweets, Bengali cuisine is a feast for the senses. Every meal is a poetic blend of flavors, deeply rooted in age-old culinary traditions.",
    },
  ];

  const handleMouseEnter = (id) => {
    clearTimeout(timeoutRef.current);
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    // Only start the timeout if we're not hovering the popup
    if (!isHoveringPopup) {
      timeoutRef.current = setTimeout(() => {
        setHoveredCard(null);
      }, 100);
    }
  };

  const handlePopupMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHoveringPopup(true);
  };

  const handlePopupMouseLeave = () => {
    setIsHoveringPopup(false);
    timeoutRef.current = setTimeout(() => {
      setHoveredCard(null);
    }, 100);
  };

  return (
    <section className="w-full h-fit flex relative flex-col justify-center items-center gap-20 my-14">
      <h2 className="secondary-font text-4xl font-bold text-center mb-8">
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
             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-fit h-fit bg-opacity-50 z-50"
            onClick={() => setHoveredCard(null)}
          >
            <div
              className="bg-white shadow-2xl cusineBoxPop p-6 transform scale-110 transition-transform duration-1000 relative overflow-hidden"
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: `url('/images/${
                  cuisines.find((c) => c.id === hoveredCard)?.img
                }')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="h-full flex flex-col items-center justify-center relative">
                <div className="flex-grow flex flex-col items-center gap-2 justify-center rounded-lg p-6 mb-4 text-white">
                  <h3 className="text-center secondary-font text-2xl uppercase text-black! font-bold mb-2">
                    {cuisines.find((c) => c.id === hoveredCard)?.name}
                  </h3>
                  <p className="text-center cuisineExplore font-base-1 text-black! text-shadow-lg/30 primary-font mb-4">
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
