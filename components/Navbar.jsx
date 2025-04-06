"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Menu, User, LogOutIcon, X, CircleUserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { navLinks } from "@/lib/helper";
import { useAuth } from "@/app/context/AuthContext";
import { usePaymentContext } from "@/app/context/PaymentContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { clearPaymentSession } = usePaymentContext();
  const { user, logout, setUser } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    logout();
    router.push("/");
    clearPaymentSession();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(scrollY > currentScrollY || currentScrollY < 100); // Show if scrolling up or at the top
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <div
      className={`w-full h-20 flex justify-center items-center px-5 md:px-20 fixed top-0 z-50 transition-transform duration-300 navPadding ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full flex justify-between items-center secondary-font">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Rooted to you"
            width={120}
            height={100}
            className="relative"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center gap-16 md:gap-5 xl:gap-10">
          <div className="flex flex-row font-base xl:gap-10 md:gap-5 mt-1  items-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`relative primary-font transition-all duration-300
                    ${
                      pathname === href
                        ? "border-b-2 border-[#b88e56]"
                        : "border-b-2 border-transparent"
                    }
                    hover:border-[#b88e56]`}
              >
                {label}
              </Link>
            ))}
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md border bg-[#F0F0F0] secondary-font text-black flex gap-2 justify-center items-center outline-0 cursor-pointer border-amber-50 w-fit px-5 h-10 overflow-hidden">
                <CircleUserRound />
                {user?.firstName || ""} {user?.lastName || "User Name"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-effect">
                <Link href="/profile">
                  <DropdownMenuItem className="flex justify-start items-center cursor-pointer">
                    <User className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="flex justify-start items-center text-red-400 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => router.push("/register")}
              className="cursor-pointer w-fit px-5 py-2 border-0 text-[#03141C] bg-white flex items-center gap-2"
            >
              <Image
                src="/images/login-arrow.png"
                alt="login"
                width={20}
                height={15}
                className=""
              />
              <span className="primary-font text-lg font-medium text-[#03141C] mt-1.5">
                Login
              </span>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button and Login */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border bg-[#F0F0F0] secondary-font text-black flex gap-2 justify-center items-center outline-0 cursor-pointer border-amber-50 w-fit px-5 h-10 overflow-hidden">
                <Avatar>
                  <AvatarFallback>
                    {user
                      ? `${user.firstName?.[0] || ""}${
                          user.lastName?.[0] || ""
                        }`.toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="glass-effect">
                <DropdownMenuLabel>
                  {user?.firstName || ""} {user?.lastName || "User Name"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border border-neonGreen" />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="flex justify-start items-center text-red-400"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => router.push("/register")}
              className="cursor-pointer w-fit border-0 text-[#03141C] bg-white flex items-center gap-2"
            >
              <Image
                src="/images/login-arrow.png"
                alt="login"
                width={15}
                height={15}
              />
              Login
            </Button>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="relative">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-20 right-0 w-3xs rounded-md glass-effect shadow-md z-40 py-6">
          <div className="flex flex-col items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-white font-base hover:text-gray-600"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;