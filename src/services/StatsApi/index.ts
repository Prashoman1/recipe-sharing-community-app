/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/providers/AxiosInstance";

export const getAllStatsDashboard = async () => {
  try {
    const response = await axiosInstance.get(`dashboard/count/stats`);
    return response.data;
  } catch (error) {
    return error;
  }
};
