"use client";
import AlertBox from "@/components/AlertBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderHistoryTable from "@/components/OrderHistory";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleFeatureUnavailable = (feature) => {
    setError(`${feature} feature is coming soon!`);
    setOpen(true);

    // setTimeout(() => setOpen(false), 3000);
  };

  const mockProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "1234567890",
    dob: "1990-01-01",
  };

  const safeProfile = profile || mockProfile;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" }); // adjust endpoint as needed
        if (!res.ok) {
          console.warn("API not available, using mock profile");
          // fallback to mock profile
          setProfile({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            phoneNumber: "1234567890",
            dob: "1990-01-01",
          });
          setTempProfile({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            phoneNumber: "1234567890",
            dob: "1990-01-01",
          });
          return;
        }
        // if (!res.ok) throw new Error("Failed to fetch profile data");
        const userData = await res.json();
        setProfile(userData);
        setTempProfile(userData);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    if (JSON.stringify(profile) !== JSON.stringify(tempProfile)) {
      try {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tempProfile),
        });

        if (!res.ok) throw new Error("Failed to update profile");

        const updatedProfile = await res.json();
        setProfile(updatedProfile);
        setTempProfile(updatedProfile);
      } catch (err) {
        console.error("Error updating profile:", err);
      }
    }
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    if (!isEditing && profile) {
      setTempProfile(profile);
    }
    setIsEditing(!isEditing);
  };

  // if (!profile) return <LoadingSpinner />;

  return (
    <section className="w-full h-fit flex justify-center items-center my-20">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100}
        className="absolute top-0 z-[-1]"
      />
      <div className="max-w-[1440px] w-full h-full flex flex-col items-center justify-center md:mx-10 mx-5 mt-32  ">
        {/* Profile & Preferences Section */}
        <div className="w-full h-fit bg-[#197A8A1A] px-10 py-12 mb-8">
          <h3 className="primary-font text-[#e6af55] text-2xl font-semibold mb-6">
            Profile & Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div>
              <h4 className="text-lg secondary-font mb-1">First Name</h4>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={safeProfile?.firstName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
                />
              ) : (
                <p className="text-lg">{safeProfile.firstName || "N/A"}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <h4 className="text-lg secondary-font mb-1">Last Name</h4>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={safeProfile?.lastName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
                />
              ) : (
                <p className="text-lg">{safeProfile.lastName || "N/A"}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <h4 className="text-lg secondary-font mb-1">Email</h4>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={safeProfile?.email || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
                />
              ) : (
                <p className="text-lg">{safeProfile.email || "N/A"}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <h4 className="text-lg secondary-font mb-1">Phone Number</h4>
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={safeProfile?.phoneNumber || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
                />
              ) : (
                <p className="text-lg">{safeProfile.phoneNumber || "N/A"}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <h4 className="text-lg secondary-font mb-1">Date of Birth</h4>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={safeProfile?.dob || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
                />
              ) : (
                <p className="text-lg">
                  {safeProfile.dob
                    ? new Date(safeProfile.dob).toLocaleDateString("en-GB")
                    : "N/A"}
                </p>
              )}
            </div>

            {/* Update/Save Button */}
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
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                onClick={() => handleFeatureUnavailable("Pause")}
              >
                Pause
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
                onClick={() => handleFeatureUnavailable("Modify")}
              >
                Modify
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
                onClick={() => handleFeatureUnavailable("Cancel")}
              >
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
              <button
                className="bg-[#e6af55] text-white py-2 px-4 rounded-md hover:bg-[#d49f4c]"
                onClick={() => handleFeatureUnavailable("Change Address")}
              >
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
      <AlertBox
        open={open}
        setOpen={setOpen}
        title="Upcoming Feature"
        description={error}
      />
    </section>
  );
};

export default ProfilePage;
