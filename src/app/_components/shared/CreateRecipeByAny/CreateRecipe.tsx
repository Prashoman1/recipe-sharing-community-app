"use client";

import { useHomeContext } from "@/context/Home.context";
import Image from "next/image";
// import { FaVideo, FaRegSmile } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";

const CreatePostBox = () => {
     const { user } = useHomeContext();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      {/* Top Section: User Avatar & Input */}
      <div className="flex items-center gap-3">
        <Image
          src={user?.profileImage} // Replace with actual user image
          alt="User Avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none text-gray-600 cursor-pointer"
          onClick={() => console.log("Input field clicked")}
        >
          {`What's on your mind, ${user?.userName}?`}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-3" />

      {/* Bottom Section: Action Buttons */}
      <div className="flex justify-center items-center gap-3">
        {/* <button className="flex items-center gap-2 text-red-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-md">
          <FaVideo className="text-xl" />
          Live Video
        </button> */}
        <button className="flex items-center gap-2 text-green-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-md">
          <MdPhotoLibrary className="text-xl" />
          Photo/Video
        </button>
        {/* <button className="flex items-center gap-2 text-yellow-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-md">
          <FaRegSmile className="text-xl" />
          Feeling/Activity
        </button> */}
      </div>
    </div>
  );
};

export default CreatePostBox;
