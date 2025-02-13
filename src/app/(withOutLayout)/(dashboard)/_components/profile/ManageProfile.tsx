/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useHomeContext } from "@/context/Home.context";
import { useUpdateProfile } from "@/hooks/useAuth.hook";
import { imageUploadImageBB } from "@/services/imageUpload";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { FiEdit } from "react-icons/fi";
import PasswordChangeModal from "./PasswordChangeModal/PasswordChangeModal";
import { modelOpen } from "@/helpers";
import UserApiLoading from "@/app/_components/shared/Loading/Loading";

const ProfilePage = () => {
  const changePasswordModalRef = useRef<HTMLDialogElement>(null);
  const formModalRef = useRef<HTMLDialogElement>(null);
  const {
    mutate: profileUpdate,
    isPending,
    data,
    isSuccess,
  } = useUpdateProfile();
  const { user, setRefreshUser, refreshUser } = useHomeContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName ?? "",
    email: user?.email ?? "",
    profileImage: user?.profileImage,
    address: user?.address ?? "",
    bio: user?.bio ?? "",
  });

  useEffect(() => {
    setFormData({
      userName: user?.userName ?? "",
      email: user?.email ?? "",
      profileImage: user?.profileImage,
      address: user?.address ?? "",
      bio: user?.bio ?? "",
    });
  }, [user, isEditing]);

  const handleEditProfile = async (e: any) => {
    e.preventDefault();

    let imageUpdate;
    if (formData?.profileImage && typeof formData?.profileImage === "object") {
      // console.log("image", formData?.profileImage);

      const formDataObj = new FormData();
      formDataObj.append("image", formData?.profileImage);

      const updateImage: any = await imageUploadImageBB(formDataObj);
      imageUpdate = updateImage as string;
    } else {
      imageUpdate = formData?.profileImage;
    }
    const updatedData = {
      profileImage: imageUpdate,
      address: formData?.address,
      bio: formData?.bio,
    };
    profileUpdate(updatedData);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      setIsEditing(false);
      setRefreshUser(!refreshUser);
    }
  }, [isPending, isSuccess, data?.success]);

  return (
    <>
      {isPending && <UserApiLoading />}
      <div className="min-h-screen flex flex-col bg-gray-50">
        
        

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              Profile Information
            </h1>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    // onChange={handleInputChange}
                    disabled
                    className="w-full border rounded-lg px-4 py-2 focus:ring-emerald-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    // onChange={handleInputChange}
                    disabled
                    className="w-full border rounded-lg px-4 py-2 focus:ring-emerald-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
                <form onSubmit={handleEditProfile}>
                  <div>
                    <label className="block text-gray-600">Profile Image</label>
                    <div>
                      {typeof formData.profileImage === "string" ? (
                        <img
                          src={formData.profileImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(formData.profileImage)}
                          alt="Profile"
                          className="w-24 h-24 rounded-full"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      name="profileImage"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData({
                            ...formData,
                            profileImage: e.target.files[0],
                          });
                        }
                      }}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        });
                      }}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Bio</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.bio || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bio: e.target.value,
                        });
                      }}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {formData.userName}
                    </h2>
                    <p className="text-gray-600">{formData.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-700">Address</h3>
                  <p className="text-gray-600">{formData.address}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-700">Bio</h3>
                  <p className="text-gray-600 capitalize">{formData.bio}</p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    <FiEdit className="inline mr-2" /> Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      modelOpen(changePasswordModalRef);
                    }}
                    className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    <FiEdit className="inline mr-2" /> Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
        <PasswordChangeModal
          modalRef={changePasswordModalRef}
          formRef={formModalRef}
        />
      </div>
    </>
  );
};

export default ProfilePage;
