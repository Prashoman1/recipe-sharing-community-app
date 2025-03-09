"use client";
import React from "react";
import { FiHome } from "react-icons/fi";
import Link from "next/link";

import UserDropdown from "../UserDrowpDown/UserDropDown";
// import { useHomeContext } from "@/context/Home.context";
// import {  Users } from "lucide-react";
import Logo from "../../../../../../public/images/logo.jpg";
import Image from "next/image";
import ResponsiveBar from "../ResponsiveBar/ResponsiveBar";
import { usePathname } from "next/navigation";
import { useHomeContext } from "@/context/Home.context";
// import Image from "next/image";

const Navbar = () => {
  const { setSearchRecipe } = useHomeContext();
  const pathName = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between py-4 px-4 lg:px-14">
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

        {/* Search Input */}
        <div className="hidden lg:block mx-4 w-[30%]">
          <input
            type="text"
            onChange={(e) => setSearchRecipe(e.target.value)}
            placeholder="Search recipes..."
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`flex items-center hover:text-emerald-600 transition ${
              pathName === "/" ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <FiHome className="mr-1 w-10 h-8" />
          </Link>
        </div>

        {/* User Dropdown */}
        <UserDropdown />
      </nav>
    </header>
  );
};

export default Navbar;
