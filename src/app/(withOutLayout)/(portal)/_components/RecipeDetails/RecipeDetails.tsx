"use client";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";

export default function RecipeDetails() {
  const recipe = {
    title: "Spaghetti Bolognese",
    description:
      "A classic Italian pasta dish with a rich and savory meat sauce.",
    image: "https://example.com/spaghetti-bolognese.jpg",
    ingredients: [
      "200g spaghetti",
      "300g ground beef",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "500ml tomato sauce",
      "1 tbsp olive oil",
      "Salt and pepper to taste",
      "Fresh basil for garnish",
    ],
    cookingTime: 30,
    category: "Italian",
    tags: ["quick", "easy", "comfort food", "pasta", "family-friendly"],
    isPremium: true,
  };

  const [rating, setRating] = useState(0);
//   const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  //   const handleAddComment = () => {
  //     if (commentText.trim() !== "") {
  //       setComments([...comments, commentText]);
  //       setCommentText("");
  //     }
  //   };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md px-16">
      <div className="w-full flex items-center justify-between">
        <div className="w-[30%]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="w-[50%]">
          <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
          <p className="text-gray-700 mt-2">{recipe.description}</p>
          <p className="mt-2 text-sm text-gray-600">
            Category: <span className="font-semibold">{recipe.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            Cooking Time:{" "}
            <span className="font-semibold">{recipe.cookingTime} mins</span>
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc list-inside mt-2">
              {recipe.ingredients.map((ingredient, index) => (
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
          {recipe.tags.map((tag, index) => (
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
        <Rating value={rating} onChange={setRating} className="mt-2" />
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
            // onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
        {/* <ul className="mt-4">
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-2 text-gray-700">
              {comment}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
