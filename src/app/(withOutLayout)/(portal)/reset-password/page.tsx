import { Suspense } from "react";
import ResetPassword from "../_components/resetPassword/ResetPassword";

const Page = () => {
  return<Suspense>
    <ResetPassword />
  </Suspense>;
};

export default Page;
