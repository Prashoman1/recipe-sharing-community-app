/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllPublicRecipes } from "@/services/RecipeApi";
import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../RecipeCardSkeleton/RecipeCardSkeleton";

const RecipeSection = ({myLikes}:{myLikes:any}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  // console.log({myLikes});
  

  const fetchRecipes = async () => {
    const response = await getAllPublicRecipes();
    setRecipes(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchRecipes();
  }, [refetch]);

  console.log(recipes);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {loading && <RecipeCardSkeleton />}
        {recipes?.map((recipe: any) => {
          const isLiked = myLikes?.find((like: any) => like.recipe === recipe._id);
          
          return (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              refetch={refetch}
              setRefetch={setRefetch}
              isLiked={isLiked}
            />
          );
        }

          
        )}
      </div>
    </div>
  );
};

export default RecipeSection;
