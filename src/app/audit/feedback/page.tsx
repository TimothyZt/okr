"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getObjectivesAction } from "../../../../features/okrs/server-actions/actions";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound } from "next/navigation";
import { Me } from "../../../../features/users/dtos/users-dto";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getCurrentSystemPeriod } from "../../../../features/system/extension/system-extension";
import { Objective } from "../../../../features/okrs/dtos/okr-dtos";
import AuditFeedbackProgressContainer from "../../../../features/okrs/components/audit/audit-progress/progress-container-feedback";
import { getFilterDepartmentsAction } from "../../../../features/baseInfo/server-actions/baseinfo";
import { FilterCompaniesDtos } from "../../../../features/baseInfo/dtos/baseinfo-dtos";
export default async function AuditPage() {
  let me: Me;
  let systemPeriods: PeriodDto[];
  let currentSystemPeriod: PeriodDto;
  let os: Objective[];
  let filterCompanyDtos: FilterCompaniesDtos;

  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    systemPeriods = unpackActionResponse(await getPeriodAction());
    currentSystemPeriod = getCurrentSystemPeriod(systemPeriods)!;
    os = unpackActionResponse(await getObjectivesAction());
    filterCompanyDtos = unpackActionResponse(
      await getFilterDepartmentsAction(),
    );
    
  } catch (error) {
    console.log(error);
    return notFound();
  }
  return (
    <DefaultLayout me={me!}>
      <div className="flex">
        <div className="h-screen w-full  border-2  border-slate-200 bg-slate-50 sm:h-full">
          <AuditFeedbackProgressContainer
            // auditKeyResults={[]}
            me={me}
            currentSystemPeriod={currentSystemPeriod}
            systemPeriods={systemPeriods}
            isAudit={true}
            filterCompanyDtos={filterCompanyDtos}
          ></AuditFeedbackProgressContainer>
        </div>
      </div>
    </DefaultLayout>
  );
}
