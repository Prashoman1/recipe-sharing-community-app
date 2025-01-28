import Link from "next/link";
import React from "react";
import { FiBookmark, FiHome, FiSettings } from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <>
      <aside className="w-64 bg-gray-100 p-6 hidden md:block">
        <nav className="space-y-4">
          <Link
            href="/dashboard/admin"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiHome className="mr-2" size={20} /> Dashboard
          </Link>
          <Link
            href="/dashboard/admin/managed-recipe"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiBookmark className="mr-2" size={20} /> Managed-Recipe
          </Link>
          <Link
            href="/dashboard/admin/managed-admin"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiBookmark className="mr-2" size={20} /> Managed Admin
          </Link>
          <Link
            href="/dashboard/admin/profile"
            className="flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <FiSettings className="mr-2" size={20} /> Manage Profile
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
