/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  changePassword,
  forgetPassword,
  loginApi,
  registerApi,
  updateProfileInfo,
} from "@/services/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginApi(userData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
        }
        if (!data.success) {
          console.log(data.errorSources);

          data.errorSources.map((e: { message: string }) =>
            toast.error(e.message)
          );
        }
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData) => await registerApi(userData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
        }
        if (!data.success) {
          console.log(data.errorSources);

          data.errorSources.map((e: { message: string }) =>
            toast.error(e.message)
          );
        }
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      // console.log({error});
      toast.error(error.message);
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["PROFILE_UPDATE"],
    mutationFn: async (userData) => await updateProfileInfo(userData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
        }
        if (!data.success) {
          console.log(data.errorSources);

          data.errorSources.map((e: { message: string }) =>
            toast.error(e.message)
          );
        }
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          toast.success(data.message);
        }
        if (!data.success) {
          console.log(data.errorSources);

          data.errorSources.map((e: { message: string }) =>
            toast.error(e.message)
          );
        }
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["PASSWORD_CHANGE"],
    mutationFn: async (userData) => await changePassword(userData),
    onSuccess: (data) => {
      console.log({ data });
      
      if (data) {
        if (data.success) {
          toast.success(data.message);
        } else {

          toast.error(data.message); // Handle API-specific errors
        }
      } else {
        toast.error("Something went wrong"); // Handle unexpected response
      }
    },
    onError: (error:any) => {
      console.log({ error });
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "An unexpected error occurred");
      }
    },
  });
};
