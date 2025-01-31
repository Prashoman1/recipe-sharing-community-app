/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/providers/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createFollowingUsers = async (data: any) => {
  try {
    const response = await axiosInstance.post("/user/follow", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("my-following");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMyFollowingUsers = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const fetchOption = {
      next: {
        tags: ["my-following"],
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/following`, {
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

export const deleteFollower = async (info: any) => {
  try {
    const response = await axiosInstance.post("user/un-follow",info,{
        headers: {
            "Content-Type": "application/json",
        },
    });
    revalidateTag("my-following");
    return response.data;
  } catch (error) {
    return error;
  }
};
