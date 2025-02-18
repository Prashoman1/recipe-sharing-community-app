"use client";

const DashBoardSkeleton = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 p-6 rounded-2xl shadow-lg flex items-center justify-between animate-pulse"
          >
            <div>
              <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          </div>
        ))}
    </>
  );
};

export default DashBoardSkeleton;
