import Table from "@/app/_components/shared/Table/Table";
import { TTableHeader } from "@/type";
import Link from "next/link";
import React from "react";

const RecipeList = () => {
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
  return (
    <>
      <div>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold">Recipe List</h1>
          <Link href="/dashboard/admin/recipe/add" className="bg-blue-500 text-white p-2 rounded-md">
            Add Recipe
          </Link>
        </div>
        <div className="w-full flex justify-end pb-4"></div>
        <Table data={tableHeadings}>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td></td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default RecipeList;
