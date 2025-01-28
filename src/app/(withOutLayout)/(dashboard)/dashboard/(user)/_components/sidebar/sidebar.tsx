import Link from "next/link";
import React from "react";
import { FiBookmark, FiHome, FiSettings } from "react-icons/fi";

const UserSideBar = () => {
  return (
    <>
      <aside className="w-64 bg-gray-100 p-6 hidden md:block">
        <nav className="space-y-4">
          <Link
            href="/dashboard/user"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiHome className="mr-2" size={20} /> Dashboard
          </Link>
          <a
            href="/my-recipes"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiBookmark className="mr-2" size={20} /> My Recipes
          </a>
          <a
            href="/profile"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiSettings className="mr-2" size={20} /> Manage Profile
          </a>
        </nav>
      </aside>
    </>
  );
};

export default UserSideBar;
