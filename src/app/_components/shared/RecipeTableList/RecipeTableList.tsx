/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TableSkeleton from '../Skeleton/Skeleton';
import { TTableHeader } from '@/type';
import Table from '../Table/Table';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/app/(withOutLayout)/(dashboard)/_components/Pagination/Pagination';

type RecipeTableListProps = {
    recipes: any;
    loading: any;
    page: any;
    setPage: any;
    showPage: any;
    limit: any;
    deleteRecipe: any;
    UpdateRecipePublishStatus: any;
};

const RecipeTableList = ({
    recipes,
    loading, 
    page,
    setPage,
    showPage,
    limit,
    deleteRecipe,
    UpdateRecipePublishStatus

}:RecipeTableListProps) => {


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

    return (
        <>
           <div className="w-full px-4 py-10">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold">Recipe List</h1>
          
        </div>
        <div className="w-1/3 py-2">
          <input
            type="text"
            // onChange={(e) => setSearchRecipe(e.target.value)}
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
                  <td>{ ((page-1)*limit) + index+1 }</td>
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
                  <td>{recipe.category?.categoryName || ""}</td>
                  <td>
                    <button
                      onClick={() => 
                        UpdateRecipePublishStatus(recipe?._id)
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
        </>
    );
};

export default RecipeTableList;