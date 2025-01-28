"use client";
import { logout } from "@/services/AuthApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const handleLogout = async () => {
    const data = await logout();
    if (data) {
      router.push("/login");
    }
  };
  return (
    <div>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold text-emerald-600">Dashboard</div>
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src="https://i.ibb.co.com/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-600">Profile</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 z-40 w-48">
                <Link
                  href="/dashboard/user/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-emerald-600"
                >
                  Manage Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-emerald-600"
                >
                  <FiLogOut className="inline mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
