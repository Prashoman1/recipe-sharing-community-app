/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createTags } from "@/services/tagsApi";
import Modal from "../Modal/Modal";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { modelClose } from "@/helpers";

interface addTagsProps {
  modalRef: any;
  categories: any;
}

const AddTagModal = ({ modalRef, categories }: addTagsProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [tagsList, setTagsList] = useState<string[]>(["1"]);
  const [form, setForm] = useState({
    category: "",
    tags: [] as string[],
  });

  const handleTagSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    try {
      const data = {
        category: form.category,
        tagName: form.tags,
      };
      const res = await createTags(data);
      if (res?.success) {
        toast.success(res?.message);
        setForm({ category: "", tags: [] });
        setTagsList(["1"]);
        if (modalRef?.current) {
          modelClose(modalRef, formRef);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleCategorySubmit = async (data: FieldValues) => {
  //     const { categoryName, description } = data;
  //     try {
  //       const categoryData = {
  //         categoryName,
  //         categoryDescription: description,
  //       };
  //       console.log(categoryData);
  //       const res = await createCategory(categoryData);
  //       if (res?.success) {
  //         toast.success(res?.message);
  //         reset();

  //         if (modalRef?.current) {
  //           modelClose(modalRef, formRef);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <Modal
        modalRef={modalRef}
        formRef={formRef}
        formEmpty={() => setForm({ category: "", tags: [] })}
      >
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Category</h2>
          <form onSubmit={handleTagSubmit} className="space-y-4" ref={formRef}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories?.map((item: any, index: number) => (
                  <option key={index} value={item._id}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>

         
            <div>
              <div className="flex items-center justify-between">
                <label className="block font-medium">Tags</label>
                <button
                  type="button"
                  onClick={() => {
                    setTagsList([...tagsList, "1"]);
                    setForm({
                      ...form,
                      tags: [...form.tags, ""],
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
                      value={form.tags[index] || ""}
                      onChange={(e) => {
                        const newTags = [...form.tags];
                        newTags[index] = e.target.value;
                        setForm({
                          ...form,
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
                        setForm({
                          ...form,
                          tags: form.tags.filter((_, i) => i !== index),
                        });
                      }}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add Tag
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddTagModal;
