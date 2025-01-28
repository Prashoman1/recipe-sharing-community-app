/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TableSkeleton from "@/app/_components/shared/Skeleton/Skeleton";
import Table from "@/app/_components/shared/Table/Table";
import { deleteRecipeApi, getRecipesByAdmin, RecipePublicUnPublishAPi } from "@/services/RecipeApi";
import { TTableHeader } from "@/type";
import { handleDelete } from "@/utils/handleDelete";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RecipeList = () => {
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
    { title: "Ingredients", key: "ingredients" },
    { title: "Tags", key: "tags" },
    { title: "Options", key: "options" },
  ];
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await getRecipesByAdmin();
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

  const UpdateRecipePublishStatus = async (id: string) => {
    
    
    const res = await RecipePublicUnPublishAPi(id);
    console.log(res);
    
    if (res?.success) {
      fetchRecipes();
      toast.success(res.message);
    }
  }

  // console.log(recipes);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold">Recipe List</h1>
          <Link
            href="/dashboard/admin/recipe/add"
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
              {recipes?.map((recipe: any, index: number) => (
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
                    <button
                      onClick={() =>
                        UpdateRecipePublishStatus(
                          recipe?._id,
                        )
                      }
                      className={`relative w-14 h-6 rounded-full transition-colors duration-300 ${
                        recipe.isPublished ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                          recipe.isPublished ? "translate-x-8" : ""
                        }`}
                      ></span>
                    </button>
                  </td>
                  <td>{recipe.cookingTime}</td>
                  <td>{recipe.isPremium ? "Premium" : "Free"}</td>
                  <td>
                    {recipe.ingredients?.map(
                      (ingredient: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <span>{ingredient}</span>
                        </div>
                      )
                    )}
                  </td>
                  <td>
                    {recipe.tags &&
                      recipe.tags.map((tag: any, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/admin/recipe/edit/${recipe._id}`}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/admin/recipe/view/${recipe._id}`}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteRecipe(recipe._id)}
                        // href={`/dashboard/admin/recipe/delete/${recipe._id}`}
                        className="bg-red-500 text-white p-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
