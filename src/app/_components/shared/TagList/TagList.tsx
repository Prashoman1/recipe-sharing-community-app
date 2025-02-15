/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TTableHeader } from "@/type";

import Table from "../Table/Table";
import AddTagModal from "./AddTagModal";
import { useRef, useState } from "react";
import { modelOpen } from "@/helpers";
import { handleDelete } from "@/utils/handleDelete";
import { deleteTagsApi } from "@/services/tagsApi";
import UpdateTagModal from "./updateTagModal";

interface tagProps {
  tags: any;
  categories: any;
}

const TagList = ({ tags, categories }: tagProps) => {
  const addTagRef = useRef(null);
  const updateTagRef = useRef(null);
  const [updateSingleTag, setUpdateSingleTag] = useState<any>({});
  const tableHeadings: TTableHeader[] = [
    { title: "SI", key: "si" },
    { title: "CategoryName", key: "title" },
    { title: "Tags", key: "image" },
    { title: "Options", key: "options" },
  ];

  const handleAddTag = () => {
    modelOpen(addTagRef);
  };

  const deleteTag = async (id: string) => {
    if (id) {
      await handleDelete(id, deleteTagsApi);
    }
  };

  const updateTag = (id: string) => {
    if (id) {
      
      setUpdateSingleTag(tags.find((item: any) => item._id === id));
      modelOpen(updateTagRef);
    }
  };
  // console.log(updateSingleCategory);

  return (
    <>
      <div className="py-10 px-4">
        <div className="w-full">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-semibold">Tag List</h1>
            <button
              onClick={handleAddTag}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Add Tag
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <Table data={tableHeadings}>
              {tags?.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.category?.categoryName}</td>

                  <td>
                    {item?.tagName?.map((tag: any, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTag(item._id)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTag(item._id)}
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
      <AddTagModal modalRef={addTagRef} categories={categories} />
      <UpdateTagModal
        modalRef={updateTagRef}
        updateSingleTag={updateSingleTag}
        categories={categories}
      />
    </>
  );
};

export default TagList;
