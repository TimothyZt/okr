"use server";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { notFound } from "next/navigation";
import { Me } from "../../../features/users/dtos/users-dto";
import { getMeAction } from "../../../features/users/server-actions/user";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import Image from "next/image";
import im from '../../../../public/images/logo/2025.png';

export default async function MapPage() {
  let me: Me;
 
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();

  } catch (error) {
    console.log(error);
    return notFound();
  }
  return (
    <DefaultLayout me={me}>
               <Image
                      width={8000}
                      height={1000}
                      src={"/images/logo/2025.png"}
                      alt="Logo"
                    />
    </DefaultLayout>
  );
}
