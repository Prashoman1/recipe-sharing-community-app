"use client";
import SidebarLink from "@/app/(withOutLayout)/(dashboard)/_components/SideBarLink/SidebarLink";
import React from "react";
import { FiBookmark, FiHome, FiSettings } from "react-icons/fi";

const UserSideBar = () => {
  return (
    <>
      <aside className="w-64 bg-gray-300 h-screen max-h-screen overflow-scroll p-6 hidden md:block fixed left-0">
        <nav className="space-y-4">
          <SidebarLink
            href="/dashboard/user"
            icon={FiHome}
            label="Dashboard"
            activePaths={[
              "/dashboard/user",
            ]}
          />
          <SidebarLink
            href="/dashboard/user/my-recipes"
            icon={FiBookmark}
            label="My Recipes"
            activePaths={[
              "/dashboard/user/my-recipes",
            ]}
          />
          
          <SidebarLink
            href="/dashboard/user/profile"
            icon={FiSettings}
            label="Manage Profile"
            activePaths={[
              "/dashboard/user/profile",
            ]}
          />
        </nav>
      </aside>
    </>
  );
};

export default UserSideBar;
