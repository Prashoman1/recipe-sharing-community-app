/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TableSkeleton from "@/app/_components/shared/Skeleton/Skeleton";
import Table from "@/app/_components/shared/Table/Table";
import {
  deleteRecipeApi,
  getRecipesByAdmin,
  RecipePublicUnPublishAPi,
} from "@/services/RecipeApi";
import { TTableHeader } from "@/type";
import { handleDelete } from "@/utils/handleDelete";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import useDebounce from "@/hooks/debouces.hook";
import CreateRecipeModal from "@/app/_components/shared/CreateRecipe/CreateRecipe";
import { modelOpen } from "@/helpers";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [showPage, setShowPage] = useState(1);
  const [searchRecipe, setSearchRecipe] = useState("");
  const createRecipeRef = useRef(null);
  const [fetchCategories, setFetchCategories] = useState(false);
  
  const searchTerm=useDebounce(searchRecipe);

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
      const query = {
        page,
        limit,
        searchTerm
      };
      console.log({query});
      
      setLoading(true);
      const recipes = await getRecipesByAdmin(query);
      const { meta } = recipes?.data;
      setRecipes(recipes?.data?.result);
      setTotalPages(meta.total);
      setShowPage(meta.totalPage);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, [page, searchTerm]);

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
  };
  // console.log({ recipes });

  return (
    <>
      <div className="w-full px-4 py-10">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold">Recipe List</h1>
          <button
            onClick={()=>{
              modelOpen(createRecipeRef);
              setFetchCategories(!fetchCategories);
            }}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add Recipe
          </button>
        </div>
        <div className="w-1/3 py-2">
          <input
            type="text"
            onChange={(e) => setSearchRecipe(e.target.value)}
            placeholder="Search Recipe by title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
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
                      onClick={() => UpdateRecipePublishStatus(recipe?._id)}
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
                    <div className="flex items-center gap-2">
                      {/* <Link
                        href={`/dashboard/admin/recipe/edit/${recipe._id}`}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </Link> */}
                      <Link
                        href={`/recipe/${recipe._id}`}
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
          
          <Pagination
            page={page}
            setPage={setPage}
            showPage={showPage}
          />
        </div>
      </div>

      <CreateRecipeModal modalRef={createRecipeRef} stateProps={fetchCategories} />
    </>
  );
};

export default RecipeList;
