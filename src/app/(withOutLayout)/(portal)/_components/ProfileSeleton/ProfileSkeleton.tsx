const ProfileSkeleton = () => {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Cover Photo Skeleton */}
        <div className="h-40 bg-gray-300 animate-pulse relative">
          {/* Profile Image Skeleton */}
          <div className="absolute left-4 bottom-[-30px] w-24 h-24 rounded-full border-4 border-white bg-gray-300 animate-pulse"></div>
        </div>
  
        {/* Profile Info Skeleton */}
        <div className="p-4 text-center mt-8">
          <div className="h-6 w-32 bg-gray-300 animate-pulse mx-auto mb-2 rounded"></div> {/* Username */}
          <div className="h-4 w-48 bg-gray-300 animate-pulse mx-auto mb-1 rounded"></div> {/* Bio */}
          <div className="h-4 w-40 bg-gray-300 animate-pulse mx-auto mb-2 rounded"></div> {/* Address */}
  
          <div className="inline-block mt-2 h-6 w-36 bg-gray-300 animate-pulse rounded-full"></div> {/* Membership */}
  
          {/* Followers & Following Skeleton */}
          <div className="flex gap-4 items-center justify-center pt-2 text-gray-700">
            <div className="flex gap-2">
              <div className="w-10 h-5 bg-gray-300 animate-pulse rounded-md"></div> {/* Followers */}
              <div className="w-10 h-5 bg-gray-300 animate-pulse rounded-md"></div> {/* Following */}
            </div>
          </div>
        </div>
  
        {/* Follow Button Skeleton */}
        <div className="flex justify-center my-4">
          <div className="h-10 w-32 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  };
  
  export default ProfileSkeleton;
  