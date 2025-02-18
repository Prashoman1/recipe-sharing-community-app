/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useHomeContext } from "@/context/Home.context";
import Image from "next/image";
// import { FaVideo, FaRegSmile } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import CreateRecipeModal from "../CreateRecipe/CreateRecipe";
import { useRef, useState } from "react";
import { modelOpen } from "@/helpers";

const CreatePostBox = () => {
  const { user } = useHomeContext();
  const createRecipeRef = useRef(null);
  const [state, setState] = useState<any>(false);

  const handleModelClick = () => {
    modelOpen(createRecipeRef);
    setState(!state);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        {/* Top Section: User Avatar & Input */}
        <div className="flex items-center gap-3">
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
          <div
            className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none text-gray-600 cursor-pointer"
            onClick={handleModelClick}
          >
            {`What's on your mind, ${user?.userName ?? "user"}?`}
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
          <button
            onClick={handleModelClick}
            className="flex items-center gap-2 text-green-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-md"
          >
            <MdPhotoLibrary className="text-xl" />
            Photo/Video
          </button>
          {/* <button className="flex items-center gap-2 text-yellow-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-md">
          <FaRegSmile className="text-xl" />
          Feeling/Activity
        </button> */}
        </div>
      </div>

      <CreateRecipeModal modalRef={createRecipeRef} stateProps={state} />
    </>
  );
};

export default CreatePostBox;
