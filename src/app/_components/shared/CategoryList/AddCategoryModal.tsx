/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import { createCategory } from "@/services/CategoryApi";
import { toast } from "react-toastify";
import { modelClose } from "@/helpers";
import { useRef } from "react";

interface AddCategoryProps {
  modalRef: any;
}

const AddCategory = ({ modalRef }: AddCategoryProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const handleCategorySubmit = async (data: FieldValues) => {
    const { categoryName, description } = data;
    try {
      const categoryData = {
        categoryName,
        categoryDescription: description,
      };
      console.log(categoryData);
      const res = await createCategory(categoryData);
      if (res?.success) {
        toast.success(res?.message);
        reset();

        if (modalRef?.current) {
          modelClose(modalRef, formRef);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Category</h2>
          <form
            onSubmit={handleSubmit(handleCategorySubmit)}
            className="space-y-4"
            ref={formRef}
          >
            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                {...register("categoryName", { required: true })}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
              />
              {errors.categoryName && (
                <p className="text-red-500">Category Name is required</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add Category
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddCategory;
