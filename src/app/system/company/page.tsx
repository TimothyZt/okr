"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound, redirect } from "next/navigation";
import SystemUserCompanyAssignmentHeader from "../../../../features/system/components/company/company-header";
import SystemUserCompanyAssignmentContent from "../../../../features/system/components/company/company-content";
import { getUserCompanyAssignmentsAction } from "../../../../features/system/server-actions/actions";
import { Me } from "../../../../features/users/dtos/users-dto";
import { UserCompanyAssignmentReponse } from "../../../../features/system/dtos/system-dtos";
export default async function SystemCompanyPage() {
  let me: Me;
  let userCompanyAssignments: UserCompanyAssignmentReponse[];
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    if (!me.roles.find((x) => x.roleName === "Admin")) {
      redirect("/system/employee");
    }
    userCompanyAssignments = unpackActionResponse(
      await getUserCompanyAssignmentsAction(),
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }

  return (
    <DefaultLayout me={me}>
      <div className="flex h-screen w-full flex-col">
        <SystemUserCompanyAssignmentHeader />
        <SystemUserCompanyAssignmentContent
          userCompanyAssignments={userCompanyAssignments}
        />
      </div>
    </DefaultLayout>
  );
}
