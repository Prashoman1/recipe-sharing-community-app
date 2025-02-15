/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { updateCategory } from "@/services/CategoryApi";
import { modelClose } from "@/helpers";
import { toast } from "react-toastify";

interface updateCategoryModalProps {
  modalRef: any;
  updateSingleCategory: any;
}

const UpdateCategoryModal = ({
  modalRef,
  updateSingleCategory,
}: updateCategoryModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState<any>({
    categoryName: updateSingleCategory?.categoryName || "",
    description: updateSingleCategory?.categoryDescription || "",
  });

useEffect(() => {
    setFormValues({
        categoryName: updateSingleCategory?.categoryName || "",
        description: updateSingleCategory?.categoryDescription || "",
    });
}, [updateSingleCategory]);

  
  const handleCategoryUpdateSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const data = {
        categoryName: formValues.categoryName,
        categoryDescription: formValues.description,
      };
      const res = await updateCategory(updateSingleCategory._id, data);
      if (res?.success) {
        toast.success(res?.message);
        if (modalRef?.current) {
          modelClose(modalRef, formRef);
        }
      } else {
        toast.error("Failed to update the category.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Update Category</h2>
          <form
            onSubmit={handleCategoryUpdateSubmit}
            className="space-y-4"
            ref={formRef}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                value={formValues.categoryName}
                onChange={(e) =>
                  setFormValues({ ...formValues, categoryName: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              />
            </div>
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

export default UpdateCategoryModal;
