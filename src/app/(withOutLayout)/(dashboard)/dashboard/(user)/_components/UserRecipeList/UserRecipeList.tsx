/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TableSkeleton from "@/app/_components/shared/Skeleton/Skeleton";
import Table from "@/app/_components/shared/Table/Table";
import { deleteRecipeApi, getRecipesByUser } from "@/services/RecipeApi";
import { TTableHeader } from "@/type";
import { handleDelete } from "@/utils/handleDelete";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableHeadings: TTableHeader[] = [
    { title: "SI", key: "si" },
    { title: "Title", key: "title" },
    { title: "Image", key: "image" },
    { title: "Category", key: "category" },
    { title: "Status", key: "status" },
    { title: "CookingTime", key: "cookingTime" },
    { title: "IsPremium", key: "premium" },
    { title: "Options", key: "options" },
  ];
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await getRecipesByUser();
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

  const deleteRecipe = async (id: string) => {
    const res = await handleDelete(id, deleteRecipeApi);
    if (res) {
      fetchRecipes();
    }
  };

  // console.log(recipes);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold">Recipe List</h1>
          <Link
            href="/Dashboard/user/recipe/add"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add Recipe
          </Link>
        </div>
        <div className="w-full overflow-x-auto">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <TableSkeleton key={index} />
            ))
          ) : (
            <Table data={tableHeadings}>
              {recipes?.length > 0 ? (
                recipes.map((recipe: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{recipe.title}</td>
                    <td>
                      <Image
                        src={recipe?.image}
                        width={40}
                        height={40}
                        alt={recipe.title}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </td>
                    <td>{recipe.category}</td>
                    <td>
                      <span
                        className={`${
                          recipe.isPublished ? "bg-green-700" : "bg-gray-600"
                        } text-white p-2 rounded-md`}
                      >
                        {recipe.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td>{recipe.cookingTime}</td>
                    <td>{recipe.isPremium ? "Premium" : "Free"}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/user/recipe/edit/${recipe._id}`}
                          className="bg-blue-500 text-white p-2 rounded-md"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/recipe/${recipe._id}`}
                          className="bg-green-500 text-white p-2 rounded-md"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => deleteRecipe(recipe._id)}
                          className="bg-red-500 text-white p-2 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10}>No data found</td>
                </tr>
              )}
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserRecipeList;
