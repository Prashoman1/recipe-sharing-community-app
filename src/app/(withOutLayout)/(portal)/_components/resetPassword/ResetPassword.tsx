/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!id || !token) {
      router.push("/not-found");
    }
  }, [id, token]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm();

  const handlePassReset = async (data: FieldValues) => {
    const { password } = data;
    const insetData ={
      id,
      newPassword: password,
    }
    // console.log(insetData);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, insetData,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      if(response?.data?.success){
        toast.success("Password reset successfully");
        router.push("/login");
      }else{
        toast.error(response?.data?.message || "An error occurred, please try again later");
      }
      
    } catch (error:any) {
      toast.error(error?.message ||"An error occurred, please try again later");
      
    }
    
  };
  
  return (
    <>
     <div className="w-full h-[100vh] flex items-center justify-center">
     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit(handlePassReset)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your New password"
            />
            {errors.password && (
              <p className="text-red-500">New Password is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
     </div>
    </>
  );
};

export default ResetPassword;
