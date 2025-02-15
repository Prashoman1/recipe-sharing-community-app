/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TTableHeader } from "@/type";
import React, { useRef, useState } from "react";
import Table from "../Table/Table";
import AddCategory from "./AddCategoryModal";
import { modelOpen } from "@/helpers";

import { handleDelete } from "@/utils/handleDelete";
import { deleteCategoryApi } from "@/services/CategoryApi";
import UpdateCategoryModal from "./UpdateCategoryModal";

type CategoryListProps = {
  categories: any;
};

const CategoryList = ({ categories }: CategoryListProps) => {
  const addCategoryRef = useRef(null);
  const updateCategoryRef = useRef(null);
  const [updateSingleCategory, setUpdateSingleCategory] = useState<any>({});
  const tableHeadings: TTableHeader[] = [
    { title: "SI", key: "si" },
    { title: "CategoryName", key: "title" },
    { title: "Description", key: "image" },
    { title: "Options", key: "options" },
  ];

  const handleAddCategory = () => {
    modelOpen(addCategoryRef);
  };

  const deleteCategory = async (id: string) => {
    if (id) {
      await handleDelete(id, deleteCategoryApi);
    }
  };

  const updateCategory = (id: string) => {
    if(id){
      console.log(id);
      
      setUpdateSingleCategory(categories.find((item: any) => item._id === id));
      modelOpen(updateCategoryRef);
    }
  };
  // console.log(updateSingleCategory);
  
  return (
    <>
      <div className="py-10 px-4">
        <div className="w-full">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-semibold">Category List</h1>
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Add Category
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <Table data={tableHeadings}>
              {categories?.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.categoryName}</td>

                  <td>{item?.categoryDescription}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <button
                       onClick={() => updateCategory(item._id)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </button>
                      
                      <button
                        onClick={() => deleteCategory(item._id)}
                        className="bg-red-500 text-white p-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>
      <AddCategory modalRef={addCategoryRef} />
      <UpdateCategoryModal modalRef={updateCategoryRef} updateSingleCategory={updateSingleCategory} />
    </>
  );
};

export default CategoryList;
