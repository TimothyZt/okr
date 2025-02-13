"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound, redirect } from "next/navigation";
import SystemEmployeeHeader from "../../../../features/system/components/employee/employee-header";
import SystemEmployeeContent from "../../../../features/system/components/employee/employee-content";
import { getOrgChartAction } from "../../../../features/baseInfo/server-actions/baseinfo";
import { Me } from "../../../../features/users/dtos/users-dto";
import { OrgChart } from "../../../../features/baseInfo/dtos/baseinfo-dtos";
export default async function SystemEmployeePage() {
  let me: Me;
  let orgCharts: OrgChart[];
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    if (!me.roles.find((x) => x.roleName === "Admin")) {
      redirect("/system/employee");
    }

    orgCharts = unpackActionResponse(await getOrgChartAction());
  } catch (error) {
    console.log(error);
    return notFound();
  }

  return (
    <DefaultLayout me={me}>
      <div className="flex h-screen w-full flex-col">
        <SystemEmployeeHeader />
        <SystemEmployeeContent orgCharts={orgCharts} />
      </div>
    </DefaultLayout>
  );
}
