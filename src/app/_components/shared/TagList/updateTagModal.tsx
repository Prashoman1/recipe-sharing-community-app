/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
// import {  useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";


interface updateTagModalProps {
  modalRef: any;
  updateSingleTag?: any;
  categories: any;
}

const UpdateTagModal = ({
  modalRef,
  updateSingleTag,
  categories,
}: updateTagModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [tagsList, setTagsList] = useState<string[]>(["1"]);

  const [formValues, setFormValues] = useState<any>({
    category: updateSingleTag?.category?._id || "",
    tagName: updateSingleTag?.tagName || "",
  });

  useEffect(() => {
    setFormValues({
      category: updateSingleTag?.category?._id || "",
      tagName: updateSingleTag?.tagName || "",
    });
    setTagsList(updateSingleTag?.tagName?.length);
  }, [updateSingleTag]);

  //   const [formValues, setFormValues] = useState<any>({
  //     categoryName: updateSingleTag?.categoryName || "",
  //     description: updateSingleTag?.categoryDescription || "",
  //   });

  // useEffect(() => {
  //     setFormValues({
  //         categoryName: updateSingleTag?.categoryName || "",
  //         description: updateSingleTag?.categoryDescription || "",
  //     });
  // }, [updateSingleTag]);

  //   const handleCategoryUpdateSubmit = async (e: any) => {
  //     e.preventDefault();

  //     try {
  //       const data = {
  //         categoryName: formValues.categoryName,
  //         categoryDescription: formValues.description,
  //       };
  //       const res = await updateCategory(updateSingleCategory._id, data);
  //       if (res?.success) {
  //         toast.success(res?.message);
  //         if (modalRef?.current) {
  //           modelClose(modalRef, formRef);
  //         }
  //       } else {
  //         toast.error("Failed to update the category.");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Update Category</h2>
          <form
            // onSubmit={handleCategoryUpdateSubmit}
            className="space-y-4"
            // ref={formRef}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Category
              </label>

              <select
                value={formValues.category}
                onChange={(e) => {
                    setFormValues({
                        ...formValues,
                        category: e.target.value,
                    });
                }}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories?.map((item: any, index: number) => (
                  <option
                    key={index}
                    value={item._id}
                    selected={item._id === updateSingleTag?.category?._id}
                  >
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <div className="flex items-center justify-between">
                <label className="block font-medium">Tags</label>
                <button
                  type="button"
                  onClick={() => {
                    setTagsList([...tagsList, "1"]);
                    setFormValues({
                      ...formValues,
                      tagName: [...formValues.tagName, ""],
                    });
                }}
                  className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                >
                  Add
                </button>
              </div>

              <ul className="mt-2 space-y-1">
                {tagsList.map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-2"
                  >
                    <input
                      type="text"
                        value={formValues.tags[index] || ""}
                        onChange={(e) => {
                            const newTags = [...formValues.tags];
                            newTags[index] = e.target.value;
                            setFormValues({
                                ...formValues,
                                tags: newTags,
                            });
                        }}
                      className="flex-1 border rounded p-2 mt-1"
                      placeholder="Enter a tag"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setTagsList(tagsList.filter((_, i) => i !== index));
                        const newTags = formValues.tags.filter((_:any, i:any) => i !== index);
                        setFormValues({
                            ...formValues,
                            tags: newTags,
                        });
                      }}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div> */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UpdateTagModal;
