/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getSingleUserByUserId } from "@/services/AuthApi";
import { getRecipesByUserId } from "@/services/RecipeApi";
import { CheckCircle, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../RecipeCardSkeleton/RecipeCardSkeleton";
import ProfileSkeleton from "../ProfileSeleton/ProfileSkeleton";
import { useHomeContext } from "@/context/Home.context";
import { createFollowingUsers, deleteFollower } from "@/services/FollowApi";
import MembershipButton from "../MemberShipButton/MemberShipButton";

// import Image from "next/image";
// import { CheckCircle, UserPlus } from "lucide-react";
type TProps = {
  myLikes: any;
  myFollowingUsers: any;
};
const ProfilePage = ({ myLikes, myFollowingUsers }: TProps) => {
  const { user: currentUser } = useHomeContext();
  const { id } = useParams();
  const [user, setUser] = useState<any>({});
  const [follower, setFollower] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [recipes, setRecipes] = useState<any>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await getSingleUserByUserId(id as string);
      if (res?.success) {
        setLoading(false);
        setUser(res?.data?.userInfo);
        setFollowing(res?.data?.followInfo);
        setFollower(res?.data?.followerInfo);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchThisUserRecipesPost = async () => {
    try {
      setLoading(true);
      const res = await getRecipesByUserId(id as string);
      if (res?.success) {
        setLoading(false);
        setRecipes(res?.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [id, refetch]);

  useEffect(() => {
    fetchThisUserRecipesPost();
  }, [id, refetch]);

  useEffect(() => {
    const isFollowing = myFollowingUsers?.find(
      (follow: any) => follow?.following?._id === id
    );
    if (isFollowing) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [myFollowingUsers, id]);

  const handleFollowUser = async () => {
    if (id) {
      console.log({ id });

      try {
        const res = await createFollowingUsers({ followId: id });
        console.log({ res });

        if (res?.success) {
          toast.success(res?.message);
          setRefetch(!refetch);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleUnFollowUser = async () => {
    if (id) {
      try {
        const res = await deleteFollower({ unFollowId: id });
        if (res?.success) {
          toast.success(res?.message);
          setRefetch(!refetch);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  // console.log({ myFollowingUsers });

  return (
    <>
      <div className="container mx-auto py-8">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            {/* Cover Photo */}
            <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <Image
                src={
                  user?.profileImage
                    ? user?.profileImage
                    : "https://i.ibb.co.com/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                }
                alt="Profile"
                width={100}
                height={100}
                className="absolute left-4 bottom-[-30px] w-24 h-24 rounded-full border-4 border-white"
              />
            </div>
            {/* Profile Info */}
            <div className="p-4 text-center mt-8">
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.userName}
              </h2>
              <p className="text-gray-500">
                {user?.bio || "No bio available."}
              </p>
              <p className="text-sm text-gray-400">
                {user?.address}
                add
              </p>
              <span className="inline-block mt-2 px-4 py-1 text-sm text-white bg-green-500 rounded-full">
                {user?.memberShip?.toUpperCase()} Member
              </span>
              <div className="flex gap-4 items-center justify-center pt-2 text-gray-700">
                <div className="flex  gap-2">
                  {/* Followers */}
                  <div className="flex items-center gap-2">
                    <span>Following</span>
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="">{following?.length}</span>
                  </div>
                  {/* Following */}
                  <div className="flex items-center gap-2">
                    <span>Follower</span>
                    <UserPlus className="w-5 h-5 text-green-500" />
                    <span>{follower?.length}</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
              {currentUser?._id === id && <MembershipButton />}
              </div>
            </div>
            {currentUser?._id !== id && (
              <div className="flex justify-center my-4">
                {isFollowing ? (
                  <button
                    onClick={() => {
                      handleUnFollowUser();
                    }}
                    className="px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-lg transition-all duration-300 bg-gray-300 text-gray-700"
                  >
                    <CheckCircle size={16} /> Following
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleFollowUser();
                    }}
                    className="px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-lg transition-all duration-300 bg-blue-500 text-white"
                  >
                    <UserPlus size={16} /> Follow
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {loading && <RecipeCardSkeleton />}
          {recipes?.map((recipe: any) => {
            const isLiked = myLikes?.find(
              (like: any) => like.recipe === recipe._id
            );
            return (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                refetch={refetch}
                setRefetch={setRefetch}
                isLiked={isLiked}
                user={user}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
