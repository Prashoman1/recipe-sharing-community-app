import React, { Suspense } from "react";
import LoginPage from "../(withOutLayout)/(portal)/_components/LoginList/LoginList";

const page = () => {
  return (
    <>
      <Suspense>
        <LoginPage />
      </Suspense>
    </>
  );
};

export default page;
