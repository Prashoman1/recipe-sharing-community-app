/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllPublicRecipes } from "@/services/RecipeApi";
import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../RecipeCardSkeleton/RecipeCardSkeleton";
import { FiSearch } from "react-icons/fi";
import useDebounce from "@/hooks/debouces.hook";
// import HomeSideBar from "@/components/ui/Home/Sidebar/sidebar";
import TrendingRecipes from "@/app/_components/shared/Tending/Tending";
import CreatePostBox from "@/app/_components/shared/CreateRecipeByAny/CreateRecipe";
import { useHomeContext } from "@/context/Home.context";
import TopUserList from "@/app/_components/shared/TopUserList/TopUserList";

const RecipeSection = ({ myLikes }: { myLikes: any }) => {
  const {user} = useHomeContext();
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

  console.log(recipes);

  return (
    <div className="flex">
      {/* Middle Section (Posts) */}
      <div className="w-full md:w-1/2 lg:w-[65%] px-4">
        <CreatePostBox />
        {/* Post Feed */}
        <div className="mt-6 space-y-6">
          {loading && <RecipeCardSkeleton />}
          {recipes?.map((recipe: any) => {
            const isLiked = recipe?.userLiked?.find(
              (like: any) => like === user?._id
            );
            return (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                refetch={refetch}
                setRefetch={setRefetch}
                isLiked={isLiked}
                user={recipe?.user}
              />
            );
          })}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/4 lg:w-[35%] p-4 border-l ">
        <div className="sticky top-[15%]">
          <div className="max-h-[calc(100vh-50vh)] group overflow-hidden hover:overflow-y-auto transition-all duration-300 pb-5 custom-scrollbar">
            <TrendingRecipes />
          </div>
          <div className="max-h-[calc(100vh-70vh)] top-[20%] group overflow-hidden hover:overflow-y-auto transition-all duration-300 pb-5 custom-scrollbar mt-5">
            <TopUserList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSection;
