/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

const TrendingRecipes = () => {
  const [trending, setTrending] = useState([
    { tag: "#PistachioFlavors", description: "Pistachio croissants & desserts are trending globally." },
    { tag: "#Tanghulu", description: "Candied fruit skewers are taking over TikTok!" },
    { tag: "#OlympicMuffins", description: "Chocolate muffins inspired by athletes are a sensation." },
    { tag: "#OnionBoil", description: "Caramelized onion dishes are making headlines." },
  ]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg ">
      <h2 className="text-xl font-semibold mb-3">🔥 Trending Recipes</h2>
      <ul className="space-y-3">
        {trending.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="font-bold text-blue-600">{item.tag}</span>
            <span className="text-gray-600 text-sm">{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingRecipes;
