"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Blogs = () => {
  const router = useRouter();

  const blogPosts = [
    {
      id: 1,
      title: "Exploring the Flavors of Maharashtra",
      image: "/images/maharashtra-blog.jpg",
      slug: "flavors-of-maharashtra",
    },
    {
      id: 2,
      title: "Secrets of South Indian Spices",
      image: "/images/south-india-blog.jpg",
      slug: "south-indian-spices",
    },
    {
      id: 3,
      title: "The Sweetness of Bengali Cuisine",
      image: "/images/bengali-cuisine-blog.jpg",
      slug: "sweetness-of-bengal",
    },
    {
      id: 4,
      title: "Why Punjabi Food Feels Like Home",
      image: "/images/punjabi-food-blog.jpg",
      slug: "punjabi-food-love",
    },
  ];

  const handleBlogClick = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 secondary-font text-center">
        Our Latest Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {blogPosts.map((blog) => (
          <div
            key={blog.id}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            onClick={() => handleBlogClick(blog.slug)}
          >
            <div className="relative w-full h-60">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold secondary-font text-gray-800">
                {blog.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
