/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { currentUser } from "@/services/AuthApi";
import { createLikeByRecipe, deleteLikeByRecipe } from "@/services/likeApi";
import { ThumbsUp, MessageSquare, CheckCircle, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type TRecipeProps = {
  recipe: any;
  refetch: any;
  setRefetch: any;
  isLiked: any;
  user:any
};

const RecipeCard = ({ recipe, refetch, setRefetch, isLiked,user }: TRecipeProps) => {
  const router = useRouter();

  const handleClickLike = async (id: string) => {
    if (id) {
      const user = await currentUser();
      if (!user) {
        toast.warning("You need to login to like a post");
        return router.push("/login");
      }
      const response = await createLikeByRecipe({ recipeId: id });
      if (response?.success) {
        setRefetch(!refetch);
      }
    }
  };

  const handleDislike = async (id: string) => {
    if (id) {
      const user = await currentUser();
      if (!user) {
        toast.warning("You need to login to like a post");
        return router.push("/login");
      }
      const response = await deleteLikeByRecipe(id);
      if (response?.success) {
        setRefetch(!refetch);
      }
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (menuRef.current && !menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      {/* Author Info */}
      <div className="flex items-center justify-between gap-3 mb-3 relative">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <Image
          src={user?.
            profileImage
            || "https://i.ibb.co.com/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"}
          alt={user?.userName || "User"}
          width={40}
          height={40}
          className="rounded-full w-10 h-10 object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{user?.userName}</span>
            {user?.isVerified && <CheckCircle className="text-blue-500 w-4 h-4" />}
          </div>
          <span className="text-sm text-gray-500">{recipe?.createdAt}</span>
        </div>
      </div>

      {/* Three-dot menu */}
      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 z-40 mt-2 w-40 bg-white border rounded-lg shadow-md p-2">
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">View Profile</button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Follow</button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Report</button>
          </div>
        )}
      </div>
    </div>
    <div>
      <h1>{recipe?.title}</h1>
    </div>

      {/* Recipe Image */}
      <div className="relative">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={500}
          height={300}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Post Description */}
      <div className="mt-3">
        <p className="text-gray-700 text-sm line-clamp-3">{recipe.description}</p>
      </div>

      {/* Actions (Like & Comment) */}
      <div className="flex items-center justify-between mt-3 text-gray-600">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <span
            onClick={() =>
              isLiked ? handleDislike(recipe._id) : handleClickLike(recipe._id)
            }
            className="cursor-pointer flex items-center gap-1 hover:text-blue-500"
          >
            <ThumbsUp className={`${isLiked ? "text-blue-500" : ""}`} />
            {recipe.likes}
          </span>

          {/* Comment Button */}
          <Link href={`/recipe/${recipe._id}`} className="flex items-center gap-1 hover:text-green-500">
            <MessageSquare />
            {recipe.comments || 0}
          </Link>
        </div>

        {/* View Full Post */}
        <Link href={`/recipe/${recipe._id}`} className="text-green-600 text-sm font-semibold">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
