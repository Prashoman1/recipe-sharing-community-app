/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/AuthApi";
import { useHomeContext } from "@/context/Home.context";

const UserDropdown = () => {
  const { user, refreshUser, setRefreshUser } = useHomeContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    const data = await logout();
    if (data) {
      setRefreshUser(!refreshUser);
      router.push("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {user?.email ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btns flex items-center gap-2 rounded text-gray-500 px-4 py-1"
          >
            <Image
              src={
                user?.profileImage
                  ? user?.profileImage
                  : "https://i.ibb.co.com/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
              }
              height={32}
              width={32}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-600">{user?.userName || "Profile"}</span>
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-2 bg-white rounded shadow-md w-44 p-2 z-50">
              <li className="hover:text-white hover:bg-green-400 rounded">
                <Link href={`/dashboard/${user?.role}`}>Dashboard</Link>
              </li>
              <li className="hover:text-white hover:bg-green-400 rounded">
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
          )}
        </>
      ) : (
        <Link
          href="/login"
          className="flex items-center text-gray-600 hover:text-emerald-600 transition"
        >
          Login
          <ArrowRight className="ms-2" size={18} />
        </Link>
      )}
    </div>
  );
};

export default UserDropdown;
