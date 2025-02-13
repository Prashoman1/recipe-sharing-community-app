"use client";
import { Shield, Users, Utensils } from "lucide-react";
import Link from "next/link";
import { BarChart } from "../BarChart/BarChart";

const Dashboard = () => {
  return (
    <>
      <div className="w-full shadow-lg rounded-2xl bg-white py-5 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
          {/* Total Users Card */}
          <Link href={"#"} className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            <div>
              <h2 className="text-xl font-bold">Total Users</h2>
              <p className="text-3xl font-semibold">1,250</p>
            </div>
            <Users size={40} />
          </Link>

          {/* Total Admins Card */}
          <Link href={"#"} className="bg-red-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-red-600 transition-colors duration-300 ease-in-out">
            <div>
              <h2 className="text-xl font-bold">Total Admins</h2>
              <p className="text-3xl font-semibold">15</p>
            </div>
            <Shield size={40} />
          </Link>

          {/* Total Recipes Card */}
          <Link href={"#"} className="bg-green-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:bg-green-600 transition-colors duration-300 ease-in-out   ">
            <div>
              <h2 className="text-xl font-bold">Total Recipes</h2>
              <p className="text-3xl font-semibold">320</p>
            </div>
            <Utensils size={40} />
          </Link>
        </div>

        <div className="shadow-lg rounded-2xl bg-white p-4">
        <BarChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
