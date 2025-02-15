/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UserApiLoading from "@/app/_components/shared/Loading/Loading";
import { createAdmin } from "@/services/UserApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminInsertForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    profileImage:
      "https://i.ibb.co.com/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
    address: "",
    bio: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("Form Submitted:", formData);

    try {
      const insertAdmin = {
        ...formData,
        memberShip: "free",
        expiryDate: null,
        passwordUpdate: false,
        isDeleted: false,
      };
      const res = await createAdmin(insertAdmin);
      console.log(res);
      if (res?.success) {
        toast.success(res.message);
        setFormData({
          userName: "",
          email: "",
          password: "",
          profileImage:
            "https://i.ibb.co.com/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
          address: "",
          bio: "",
        });
        router.push("/Dashboard/admin/manage-admin");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }

    // TODO: Send data to API
  };

  return (
    <div className="mt-10">
      {isLoading && <UserApiLoading />}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md ">
        <h2 className="text-xl font-bold mb-4">Insert Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
          <div>
            <label className="block text-gray-700">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={(e) => {
                setFormData({ ...formData, userName: e.target.value });
              }}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInsertForm;
