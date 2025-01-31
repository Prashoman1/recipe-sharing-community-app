"use client";
import React from "react";
import { FiSearch, FiUser, FiBookmark, FiHome } from "react-icons/fi";
import Link from "next/link";

import UserDropdown from "../UserDrowpDown/UserDropDown";
import { useHomeContext } from "@/context/Home.context";
// import Image from "next/image";

const Navbar = () => {
  const { user } = useHomeContext();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-emerald-600">RecipeShare</div>

        {/* Search Bar */}
        <div className="relative hidden md:block w-1/3">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <FiSearch
            className="absolute top-2 right-3 text-gray-400"
            size={20}
          />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiHome className="mr-1" size={18} /> Home
          </Link>
          <Link
            href="/saved"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiBookmark className="mr-1" size={18} /> Saved
          </Link>
          {user?._id && (
            <Link
              href={`/profile/${user._id}`}
              className="flex items-center text-gray-600 hover:text-emerald-600 transition"
            >
              Profile
            </Link>
          )}
        </div>

        {/* Post Recipe Button */}

        <UserDropdown />

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <FiSearch size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <FiUser size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="block md:hidden px-4 py-2 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <FiSearch
            className="absolute top-2 right-3 text-gray-400"
            size={20}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
