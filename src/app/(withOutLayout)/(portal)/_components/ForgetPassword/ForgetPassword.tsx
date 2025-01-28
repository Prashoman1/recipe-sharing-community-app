/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForgetPassword } from "@/hooks/useAuth.hook";
import Link from "next/link";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

type ForgetPasswordProps = {
  setForget: any;
  forget: any;
};

const ForgetPassword = ({ setForget, forget }: ForgetPasswordProps) => {
  const { mutate: forgetEmailSend, isPending ,isSuccess} = useForgetPassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleForgetSubmit = async (data: FieldValues) => {
    forgetEmailSend(data);
    // console.log(data);
  };
  useEffect(() => {
      if (!isPending && isSuccess) {
        reset();
      }
    }, [isPending, isSuccess]);
  return (
    <>
      {isPending && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
              Loading...
            </h2>
          </div>
        </div>
      )}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit(handleForgetSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Send
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don&rsquo;t have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setForget(!forget);
            }}
            className="text-green-600 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
