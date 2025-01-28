/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TContextType } from "./context.type";
import { currentUser, getMe } from "@/services/AuthApi";

// import { HomeContextType } from "../types/Home.Context.type";

export const HomeContext = createContext<TContextType | undefined>(undefined);

export const HomeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState({});
  const [refreshUser, setRefreshUser] = useState(false);

  const fetchTokenUserInfo = async () => {
    const userInfo = await currentUser();
    if (userInfo) {
      const userdata = await getMe();
      if (userdata?.success) {
        setUser(userdata?.data);
      }
    }
  };

  useEffect(() => {
    fetchTokenUserInfo();
  }, [refreshUser]);

  const value = {
    user,
    refreshUser,
    setRefreshUser,
  } as any;
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeContextProvider");
  }
  return context;
};
