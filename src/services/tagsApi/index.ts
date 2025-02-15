/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/providers/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

export const createTags = async (data: any) => {
  try {
    const response = await axiosInstance.post("/tags", data);
    revalidateTag("tags");
    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getAllTags = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const fetchOption = {
      next: {
        tags: ["tags"],
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
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

export const deleteTagsApi = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/tags/${id}`);
    revalidateTag("tags");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateTag = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/tags/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("tags");
    return response.data;
  } catch (error) {
    return error;
  }
};
