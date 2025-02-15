"use client";
import SidebarLink from "@/app/(withOutLayout)/(dashboard)/_components/SideBarLink/SidebarLink";
import React from "react";
import { FiBookmark, FiHome, FiInfo, FiSettings, FiTag } from "react-icons/fi";

import "./style.css";
import { useHomeContext } from "@/context/Home.context";
import Image from "next/image";
import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const UserSideBar = () => {
  const { user } = useHomeContext();

  // console.log({user});
  
  return (
    <>
      <aside className="w-[15%] fixed left-5 max-h-[calc(100vh-20vh)] top-[20%] group overflow-hidden hover:overflow-y-auto transition-all duration-300 pb-5 custom-scrollbar">
        <nav className="space-y-3">
          <Link
            href={`/profile/${user._id}`}
            className="flex items-center gap-3 mb-6 border-b pb-3 hover:bg-gray-100  py-2 px-3 rounded-md"
          >
            <Image
              src={
                user?.profileImage ||
                "https://i.ibb.co.com/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
              }
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{user?.userName}</h2>
            </div>
          </Link>
          {user?.role === "admin" ? (
            <>
              <SidebarLink
              href="/Dashboard/admin"
              icon={FiHome}
              label="Dashboard"
              activePaths={["/Dashboard/admin"]}
              />
              <SidebarLink
              href="/Dashboard/admin/category"
              icon={FiBookmark} 
              label="Category"
              activePaths={["/Dashboard/admin/category"]}
              />
              <SidebarLink
              href="/Dashboard/admin/tag"
              icon={FiTag} 
              label="Tags"
              activePaths={["/Dashboard/admin/tag"]}
              />
              {/* <SidebarLink
              href="/Dashboard/admin/my-recipes"
              icon={FiBookmark}
              label="My Recipes"
              activePaths={["/dashboard/Admin/my-recipes"]}
              /> */}
              <SidebarLink
              href="/Dashboard/admin/profile"
              icon={FiSettings}
              label="Manage Profile"
              activePaths={["/Dashboard/Admin/profile"]}
              />
              <SidebarLink
              href="/Dashboard/admin/managed-recipe"
              icon={FiBookmark}
              label="Managed Recipe"
              activePaths={[
                "/Dashboard/admin/managed-recipe",
                "/Dashboard/admin/recipe/add",
              ]}
              />
              <SidebarLink
              href="/Dashboard/admin/manage-admin"
              icon={RiAdminLine}
              label="Managed Admin"
              activePaths={["/Dashboard/admin/manage-admin","Dashboard/admin/manage-admin/add"]}
              />
              <SidebarLink
              href="/Dashboard/admin/user-list"
              icon={FaUsers}
              label="User List"
              activePaths={["/Dashboard/admin/user-list"]}
              />
            </>
          ) : (
            <>
              <SidebarLink
                href="/Dashboard/user/my-recipes"
                icon={FiBookmark}
                label="My Recipes"
                activePaths={["/Dashboard/user/my-recipes","Dashboard/user/recipe/add"]}
              />
              <SidebarLink
                href="/Dashboard/user/profile"
                icon={FiSettings}
                label="Manage Profile"
                activePaths={["/Dashboard/user/profile"]}
              />
            </>
          )}

          <SidebarLink
            href="/contact-us"
            icon={FiSettings}
            label="Contact Us"
            activePaths={["/contact-us"]}
          />
          <SidebarLink
            href="/about-us"
            icon={FiInfo}
            label="About Us"
            activePaths={["/about-us"]}
          />
        </nav>
      </aside>
    </>
  );
};

export default UserSideBar;
