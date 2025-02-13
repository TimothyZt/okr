"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  getAuditKR_RecordsAction,
  getAuditKRSubmittedResponsesAction,
  getAuditO_RecordsAction,
  getAuditOSubmittedResponsesAction,
} from "../../../../features/okrs/server-actions/actions";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import AuditingContainer from "../../../../features/okrs/components/audit/audit-auditingContainer";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound } from "next/navigation";
import {
  Audit_KRResponse,
  Audit_OResponse,
} from "../../../../features/okrs/dtos/audit-dtos";
import { Me } from "../../../../features/users/dtos/users-dto";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getCurrentSystemPeriod } from "../../../../features/system/extension/system-extension";
export default async function AuditPage() {
  let auditObjectives: Audit_OResponse[];
  let auditKeyResults: Audit_KRResponse[];
  let me: Me;
  let submittedAuditOs: Audit_OResponse[];
  let submittedAuditKRs: Audit_KRResponse[];
  let systemPeriods: PeriodDto[];
  let currentSystemPeriod: PeriodDto;

  try {
    auditObjectives = unpackActionResponse(await getAuditO_RecordsAction());
    auditKeyResults = unpackActionResponse(await getAuditKR_RecordsAction());
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    submittedAuditOs = unpackActionResponse(
      await getAuditOSubmittedResponsesAction(),
    );
    submittedAuditKRs = unpackActionResponse(
      await getAuditKRSubmittedResponsesAction(),
    );
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
          {/* <div className="absolute right-26 flex">
            <CascadingDropdown />
          </div> */}
          <AuditingContainer
            auditObjetives={auditObjectives!.filter(
              (x) =>
                x.objective.okrperiodId ===
                systemPeriods.find(
                  (x) =>
                    x.okrYear === new Date().getFullYear().toString() &&
                    x.sysCode === "年度",
                )?.id,
            )}
            auditKeyResults={auditKeyResults!}
            me={me!}
            auditObjetivesSubmitted={submittedAuditOs!.filter(
              (x) =>
                x.objective.okrperiodId ===
                systemPeriods.find(
                  (x) =>
                    x.okrYear === new Date().getFullYear().toString() &&
                    x.sysCode === "年度",
                )?.id,
            )}
            auditKeyResultsSubmitted={submittedAuditKRs!}
            systemPeriods={systemPeriods.filter(
              (x) => x.isActive === 1 && x.isDeleted === 0,
            )}
            currentSystemPeriod={currentSystemPeriod}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
