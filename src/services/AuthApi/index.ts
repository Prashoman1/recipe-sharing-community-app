/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { decodedToken } from "@/helpers";
import axiosInstance from "@/lib/providers/AxiosInstance";
import { cookies } from "next/headers";

export const loginApi = async (userData: any) => {
  try {
    const response = await axiosInstance.post("auth/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data.token);
    const cookieStore = await cookies();
    cookieStore.set("token", response?.data?.token, { secure: true });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const registerApi = async (userData: any) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during registration",
    };
  }
};

export const getMe = async () => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProfileInfo = async (data: any) => {
  try {
    const response = await axiosInstance.put(
      "auth/update-profile",
       data ,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


export const changePassword = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "auth/change-password",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};




export const currentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let userInfo: any = null;
  if (token) {
    userInfo = decodedToken(token);
  }
  return userInfo;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return true;
};
