"use client";
import AlertBox from "@/components/AlertBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderHistoryTable from "@/components/OrderHistory";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authenticatedUser"));
    if (storedUser?.id) {
      setCustomerId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    const fetchProfileAndSubscription = async () => {
      if (!customerId) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${customerId}`
        );
        if (res.ok) {
          const userData = await res.json();
          if (userData?.data) {
            setProfile(userData.data);
            setTempProfile(userData.data);
          }
        }

        const subRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/subscriptions/active/${customerId}`,
          {
            method: "POST", // 👈 Use POST here
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (subRes.ok) {
          const subData = await subRes.json();
          console.log("subData", subData);

          if (subData?.subscription) {
            setActiveSubscription(subData.subscription);
          }
        }
      } catch (err) {
        console.error("Error loading profile/subscription:", err);
      } finally {
        setLoading(false); // 🟡 Mark loading as done
      }
    };

    fetchProfileAndSubscription();
  }, [customerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${customerId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tempProfile),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setIsEditing(false);

      // ✅ Preserve original auth structure (token, etc.)
      const storedUser = JSON.parse(localStorage.getItem("authenticatedUser"));
      const updatedUser = {
        ...storedUser, // keep token/id/etc.
        ...updatedProfile, // overwrite with updated profile fields
      };

      localStorage.setItem("authenticatedUser", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleFeatureUnavailable = (feature) => {
    setError(`${feature} feature is coming soon!`);
    setOpen(true);
  };

  return (
    <section className="w-full h-fit flex justify-center items-center my-16">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100}
        className="absolute top-0 z-[-1] w-full"
      />
      <div className="max-w-[1440px] w-full h-full flex flex-col items-center justify-center md:mx-10 mx-5 mt-32 ">
        {/* Profile & Preferences Section */}
        <div className="w-full h-fit bg-[#197A8A1A] px-10 py-12 mb-8 rounded-md">
          <h3 className="primary-font text-[#e6af55] text-2xl font-semibold mb-6">
            Profile & Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phoneNumber" },
              { label: "Date of Birth", name: "dob", type: "date" },
            ].map((field, i) => (
              <div key={i}>
                <h4 className="text-lg secondary-font mb-1">{field.label}</h4>
                {isEditing ? (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={tempProfile?.[field.name] || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-[#03141C]"
                  />
                ) : (
                  <p className="text-lg">
                    {field.name === "dob"
                      ? tempProfile?.dob
                        ? new Date(tempProfile.dob).toLocaleDateString("en-GB")
                        : "N/A"
                      : tempProfile?.[field.name] || "N/A"}
                  </p>
                )}
              </div>
            ))}
            <div>
              <h4 className="text-lg secondary-font mb-1">Wallet</h4>
              <p className="text-lg text-green-700 font-semibold">
                ₹{profile?.wallet ?? "0.00"}
              </p>
            </div>

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
            {activeSubscription ? (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-lg secondary-font mb-1">Plan:</h4>
                  <p className="text-lg">{activeSubscription.id === 1 ? "Presidential" : "Executive"}</p>
                </div>
                <div>
                  <h4 className="text-lg secondary-font mb-1">Billing:</h4>
                  <p className="text-lg capitalize">
                    {activeSubscription.subscriptionType}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-4">
                No active subscription found.
              </p>
            )}

            <div className="flex justify-start mt-6 space-x-4">
              {["Pause", "Modify", "Cancel"].map((action, i) => (
                <button
                  key={i}
                  className={`py-2 px-4 rounded-md text-white ${
                    action === "Pause"
                      ? "bg-gray-600 hover:bg-gray-500"
                      : action === "Modify"
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                  onClick={() => handleFeatureUnavailable(action)}
                >
                  {action}
                </button>
              ))}
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
        <div className="w-full h-fit bg-[#197A8A1A] px-10 py-12 mb-8 my-10 rounded-md">
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
