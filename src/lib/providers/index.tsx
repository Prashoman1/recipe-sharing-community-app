"use client";

import { HomeContextProvider } from "@/context/Home.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContextProvider>{children}</HomeContextProvider>
    </QueryClientProvider>
  );
};
export default Providers;
