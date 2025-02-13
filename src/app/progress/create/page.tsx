"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound } from "next/navigation";
import { Me } from "../../../../features/users/dtos/users-dto";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getCurrentSystemPeriod } from "../../../../features/system/extension/system-extension";
import AuditProgressContainer from "../../../../features/okrs/components/audit/audit-progress/progress-container";
import { Objective } from "../../../../features/okrs/dtos/okr-dtos";
export default async function AuditPage() {
  let me: Me;
  let systemPeriods: PeriodDto[];
  let currentSystemPeriod: PeriodDto;
  let os:Objective[]
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    systemPeriods = unpackActionResponse(await getPeriodAction());
    currentSystemPeriod = getCurrentSystemPeriod(systemPeriods)!;
  } catch (error) {
    console.log(error);
    return notFound();
  }
  return (
    <DefaultLayout me={me!}>
      <div className="flex">
        <div className="h-screen w-full  border-2  border-slate-200 bg-slate-50 sm:h-full">
          <AuditProgressContainer
            aobjetives={[]}
            // auditKeyResults={[]}
            me={me}
            currentSystemPeriod={currentSystemPeriod}
            systemPeriods={systemPeriods}
          ></AuditProgressContainer>
        </div>
      </div>
    </DefaultLayout>
  );
}
