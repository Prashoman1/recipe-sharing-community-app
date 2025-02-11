"use client";
import "./responsiveCss.css";
import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { FiHome, FiInfo, FiSearch } from "react-icons/fi";
import { UserPen, Users } from "lucide-react";
import { useHomeContext } from "@/context/Home.context";

const ResponsiveBar = () => {
  const { user } = useHomeContext();
  //   const [data, setData] = useState([]);
  const openNav = () => {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
      sidenav.style.width = "250px";
    }
  };

  const closeNav = () => {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
      sidenav.style.width = "0";
    }
  };

  return (
    <>
      <div id="mySidenav" className="sidenav block lg:hidden">
        <a className="closebtn cursor-pointer" onClick={closeNav}>
          &times;
        </a>
        <div className="flex flex-col  space-y-4">
          {user?._id && (
            <>
              <Link
                href="/"
                className="!flex items-center text-gray-600 hover:text-emerald-600 transition"
              >
                <FiHome className="mr-2" size={18} />
                <span>Home</span>
              </Link>
              <Link
                href={`/profile/${user._id}`}
                className="!flex items-center text-gray-600 hover:text-emerald-600 transition"
              >
                <UserPen className="mr-2" size={18} />
                <span>Profile</span>
              </Link>
              <Link
                href={`/all-users`}
                className="!flex items-center text-gray-600 hover:text-emerald-600 transition"
              >
                <Users className="mr-2" size={18} />
                <span>All User</span>
              </Link>

              <Link
                href={`/contact-us`}
                className="!flex items-center text-gray-600 hover:text-emerald-600 transition"
              >
                <FiSearch className="mr-2" size={18} />
                <span>Contact Us</span>
              </Link>

              <Link
                href={`/about-us`}
                className="!flex items-center text-gray-600 hover:text-emerald-600 transition"
              >
                <FiInfo className="mr-2" size={18} />
                <span>About Us</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <button onClick={openNav} className="cursor-pointer px-3">
        <GiHamburgerMenu className="flex lg:hidden" />
      </button>
    </>
  );
};

export default ResponsiveBar;
