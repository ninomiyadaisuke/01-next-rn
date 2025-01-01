import Verify from "@/components/auth/verify";
import React from "react";

const VerifyPage = async ({ params }: { params: { _id: string } }) => {
  return <Verify _id={params._id} />;
};

export default VerifyPage;
