/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllPublicRecipes } from "@/services/RecipeApi";
import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../RecipeCardSkeleton/RecipeCardSkeleton";
import { FiSearch } from "react-icons/fi";
import useDebounce from "@/hooks/debouces.hook";

const RecipeSection = ({ myLikes }: { myLikes: any }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();

  const searchTerm = useDebounce(search);

  const fetchRecipes = async () => {
    const query = {
      page,
      limit,
      searchTerm,
    };
    const response = await getAllPublicRecipes(query);
    setRecipes(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchRecipes();
  }, [refetch, searchTerm]);

  // console.log(recipes);

  return (
    <div className="px-14">
      <div className="flex items-center justify-center py-2 mt-8 sm:px-9 lg:px-1">
        <div className="relative w-11/12 lg:w-1/3">
          <input
            type="text"
            placeholder="Search recipes..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <FiSearch
            className="absolute top-2 right-3 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  lg:mt-16">
        {loading && <RecipeCardSkeleton />}
        {recipes?.map((recipe: any) => {
          const isLiked = myLikes?.find(
            (like: any) => like.recipe === recipe._id
          );

          return (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              refetch={refetch}
              setRefetch={setRefetch}
              isLiked={isLiked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecipeSection;
