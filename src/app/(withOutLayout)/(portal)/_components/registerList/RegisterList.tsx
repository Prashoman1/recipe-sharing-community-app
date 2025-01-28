"use client";

import { useUserRegister } from "@/hooks/useAuth.hook";
import { imageUploadImageBB } from "@/services/imageUpload";
// import { useUserRegister } from "@/hooks/useAuth.hook";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";


const RegisterPage = () => {
  const {
    mutate: registerUser,
    isPending,
    data,
    isSuccess,
  } = useUserRegister();

  const router = useRouter();

  // console.log({ isPending, data, isSuccess });
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleRegisterSubmit = async (data: FieldValues) => {
    // console.log(data);

    try {
      const { name, email, password, photo } = data;
      let profileImage: string = "";
      console.log("photo", photo[0]);
      
      const imagePayload = new FormData();
      imagePayload.append("image", photo[0] as Blob);
      profileImage = await imageUploadImageBB(imagePayload)
      const insertedData = {
        userName: name,
        email,
        password,
        profileImage,
      };
        console.log({ insertedData });
       registerUser(insertedData);
      // console.log({ res });
      
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      router.push("/login");
    }
  }, [isPending, isSuccess,data?.success]);

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const formData = new FormData(e.currentTarget);
    //   const data = Object.fromEntries(formData.entries());
    //   console.log(data); // Replace with your API call logic
    // };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* {isPending && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
                Loading...
              </h2>
            </div>
          </div>
        )} */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
            Register
          </h2>
          <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                id="email"
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
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Photo
              </label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your password"
              />
              {errors.photo && (
                <p className="text-red-500">Photo is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
