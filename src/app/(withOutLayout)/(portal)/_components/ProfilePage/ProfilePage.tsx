"use client"

import Image from "next/image";

// import { useState } from "react";
// import Image from "next/image";
// import { CheckCircle, UserPlus } from "lucide-react";

const ProfilePage = () => {
//   const [isFollowing, setIsFollowing] = useState(false);

//   const handleFollow = () => {
//     setIsFollowing(!isFollowing);
//   };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Cover Photo */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <Image
          src="https://i.ibb.co.com/7NZfXz1H/6372695.jpg"
          alt="Profile"
          width={100}
          height={100}
          className="absolute left-4 bottom-[-30px] w-24 h-24 rounded-full border-4 border-white"
        />
      </div>
      {/* Profile Info */}
      <div className="p-4 text-center mt-8">
        <h2 className="text-xl font-semibold text-gray-800">
            {/* {user.userName} */}
            Badhon
            </h2>
        <p className="text-gray-500">
            {/* {user.bio || "No bio available."} */}
            No bio available
            </p>
        <p className="text-sm text-gray-400">
            {/* {user.address} */}
            add
            </p>
        <span className="inline-block mt-2 px-4 py-1 text-sm text-white bg-blue-500 rounded-full">
          {/* {user.memberShip.toUpperCase()} Member */}
          test
        </span>
      </div>
      {/* Follow Button */}
      <div className="flex justify-center my-4">
        {/* <button
        //   onClick={handleFollow}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-lg transition-all duration-300 
            ${isFollowing ? "bg-gray-300 text-gray-700" : "bg-blue-500 text-white"}`}
        >
          {isFollowing ? (
            <>
              <CheckCircle size={16} /> Following
            </>
          ) : (
            <>
              <UserPlus size={16} /> Follow
            </>
          )}
        </button> */}
      </div>
    </div>
  );
};

export default ProfilePage;