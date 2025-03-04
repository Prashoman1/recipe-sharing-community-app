"use client"
import { getTrendingRecipes } from "@/services/RecipeApi";
import Image from "next/image";
import Link from "next/link";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState<any>([]);
  
    const fetchTrendingRecipes = async () => {
      const response = await getTrendingRecipes();
      setRecipes(response.data
      );
    }
    useEffect(() => {
      fetchTrendingRecipes();
    }, []);
  return (
    <div className="p-4 bg-white shadow-md rounded-lg ">
      <h2 className="text-xl font-semibold mb-3">🔥 Trending Recipes</h2>
      <ul className="space-y-3">
        {recipes?.map((item:any, index:number) => (
          <li key={index} className="border-b py-2 text-gray-700">
          <Link
            href={`/recipe/${item?._id}`}
            className="flex items-center space-x-2"
          >
            <Image
              src={
                item?.image ||
                "https://i.ibb.co/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
              }
              alt="User Image"
              width={30}
              height={30}
              className="w-7 h-7 rounded-full"
            />
            <p className="font-bold">{item?.title}</p>
          </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingRecipes;
