/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/providers/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createLikeByRecipe = async (data: any) => {
  try {
    const response = await axiosInstance.post("/like/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("my-likes");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMyRecipeLikes = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const fetchOption = {
      next: {
        tags: ["my-likes"],
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/get`, {
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

export const deleteLikeByRecipe = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/like/delete/${id}`);
    revalidateTag("my-likes");
    return response.data;
  } catch (error) {
    return error;
  }
};
