"use client";

const RecipeCardSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 w-full animate-pulse"
        >
          {/* Author Info Skeleton */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              {/* Profile Image Placeholder */}
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                {/* Username Placeholder */}
                <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                {/* Date Placeholder */}
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>

            {/* Three-dot menu Placeholder */}
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          </div>

          {/* Title Placeholder */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

          {/* Recipe Image Placeholder */}
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>

          {/* Description Placeholder */}
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>

          {/* Actions (Like & Comment) Placeholder */}
          <div className="flex items-center justify-between mt-3 text-gray-600">
            <div className="flex items-center gap-4">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
            </div>

            {/* View Details Placeholder */}
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipeCardSkeleton;
