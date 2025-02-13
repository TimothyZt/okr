import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/dist/server/api-utils";

export const metadata: Metadata = {
  title:
    "C&C OKR System",
  description: "",
};


export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
        
      </DefaultLayout>
    </>
  );
}
