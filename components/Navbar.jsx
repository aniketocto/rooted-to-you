"use client";


import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Menu, User, LogOutIcon, X } from "lucide-react";
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
  const [isVisible, setIsVisible] = useState(true);
  const scrollYRef = useRef(0); // Stores previous scroll position without triggering re-renders
  const timeoutRef = useRef(null);


  const { clearPaymetSession } = usePaymentContext();
  const router = useRouter();
  const pathname = usePathname();
  const { user, login } = useAuth();


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;


      if (currentScrollY === 0) {
        setIsVisible(true);
        return;
      }


      if (currentScrollY > scrollYRef.current) {
        // Scrolling Down - Hide navbar
        setIsVisible(false);
        clearTimeout(timeoutRef.current);
      } else {
        // Scrolling Up - Show navbar
        setIsVisible(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (window.scrollY > 0) setIsVisible(false);
        }, 3000);
      }


      scrollYRef.current = currentScrollY;
    };


    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("authenticatedUser");
    router.push("/");
    clearPaymetSession();
    login(null);
  };


  return (
    <div
      className={`w-full h-20 flex justify-center items-center px-5 md:px-10 lg:px-20 fixed top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full flex justify-between items-center secondary-font">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Rooted to you"
            width={150}
            height={100}
            className="relative logoImg h-auto"
          />
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center gap-4 lg:gap-8 xl:gap-16">
          <div className="flex flex-row font-base items-center gap-4 lg:gap-8 xl:gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`relative primary-font pb-1 transition-all duration-300 ${
                  pathname === href
                    ? "border-b-2 border-[#b88e56]"
                    : "border-b-2 border-transparent"
                } hover:border-[#b88e56]`}
              >
                {label}
              </Link>
            ))}
          </div>


          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md border primary-font font-base flex justify-center items-center outline-0 cursor-pointer border-amber-50 w-fit px-5 h-10 overflow-hidden">
                <p className="mt-1">
                  {user?.data?.firstName || ""} {user?.data?.lastName || "User"}
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border">
                <Link href="/profile">
                  <DropdownMenuItem className="flex justify-start items-center cursor-pointer">
                    <User className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="border" />
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
              <DropdownMenuTrigger className="rounded-full border flex justify-center items-center cursor-pointer border-amber-50 w-10 overflow-hidden">
                <Avatar>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-effect">
                <DropdownMenuLabel>Aniket Khambal</DropdownMenuLabel>
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





