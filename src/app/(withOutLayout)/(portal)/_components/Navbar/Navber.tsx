"use client";
import React from "react";
import { FiSearch, FiHome, FiInfo } from "react-icons/fi";
import Link from "next/link";

import UserDropdown from "../UserDrowpDown/UserDropDown";
import { useHomeContext } from "@/context/Home.context";
import { UserPen, Users } from "lucide-react";
import Logo from "../../../../../../public/images/logo.jpg";
import Image from "next/image";
import ResponsiveBar from "../ResponsiveBar/ResponsiveBar";
import { usePathname } from "next/navigation";
// import Image from "next/image";

const Navbar = () => {
  const { user } = useHomeContext();
  const pathName = usePathname();

  return (
    <header className="bg-white  shadow-md sticky top-0 z-50">
      <nav className=" flex items-center justify-between py-4 px-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="lg:hidden">
            <ResponsiveBar />
          </span>
          <Link href="/" className="flex items-center justify-start">
            <Image
              src={Logo}
              alt="logo"
              width={48}
              height={48}
              className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]"
            />
            <h1 className="text-2xl font-bold text-emerald-600 hidden lg:inline-block">
              RecipeShare
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`flex items-center  hover:text-emerald-600 transition ${
              pathName === "/" ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <FiHome className="mr-1" size={18} /> Home
          </Link>
          {user?._id && (
            <>
              <Link
                href={`/profile/${user._id}`}
                className={`flex items-center  hover:text-emerald-600 transition ${
                  pathName?.includes("/profile")
                    ? "text-emerald-600"
                    : "text-gray-600"
                }`}
              >
                <UserPen className="mr-1" size={18} />
                Profile
              </Link>
              <Link
                href={`/all-users`}
                className={`flex items-center  hover:text-emerald-600 transition ${
                  pathName === "/all-users"
                    ? "text-emerald-600"
                    : "text-gray-600"
                }`}
              >
                <Users className="mr-2" size={18} />
                All User
              </Link>

              <Link
                href={`/contact-us`}
                className={`flex items-center  hover:text-emerald-600 transition ${
                  pathName === "/contact-us"
                    ? "text-emerald-600"
                    : "text-gray-600"
                }`}
              >
                <FiSearch className="mr-2" size={18} />
                Contact Us
              </Link>

              <Link
                href={`/about-us`}
                className={`flex items-center  hover:text-emerald-600 transition ${
                  pathName === "/about-us"
                    ? "text-emerald-600"
                    : "text-gray-600"
                }`}
              >
                <FiInfo className="mr-2" size={18} />
                About Us
              </Link>
            </>
          )}
        </div>

        {/* Post Recipe Button */}

        <UserDropdown />

        {/* Mobile Menu Icon */}
      </nav>
    </header>
  );
};

export default Navbar;
