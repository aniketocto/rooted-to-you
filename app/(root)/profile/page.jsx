"use client";
import OrderHistoryTable from "@/components/OrderHistory";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("rootedUserDetails");
        const parsedData = storedData ? JSON.parse(storedData) : null;
        if (parsedData) {
          setProfile(parsedData);
          setTempProfile(parsedData);
        }
      } catch (error) {
        console.error("Error parsing localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem("rootedUserDetails", JSON.stringify(profile));
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing && profile) {
      setTempProfile(profile);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <section className="w-full h-fit flex justify-center items-center my-20">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100} // Increase quality (0-100)
        className="absolute top-0 z-[-1]"
      />
      <div className="max-w-[1440px] w-full h-full flex flex-col items-center justify-center md:mx-10 mx-5">
        {/* Profile & Preferences Section */}
        <div className="w-full h-fit bg-[#197A8A1A] px-10 py-12 mb-8">
          <h3 className="primary-font text-[#e6af55] text-2xl font-semibold mb-6">
            Profile & Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(profile).map((key) => (
              <div key={key}>
                <h4 className="text-lg secondary-font mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h4>
                {isEditing ? (
                  <input
                    type={
                      key === "email"
                        ? "email"
                        : key === "dob"
                        ? "date"
                        : "text"
                    }
                    name={key}
                    value={tempProfile?.[key] || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
                  />
                ) : (
                  <p className="text-lg">
                    {key === "dob"
                      ? new Date(profile[key]).toLocaleDateString("en-GB")
                      : profile[key]}
                  </p>
                )}
              </div>
            ))}
            <div className="flex items-center justify-start">
              {isEditing ? (
                <button
                  onClick={handleUpdateProfile}
                  className="bg-[#e6af55] text-white py-2 px-4 rounded-md hover:bg-[#d49f4c]"
                >
                  Save Profile
                </button>
              ) : (
                <button
                  onClick={toggleEditMode}
                  className="bg-[#e6af55] text-white py-2 px-4 rounded-md hover:bg-[#d49f4c]"
                >
                  Update Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subscription & Delivery Section */}
        <div className="w-full h-fit flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-[#197A8A1A] p-6 rounded-md">
            <h3 className="primary-font text-[#e6af55] text-xl font-semibold mb-4">
              Active Subscription
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="text-lg secondary-font mb-1">Plan:</h4>
                <p className="text-lg">Executive Meal</p>
              </div>
              <div>
                <h4 className="text-lg secondary-font mb-1">Billing:</h4>
                <p className="text-lg">Monthly</p>
              </div>
              <div>
                <h4 className="text-lg secondary-font mb-1">Next Meal:</h4>
                <p className="text-lg">Maharashtrian Cuisine</p>
              </div>
            </div>
            <div className="flex justify-start mt-6 space-x-4">
              <button className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500">
                Pause
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">
                Modify
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500">
                Cancel
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-[#197A8A1A] p-6 rounded-md">
            <h3 className="primary-font text-[#e6af55] text-xl font-semibold mb-4">
              Change Delivery
            </h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="New Address"
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
              />
            </div>
            <div className="flex justify-start gap-4 mb-4">
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                Date
              </button>
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                Time
              </button>
            </div>
            <div className="flex justify-start">
              <button className="bg-[#e6af55] text-white py-2 px-4 rounded-md hover:bg-[#d49f4c]">
                Update Delivery
              </button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="w-full h-fit bg-[#197A8A1A] px-10 py-12 mb-8 my-10">
          <h3 className="primary-font text-[#e6af55] text-xl font-semibold mb-4">
            Order History
          </h3>
          <OrderHistoryTable className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
