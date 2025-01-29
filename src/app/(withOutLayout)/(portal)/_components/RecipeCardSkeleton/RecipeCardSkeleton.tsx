"use client";

const RecipeCardSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="max-w-sm w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse mb-6"
        >
          {/* Skeleton Image */}
          <div className="w-full h-48 bg-gray-700"></div>

          {/* Skeleton Content */}
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>

            {/* Tag and Rating Placeholder */}
            <div className="flex gap-3 mt-2">
              <div className="h-5 w-16 bg-gray-700 rounded-md"></div>
              <div className="h-5 w-20 bg-gray-700 rounded-md"></div>
            </div>

            {/* Button Placeholder */}
            <div className="mt-6 flex justify-between items-center">
              <div className="h-4 bg-gray-700 rounded w-1/3"></div>
              <div className="h-10 bg-blue-700 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipeCardSkeleton;
