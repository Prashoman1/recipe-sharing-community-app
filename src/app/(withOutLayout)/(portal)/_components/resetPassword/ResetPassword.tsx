"use client";
import { FieldValues, useForm } from "react-hook-form";

const ResetPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm();

  const handlePassReset = async (data: FieldValues) => {
    // forgetEmailSend(data);
    console.log(data);
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
