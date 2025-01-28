/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/providers/AxiosInstance";

export const createRecipe = async (data: any) => {
  try {
    const response = await axiosInstance.post("/recipe/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRecipesByAdmin = async () => {
  try {
    const response = await axiosInstance.get("/recipe/all");
    return response.data;
  } catch (error) {
    return error;
  }
}
