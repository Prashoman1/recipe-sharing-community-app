/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/providers/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

export const createCategory = async (data: any) => {
  try {
    const response = await axiosInstance.post("/categories", data);
    revalidateTag("category");
    return response.data;
  } catch (error) {
    console.log(error);
    
    return error;
  }
};

export const getAllCategory = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const fetchOption = {
      next: {
        tags: ["category"],
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
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

export const deleteCategoryApi = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    revalidateTag("category");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCategory = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("category");
    return response.data;
  } catch (error) {
    return error;
  }
};
