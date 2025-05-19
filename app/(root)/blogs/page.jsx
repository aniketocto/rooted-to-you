"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";

const Blogs = () => {
  // Sample blog data - replace with your actual blog data
  const blogPosts = [
    {
      id: "https://www.businessoffood.in/how-rotating-regional-indian-cuisines-can-transform-corporate-meal-programs/",
      title:
        "How rotating regional Indian Cuisines can transform Corporate Meal Programs",
      image: "/images/blog7.png",
    },
    {
      id: "https://www.businessoffood.in/coming-back-to-your-roots-why-traditional-meals-are-lucrative-for-corporate-employees-in-2025/",
      title:
        "Coming back to your roots: why traditional meals are lucrative for corporate employees in 2025",
      image: "/images/blog8.jpg",
    },
    {
      id: "https://www.indianretailer.com/restaurant/article/beyond-the-kitchen-5-essential-qualities-required-to-start-a-food-business.12570",
      title:
        "Beyond the Kitchen: 5 Essential Qualities Required to Start a Food Business",
      image: "/images/blog9.jpg",
    },

    {
      id: "https://hospitalitynews.in/news/saurabh-wadkar-and-teja-chekuri-talk-reforms-for-sustainable-growth-in-fb",
      title:
        "Saurabh Wadkar and Teja Chekuri Talk Reforms for Sustainable Growth in F&B",
      image: "/images/blog3.jpg",
    },
    {
      id: "https://hospibuz.com/opinion/budget-expectation-quotes-2025-by-industry-experts-8640478",
      title: "Budget Expectation Quotes 2025 by Industry Experts",
      image: "/images/blog1.webp",
    },
    {
      id: "https://travellersworldonline.com/union-budget-2025-expectations/",
      title: "Union Budget 2025 Expectations",
      image: "/images/blog2.jpg",
    },
    {
      id: "https://mediabrief.com/union-budget-2025-national-institute-of-food-technology-tax-reliefs-to-boost-hospitality-and-fb-sectors/",
      title:
        "Union Budget 2025 | National Institute of Food Technology, tax reliefs to boost Hospitality and F&B sectors",
      image: "/images/blog4.webp",
    },
    {
      id: "https://cxotoday.com/corner-office/voices-on-the-budget-insights-reactions-perspectives/",
      title: "Voices on the Budget: Insights, Reactions & Perspectives",
      image: "/images/blog5.jpg",
    },
    {
      id: "https://www.localsamosa.com/news/union-budget-2025-2026-8685488",
      title:
        "Mixed Reactions: On the 'Treasure Trove' that the Union Budget 2025-2026 Appears to be like!",
      image: "/images/blog6.webp",
    },
  ];

  return (
    <>
      <title>Blogs | Rooted To You</title>
      <meta
        name="description"
        content="Food & Beyond - Explore the tales of Cuisines and fulfill cravings of curiosity."
      />
      <section className="w-full h-fit flex justify-center flex-col items-center ">
        {/* Background Image */}
        <img
          src="/images/blogbanner.jpg"
          className=" w-full hidden md:block object-cover z-[-1] top-0"
          alt="Background"
        />
        <img
          src="/images/Blogbannermob.jpg"
          className=" w-full md:hidden block object-cover z-[-1] top-0"
          alt="Background"
        />

        <div className=" w-full h-full flex flex-col items-center justify-start mt-32 pb-20 overflow-hidden relative">
          <img
            src="/images/decorative.png"
            className="absolute top-0 -z-1 h-[500px]  w-full object-cover"
            alt=""
          />
          <img
            src="/images/decorative.png"
            className="absolute bottom-0 -z-1 h-[500px]  w-full object-cover"
            alt=""
          />
          {/* Blog Grid */}
          <div className="max-w-[85%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {blogPosts.map((blog) => (
              <a
                target="_blank"
                href={blog.id}
                key={blog.id}
                className="group block transform transition-transform duration-300 hover:scale-105"
                style={{ boxShadow: "5px 5px 20px #000" }}
              >
                <div className="glass-effect border-[#e6af55] rounded-lg overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full">
                  {/* Blog Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="flex flex-col justify-between flex-grow p-5">
                    <h3 className="text-xl! font-semibold mb-4 secondary-font hover:text-[#03141c] transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Bottom Info */}
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm primary-font text-gray-500">
                        Read more
                      </span>
                      <span className="bg-blue-100 primary-font text-[#197a8a] text-xs px-2 py-1 rounded">
                        Blog
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
