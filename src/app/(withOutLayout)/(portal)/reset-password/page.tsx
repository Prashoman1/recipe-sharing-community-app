"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ResetPassword from "../_components/resetPassword/ResetPassword";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!id || !token) {
      router.push("/not-found");
    }
  }, [id, token]);
//   console.log(id, token);

  return (
    <>
      <ResetPassword id={id!} token={token!} />
    </>
  );
};

export default Page;
