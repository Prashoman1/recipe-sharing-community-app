/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Shield, Users, Utensils } from "lucide-react";
import Link from "next/link";
import { BarChart } from "../BarChart/BarChart";
import { useEffect, useState } from "react";
import { getAllStatsDashboard } from "@/services/StatsApi";
import DashBoardSkeleton from "@/app/_components/shared/DashBoardSkeleton/DashBoardSkeleton";
import LatestRecipes from "@/app/_components/shared/LatestRecipes/LatestRecipes";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRecipes: 10,
    totalPublishedRecipes: 10,
    totalUnPublishedRecipes: 0,
    totalUser: 9,
    totalAdmin: 4,
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const statsRes = await getAllStatsDashboard();
      // console.log({ stats });
      setStats({
        totalRecipes: statsRes?.data?.totalRecipes,
        totalPublishedRecipes: statsRes?.data?.totalPublishedRecipes,
        totalUnPublishedRecipes: statsRes?.data?.totalUnPublishedRecipes,
        totalUser: statsRes?.data?.totalUser,
        totalAdmin: statsRes?.data?.totalAdmin,
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <>
      <div className="w-full shadow-lg rounded-2xl bg-white py-5 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
          {loading ? (
            <DashBoardSkeleton />
          ) : (
            <>
              <Link
                href={"/Dashboard/admin/user-list"}
                className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-blue-600 transition-colors duration-300 ease-in-out"
              >
                <div>
                  <h2 className="text-xl font-bold">Total Users</h2>
                  <p className="text-3xl font-semibold">{stats?.totalUser}</p>
                </div>
                <Users size={40} />
              </Link>

              {/* Total Admins Card */}
              <Link
                href={"/Dashboard/admin/manage-admin"}
                className="bg-red-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-red-600 transition-colors duration-300 ease-in-out"
              >
                <div>
                  <h2 className="text-xl font-bold">Total Admins</h2>
                  <p className="text-3xl font-semibold">{stats?.totalAdmin}</p>
                </div>
                <Shield size={40} />
              </Link>

              {/* Total Recipes Card */}
              <Link
                href={"/Dashboard/admin/managed-recipe"}
                className="bg-pink-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-pink-600 transition-colors duration-300 ease-in-out   "
              >
                <div>
                  <h2 className="text-xl font-bold">Total Recipes</h2>
                  <p className="text-3xl font-semibold">
                    {stats?.totalRecipes}
                  </p>
                </div>
                <Utensils size={40} />
              </Link>
              <Link
                href={"#"}
                className="bg-green-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-green-600 transition-colors duration-300 ease-in-out   "
              >
                <div>
                  <h2 className="text-xl font-bold">Total Publish Recipes</h2>
                  <p className="text-3xl font-semibold">
                    {stats?.totalPublishedRecipes}
                  </p>
                </div>
                <Utensils size={40} />
              </Link>
              <Link
                href={"#"}
                className="bg-gray-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-gray-600 transition-colors duration-300 ease-in-out   "
              >
                <div>
                  <h2 className="text-xl font-bold">Total UnPublish Recipes</h2>
                  <p className="text-3xl font-semibold">
                    {stats?.totalUnPublishedRecipes}
                  </p>
                </div>
                <Utensils size={40} />
              </Link>
            </>
          )}
        </div>

        <div className="shadow-lg rounded-2xl bg-white p-4">
          <BarChart />
        </div>
        <div className="shadow-lg rounded-2xl bg-white p-4 mt-4">
          <LatestRecipes/>
          </div>
      </div>
    </>
  );
};

export default Dashboard;
