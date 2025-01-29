/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { currentUser } from "@/services/AuthApi";
import { createLikeByRecipe, deleteLikeByRecipe } from "@/services/likeApi";
import { ArrowRight, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

type TRecipeProps = {
  recipe: any;
  key: any;
  refetch: any;
  setRefetch: any;
  isLiked: any;
};

const RecipeCard = ({ recipe, refetch, setRefetch, isLiked }: TRecipeProps) => {
  // Check if the recipe is premium and if the user has access
  const router = useRouter();

  const handleClickLike = async (id: string) => {
    if (id) {
      const user = await currentUser();
      if (!user) {
        toast.warning("You need to login to like a recipe");
        return router.push("/login");
      }
      const response = await createLikeByRecipe({ recipeId: id });
      // console.log({response});
      if (response?.success) {
        setRefetch(!refetch);
      }
    }
  };

  const handleDislike = async (id: string) => {
    if (id) {
      const user = await currentUser();
      if (!user) {
        toast.warning("You need to login to like a recipe");
        return router.push("/login");
      }
      const response = await deleteLikeByRecipe(id);
      // console.log({response});
      if (response?.success) {
        setRefetch(!refetch);
      }
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Recipe Image */}
      <div className="relative">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        {recipe.isPremium && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold">Premium Content</span>
          </div>
        )}
      </div>

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{recipe.title}</h3>

        {/* Rating */}
        <div className="flex items-center text-yellow-500 mt-2">
          {recipe.averageRating !== null ? (
            <>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < recipe.averageRating
                      ? "fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {recipe.averageRating.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-gray-500">No ratings yet</span>
          )}
        </div>

        {/* Free or Premium Tag */}
        <div className="flex items-center justify-between mt-3">
          {isLiked ? (
            <span
              onClick={() => {
                handleDislike(recipe._id);
              }}
              className="cursor-pointer flex items-center gap-1 text-gray-600"
            >
              <ThumbsUp className="text-blue-500" />
              {recipe.likes}
            </span>
          ) : (
            <span
              onClick={() => {
                handleClickLike(recipe._id);
              }}
              className="cursor-pointer flex items-center gap-1 text-gray-600"
            >
              <ThumbsUp className="tex-blue" />
              {recipe.likes}
            </span>
          )}
          {/* <span
          onClick={()=>{
            handleClickLike(recipe._id)
          }}
           className="cursor-pointer flex items-center gap-1 text-gray-600">
            <ThumbsUp className="tex-blue" />
            {recipe.likes}
          </span> */}
          <span
            className={`px-3 py-1 text-xs rounded-md ${
              recipe.isPremium
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {recipe.isPremium ? "Premium" : "Free"}
          </span>
          <Link href={`/recipe/${recipe._id}`}>
            <ArrowRight className="text-green-600 font-bold" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
