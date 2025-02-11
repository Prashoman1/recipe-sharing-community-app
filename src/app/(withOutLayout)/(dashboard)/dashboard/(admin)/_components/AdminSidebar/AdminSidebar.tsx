"use client";
import SidebarLink from "@/app/(withOutLayout)/(dashboard)/_components/SideBarLink/SidebarLink";

import React from "react";
import { FaUsers } from "react-icons/fa";
import { FiBookmark, FiHome, FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";

const AdminSidebar = () => {
  return (
    <>
      <aside className="w-64 bg-gray-300 h-screen max-h-screen overflow-scroll p-6 hidden md:block fixed left-0">
        <nav className="space-y-4">
          <SidebarLink
            href="/dashboard/admin"
            icon={FiHome}
            label="Dashboard"
            activePaths={["/dashboard/admin"]}
          />
          <SidebarLink
            href="/dashboard/admin/managed-recipe"
            icon={FiBookmark}
            label="Managed Recipe"
            activePaths={[
              "/dashboard/admin/managed-recipe",
              "/dashboard/admin/recipe/add",
            ]}
          />
          <SidebarLink
            href="/dashboard/admin/manage-admin"
            icon={RiAdminLine}
            label="Managed Admin"
            activePaths={["/dashboard/admin/manage-admin"]}
          />
          <SidebarLink
            href="/dashboard/admin/user-list"
            icon={FaUsers}
            label="User List"
            activePaths={["/dashboard/admin/user-list"]}
          />

          <SidebarLink
            href="/dashboard/admin/profile"
            icon={FiSettings}
            label="Manage Profile"
            activePaths={["/dashboard/admin/profile"]}
          />
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
