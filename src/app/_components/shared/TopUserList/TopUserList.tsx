"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllUsersInSystems } from "@/services/AuthApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TopUserList = () => {
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    const response = await getAllUsersInSystems({});
    setUsers(response.data?.result
    );
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);
  

  return (
    <div className="p-4 bg-white shadow-md rounded-lg ">
      <h2 className="text-xl font-semibold mb-3">Following Users</h2>
      <ul className="space-y-3">
        {users?.map((item:any, index:number) => (
          <li key={index} className="border-b py-2 text-gray-700">
          <Link
            href={`/profile/${item?._id}`}
            className="flex items-center space-x-2"
          >
            <Image
              src={
                item?.profileImage ||
                "https://i.ibb.co/K0wG22V/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
              }
              alt="User Image"
              width={30}
              height={30}
              className="w-7 h-7 rounded-full"
            />
            <p className="font-bold">{item?.userName}</p>
          </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUserList;
