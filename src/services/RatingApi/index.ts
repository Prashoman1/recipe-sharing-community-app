/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/providers/AxiosInstance";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

export const getMyRatings = async () => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
      const fetchOption = {
        next: {
          tags: ["my-Ratings"],
        },
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rating/get-my-rating`, {
        ...fetchOption,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
  
      return res.json();
    } catch (error) {
      return error;
    }
  };

export const createRatingByRecipe = async (data: any) => {
  try {
    const response = await axiosInstance.post("/rating/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("my-Ratings");
    return response.data;
  } catch (error) {
    return error;
  }
};
