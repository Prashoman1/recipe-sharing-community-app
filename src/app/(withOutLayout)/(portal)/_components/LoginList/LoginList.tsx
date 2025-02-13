/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useHomeContext } from "@/context/Home.context";
import { useUserLogin } from "@/hooks/useAuth.hook";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import UserApiLoading from "@/app/_components/shared/Loading/Loading";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect_url");
  const [forget, setForget] = useState<boolean>(true);
  const { refreshUser, setRefreshUser } = useHomeContext();
  const { mutate: loginUser, isPending, isSuccess, data } = useUserLogin();
  const router = useRouter();
  // console.log({isPending,isError,data});
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: FieldValues) => {
    // console.log(data);
    const { email, password } = data;
    const userData = {
      email,
      password,
    };
    loginUser(userData);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      if (data.success) {
        if (redirect) {
          router.push(redirect);
          setRefreshUser(!refreshUser);
        } else {
          router.push("/");
          setRefreshUser(!refreshUser);
        }
      }
    }
  }, [isPending, isSuccess, data?.success]);

  const handleAdminCredentials = () => {
    const adminData = {
      email: "admin@gmail.com",
      password: "12345678",
    };
    reset(adminData);
  };

  const handleUserCredentials = () => {
    const userData = {
      email: "badhonchakrabarti100823@gmail.com",
      password: "12345678",
    };
    reset(userData);
  };

  return (
    <>
      {isPending && <UserApiLoading />}
      <div className="flex items-center justify-center py-6 lg:py-0 px-2 lg:px-0 lg:min-h-screen bg-gray-100">
        {forget ? (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-center mb-4 gap-3">
              <button
                onClick={handleAdminCredentials}
                className="text-xs bg-green-900 px-2 py-1 rounded-md text-white hover:bg-green-600"
              >
                Admin Credentials
              </button>
              <button
                onClick={handleUserCredentials}
                className="text-xs bg-green-900 px-2 py-1 rounded-md text-white hover:bg-green-600"
              >
                User Credentials
              </button>
            </div>
            <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
              Login
            </h2>
            <form
              onSubmit={handleSubmit(handleLoginSubmit)}
              className="space-y-4"
            >
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
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500">Password is required</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Login
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
                onClick={() => setForget(!forget)}
                className="text-green-600 hover:underline"
              >
                Forgot Password
              </button>
            </div>
          </div>
        ) : (
          <ForgetPassword
            setForget={setForget}
            forget={forget}
          ></ForgetPassword>
        )}
      </div>
    </>
  );
};

export default LoginPage;
