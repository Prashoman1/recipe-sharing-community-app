/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/providers/AxiosInstance";
import { revalidateTag } from "next/cache";

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

export const getRecipesByAdmin = async (query:any) => {
  try {
  
    const response = await axiosInstance.get("/recipe/all",{
      params:query
    });
    revalidateTag("my-likes");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const RecipePublicUnPublishAPi = async (id: string) => {
  try {
    // console.log({id});

    const response = await axiosInstance.put(`/recipe/publish/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteRecipeApi = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`recipe/delete/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllPublicRecipes = async (query: any) => {
  try {
    const response = await axiosInstance.get("/recipe/get-all/public", {
      params: query,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSingleRecipe = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/recipe/details/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRecipesByUser = async () => {
  try {
    const response = await axiosInstance.get("/recipe/my-recipes");
    revalidateTag("my-likes");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRecipesByUserId = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/recipe/${userId}`);
    revalidateTag("my-likes");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateRecipe = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/recipe/update/${id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
