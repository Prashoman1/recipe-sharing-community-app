/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getSingleRecipe, updateRecipe } from "@/services/RecipeApi";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { imageUploadImageBB } from "@/services/imageUpload";
import { toast } from "react-toastify";
import UserApiLoading from "@/app/_components/shared/Loading/Loading";
import { useHomeContext } from "@/context/Home.context";

const RecipeEdit = () => {
   const { user} = useHomeContext();
  const { id } = useParams();
  const [ingredientsList, setIngredientsList] = useState<string[]>(["1"]);
  const [tagsList, setTagsList] = useState<string[]>(["1"]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "" as string | File,
    ingredients: [] as string[],
    cookingTime: "",
    category: "",
    tags: [] as string[],
  });

  const fetchSingleRecipe = async () => {
    const recipe = await getSingleRecipe(id as string);
    setForm({
      title: recipe?.data[0]?.title,
      description: recipe?.data[0]?.description,
      image: recipe?.data[0]?.image,
      ingredients: recipe?.data[0]?.ingredients,
      cookingTime: recipe?.data[0]?.cookingTime,
      category: recipe?.data[0]?.category,
      tags: recipe?.data[0]?.tags,
    });
    setIngredientsList(
      Array.from({ length: recipe?.data[0]?.ingredients.length })
    );
    setTagsList(Array.from({ length: recipe?.data[0]?.tags.length }));
  };

  useEffect(() => {
    fetchSingleRecipe();
  }, [id]);

  // console.log({ form });

  const handleUpdateRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(form);
    setLoading(true);
    let uploadImage: any = "";
    if (form.image) {
      const payload = new FormData();
      payload.append("image", form.image);
      // setLoading(true)
      const updateImage: any = await imageUploadImageBB(payload);
      uploadImage = updateImage as string;
    }

    const payload = {
      title: form.title,
      description: form.description,
      image: uploadImage || form.image,
      ingredients: form.ingredients,
      cookingTime: form.cookingTime,
      category: form.category,
      tags: form.tags,
    };
    try {
      const res = await updateRecipe(id as string, payload);
      console.log(res);
      if (res?.success) {
        toast.success(res.message);
        if(user?.role === "admin"){
          router.push("/dashboard/admin/managed-recipe");
        }else{
          router.push("/dashboard/user/my-recipes");
        }
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <UserApiLoading />}
      <form
        className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-4"
        onSubmit={handleUpdateRecipe}
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
          <div>
            {form.image && (
              <Image
                src={
                  typeof form.image === "string"
                    ? form.image
                    : URL.createObjectURL(form.image)
                }
                alt="Recipe"
                className="w-20 h-16 object-cover rounded"
                width={500}
                height={300}
              />
            )}
          </div>

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
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="American">American</option>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded font-bold"
        >
          Submit Recipe
        </button>
      </form>
    </>
  );
};

export default RecipeEdit;
