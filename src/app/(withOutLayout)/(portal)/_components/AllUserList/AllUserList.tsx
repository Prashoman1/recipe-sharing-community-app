/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/app/(withOutLayout)/(dashboard)/_components/Pagination/Pagination";
import UserApiLoading from "@/app/_components/shared/Loading/Loading";
import TableSkeleton from "@/app/_components/shared/Skeleton/Skeleton";
import { useGetAllSystemUsers } from "@/hooks/useAuth.hook";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const UserTable: React.FC = () => {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [showPage, setShowPage] = React.useState(0);
  const limit = 10;

  const { isPending, data } = useGetAllSystemUsers(
    {
      page,
      limit
    }
  );
  console.log(data);

  useEffect(() => {
    if (data) {
      setUsers(data?.data?.result || []);
      setShowPage(data?.data?.meta?.totalPage);
    }
  }, [!isPending, data]);

  console.log({showPage});
  

  return (
    <div className="overflow-x-auto p-4 min-h-screen">
      {isPending && <UserApiLoading />}
      {isPending ? (
        Array.from({ length: 10 }).map((_, index) => (
          <TableSkeleton key={index} />
        ))
      ) : (
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3">Profile</th>
              <th className="border p-3">Username</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user?._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">
                  <Image
                    src={user.profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border p-3">{user.userName}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3 text-gray-500 text-sm">
                  <Link href={`/profile/${user._id}`}>
                    <Eye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination page={page} setPage={setPage} showPage={showPage} />
    </div>
  );
};

export default UserTable;
