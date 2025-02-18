/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TTableHeader } from "@/type";
import React, { useEffect, useState } from "react";
import TableSkeleton from "../Skeleton/Skeleton";
import Table from "../Table/Table";
import { getTopLatestRecipes } from "@/services/RecipeApi";
import Image from "next/image";
import { dateTimeFormat } from "@/helpers";
import Link from "next/link";
// import Image from "next/image";

const LatestRecipes = () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const tableHeadings: TTableHeader[] = [
    { title: "SI", key: "si" },
    { title: "Title", key: "title" },
    { title: "userName", key: "userName" },
    { title: "Image", key: "image" },
    { title: "Category", key: "category" },
    { title: "CookingTime", key: "cookingTime" },
    { title: "CreatedAt", key: "createdAt" },
    { title: "Options", key: "options" },
  ];

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await getTopLatestRecipes();

      setRecipes(recipes?.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  console.log({ recipes });

  return (
    <>
      <div className="w-full overflow-x-auto">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <TableSkeleton key={index} />
          ))
        ) : (
          <Table data={tableHeadings}>
            {/* <tr>data</tr> */}
            {recipes?.map((recipe: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{recipe?.title}</td>
                <td>{recipe?.user?.userName}</td>
                <td>
                  <Image
                    src={recipe?.image}
                    width={40}
                    height={40}
                    alt={recipe.title}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td>{recipe?.category?.categoryName || ""}</td>

                <td>{recipe?.cookingTime}</td>

                <td>{dateTimeFormat(recipe?.createdAt)}</td>
                <td>
                  <Link href={`/recipe/${recipe?._id}`}>
                    <button className="bg-blue-500 text-white p-2 rounded-2xl shadow-lg flex items-center justify-between hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </>
  );
};

export default LatestRecipes;
