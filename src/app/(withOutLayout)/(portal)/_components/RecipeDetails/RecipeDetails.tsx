/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getSingleRecipe } from "@/services/RecipeApi";
import {
  createCommentByRecipe,
  getCommentsByRecipe,
} from "@/services/CommentApi";
import { toast } from "react-toastify";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const fetchSingleRecipe = async () => {
    try {
      const res = await getSingleRecipe(id as string);
      setRecipe(res?.data[0]);
    } catch (error) {
      return error;
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getCommentsByRecipe(id as string);
      setComments(res?.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchSingleRecipe();
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [id, refetch]);

  // console.log({ recipe });

  const [rating, setRating] = useState(0);

  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    // console.log(commentText);
    const insertComment = {
      recipe: id,
      comment: commentText,
    };
    console.log({ insertComment });

    try {
      const res = await createCommentByRecipe(insertComment);
      console.log({ res });

      if (res?.success) {
        toast.success(res?.message);
        setCommentText("");
        setRefetch(!refetch);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md px-16">
      <div className="w-full flex items-center justify-between">
        <div className="w-[30%]">
          <Image
            src={
              recipe?.image ? recipe?.image : "/images/recipe-placeholder.jpg"
            }
            alt={recipe?.title ? recipe?.title : "Recipe Image"}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="w-[50%]">
          <h1 className="text-3xl font-bold mt-4">{recipe?.title}</h1>
          <p className="text-gray-700 mt-2">{recipe?.description}</p>
          <p className="mt-2 text-sm text-gray-600">
            Category: <span className="font-semibold">{recipe?.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            Cooking Time:{" "}
            <span className="font-semibold">{recipe?.cookingTime} mins</span>
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc list-inside mt-2">
              {recipe?.ingredients?.map((ingredient: any, index: number) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {recipe?.tags?.map((tag: any, index: number) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Rate this Recipe</h2>
        <Rating
          value={rating}
          onChange={setRating}
          className="mt-2"
          style={{ width: "150px", height: "30px" }}
        />
        <p className="text-gray-600 mt-2">You rated this {rating} stars</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="mt-2">
          <textarea
            className="w-full border p-2 rounded-md"
            placeholder="Leave a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
        <div className="w-full max-h-[200px] overflow-y-scroll">
          <ul className="mt-4 w-full py-5">
            {comments?.map((cItem: any, index) => (
              <li key={index} className="border-b py-2 text-gray-700">
                {cItem?.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
