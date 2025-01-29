/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllPublicRecipes } from "@/services/RecipeApi";
import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../RecipeCardSkeleton/RecipeCardSkeleton";

const RecipeSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    const response = await getAllPublicRecipes();
    setRecipes(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  console.log(recipes);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {loading && <RecipeCardSkeleton />}
        {recipes.map((recipe: any) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeSection;
