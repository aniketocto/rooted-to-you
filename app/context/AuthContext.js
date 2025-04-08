"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("authenticatedUser");

      if (!storedUser || storedUser === "undefined") {
        setLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.id && parsedUser.token) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${parsedUser.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${parsedUser.token}`,
              },
            }
          );

          if (!res.ok) throw new Error("Failed to fetch user details");

          const result = await res.json();
          setUser(result.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser(null);
        localStorage.removeItem("authenticatedUser");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


   const login = async (userData) => {
    localStorage.setItem("authenticatedUser", JSON.stringify(userData));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${userData.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch full user data");

      const result = await res.json();

      // Save complete user profile
      const fullUser = {
        ...result.data,
        token: userData.token, // include token again
      };
      setUser(fullUser);
      localStorage.setItem("authenticatedUser", JSON.stringify(fullUser));
    } catch (error) {
      console.error("Error fetching full user after login:", error);
      setUser(userData); // fallback to basic info
    }
  };

  const logout = () => {
    localStorage.removeItem("authenticatedUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
