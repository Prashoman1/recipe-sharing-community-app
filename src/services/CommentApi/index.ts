/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/providers/AxiosInstance";
// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

export const getCommentsByRecipe = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/comment/get/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCommentByRecipe = async (data: any) => {
  try {
    const response = await axiosInstance.post("/comment/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
