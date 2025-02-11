"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  href: string;
  icon: IconType;
  label: string;
  activePaths?: string[]; // Allows multiple active paths
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  label,
  activePaths,
}) => {
  const pathName = usePathname();
  const isActive = activePaths
    ? activePaths.includes(pathName) || activePaths.some((path) => pathName.endsWith(path))
    : pathName === href;

  return (
    <Link
      href={href}
      className={`flex items-center p-2 rounded-lg transition ${
        isActive
          ? "text-emerald-600 bg-gray-100"
          : "text-gray-600 hover:text-emerald-600"
      }`}
    >
      <Icon className="mr-2" size={20} />
      {label}
    </Link>
  );
};

export default SidebarLink;
