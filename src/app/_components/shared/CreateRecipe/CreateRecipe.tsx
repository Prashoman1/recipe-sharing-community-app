/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Modal from "../Modal/Modal";
import { useEffect, useRef, useState } from "react";
import { useHomeContext } from "@/context/Home.context";

import { useCreateRecipe } from "@/hooks/useRecipe.hook";
import { toast } from "react-toastify";
import { imageUploadImageBB } from "@/services/imageUpload";
import { getAllCategory } from "@/services/CategoryApi";
import { modelClose } from "@/helpers";
import UserApiLoading from "../Loading/Loading";


interface CreateRecipeModalProps {
  modalRef: any;
  stateProps: any;
}

const CreateRecipeModal = ({
  modalRef,
  stateProps,
}: CreateRecipeModalProps) => {
  const formModelRef = useRef(null);

  const { user } = useHomeContext();
  const [category, setCategories] = useState<any[]>([]);
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    mutate: createRecipePost,
    isPending,
    isSuccess,
    data,
  } = useCreateRecipe();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "" as string | File,
    ingredients: [] as string[],
    cookingTime: "",
    category: "",
    tags: [] as string[],
    premium: false,
  });

  const [ingredientsList, setIngredientsList] = useState<string[]>(["1"]);
  const [tagsList, setTagsList] = useState<string[]>(["1"]);

  const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let uploadImage: any = "";
    if (!form.title || !form.description || !form.category) {
      toast.warning("Please fill all the fields");
      return;
    }
    if (form.image) {
      const payload = new FormData();
      payload.append("image", form.image);
      setLoading(true);
      const updateImage: any = await imageUploadImageBB(payload);
      uploadImage = updateImage as string;
    }
    const insertValue = {
      ...form,
      isPremium: form.premium,
      cookingTime: Number(form.cookingTime),
      image: uploadImage,
    };
    console.log({ insertValue });
    setLoading(false);
    createRecipePost(insertValue);
  };

  const fetchCategories = async () => {
    const response = await getAllCategory();
    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, [stateProps]);

  useEffect(() => {
    if (isSuccess && data) {
      setForm({
        title: "",
        description: "",
        image: "" as string | File,
        ingredients: [] as string[],
        cookingTime: "",
        category: "",
        tags: [] as string[],
        premium: false,
      });
      if (modalRef.current) {
        modelClose(modalRef);
      }
     setIngredientsList(["1"]);
     setTagsList(["1"]);

      // router.push("/");
    }
  }, [isSuccess, data]);

  console.log({ category });
  return (
    <>
      <Modal modalRef={modalRef} formRef={formModelRef}>
        {(isPending || loading) && <UserApiLoading />}
        <form
          className="max-w-3xl mx-auto px-2 lg:p-6 bg-white  space-y-4"
          onSubmit={handleRecipeSubmit}
          ref={formModelRef}
        >
          <h2 className="text-2xl font-bold">Create a Recipe</h2>

          {/* Title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter recipe title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => {
                setForm({
                  ...form,
                  description: e.target.value,
                });
              }}
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter recipe description"
              rows={4}
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium">Image</label>
            <input
              type="file"
              onChange={(e) => {
                setForm({
                  ...form,
                  image: e.target.files ? e.target.files[0] : "",
                });
              }}
              className="w-full border rounded p-2 mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium">Category</label>
            <select
              value={form.category}
              onChange={(e) => {
                setForm({
                  ...form,
                  category: e.target.value,
                });
              }}
              className="w-full border rounded p-2 mt-1"
              required
            >
              <option value="">Select a category</option>
              {category.map((item) => (
                <option key={item?._ie} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block font-medium">Ingredients</label>
              <button
                type="button"
                onClick={() => {
                  setIngredientsList([...ingredientsList, "1"]);
                  setForm({
                    ...form,
                    ingredients: [...form.ingredients, ""],
                  });
                }}
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
              >
                Add
              </button>
            </div>

            <ul className="mt-2 space-y-1">
              {ingredientsList.map((_, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-1"
                >
                  <input
                    type="text"
                    value={form.ingredients[index] || ""}
                    onChange={(e) => {
                      const newIngredients = [...form.ingredients];
                      newIngredients[index] = e.target.value;
                      setForm({
                        ...form,
                        ingredients: newIngredients,
                      });
                    }}
                    className="flex-1 border rounded p-2 mt-1"
                    placeholder="Enter an ingredient"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIngredientsList(
                        ingredientsList.filter((_, i) => i !== index)
                      );
                      setForm({
                        ...form,
                        ingredients: form.ingredients.filter(
                          (_, i) => i !== index
                        ),
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

          {/* Tags */}
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

          {/* Cooking Time */}
          <div>
            <label className="block font-medium">Cooking Time (minutes)</label>
            <input
              type="text"
              value={form.cookingTime}
              onChange={(e) => {
                setForm({
                  ...form,
                  cookingTime: e.target.value,
                });
              }}
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter cooking time in minutes"
              required
            />
          </div>

          {/* Premium */}
          <div>
            <label className="block font-medium">Premium</label>
            <select
              value={form.premium ? "true" : "false"}
              onChange={(e) => {
                setForm({
                  ...form,
                  premium: e.target.value === "true",
                });
              }}
              className="w-full border rounded p-2 mt-1"
              required
            >
              <option value="false">Free</option>
              {user?.role === "admin" && <option value="true">Premium</option>}
            </select>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading || isPending}
            type="submit"
            className={`w-full px-4 py-2 rounded font-bold ${
              loading || isPending ? "bg-gray-400" : "bg-green-500"
            } text-white`}
          >
            {loading || isPending ? "Loading..." : "Submit Recipe"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateRecipeModal;
