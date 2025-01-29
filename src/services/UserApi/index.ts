/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/providers/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getUserList = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const fetchOption = {
      next: {
        tags: ["users"],
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admins`, {
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
export const getSystemUserList = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const fetchOption = {
      next: {
        tags: ["user-list"],
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`, {
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

export const createAdmin = async (data: any) => {
    try {
        const res = await axiosInstance.post("/auth/create/admin", data);
        return res.data;
        revalidateTag("users");
    } catch (error) {
        return error;
    }
}

export const deleteUser = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/auth/users/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
