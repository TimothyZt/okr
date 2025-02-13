"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound, redirect } from "next/navigation";
import { Me } from "../../../../features/users/dtos/users-dto";
import SystemPeriodContent from "../../../../features/system/components/period/period-content";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import SystemPeriodHeader from "../../../../features/system/components/period/period-header";
import { Objective, QueryObjectiveByTrackDto } from "../../../../features/okrs/dtos/okr-dtos";
import {
  getFeedbackResponsesAction,
  getobjectivesInTrackAction,
} from "../../../../features/okrs/server-actions/actions";
import { FeedbackResponse } from "../../../../features/okrs/dtos/feedback-dtos";
import { formatDate } from "../../../../features/system/extension/system-extension";
export default async function PeriodPage() {
  let me: Me;
  let periods: PeriodDto[];
  let objectives: Objective[] = [];
  let fbs: FeedbackResponse[] = [];
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    if (!me.roles.find((x) => x.roleName === "Admin")) {
      redirect("/system/employee");
    }
    const query: QueryObjectiveByTrackDto = {
          okrPeriodByYearId: "",
          companyId: "",
          createOn: formatDate(new Date()),
          limit: 100,
        };
    periods = unpackActionResponse(await getPeriodAction());
    objectives = unpackActionResponse(await getobjectivesInTrackAction(query));
    for (const o of objectives) {
      const objectiveFbs = unpackActionResponse(
        await getFeedbackResponsesAction(o.id),
      );
      fbs = fbs.concat(objectiveFbs);
    }
  } catch (error) {
    console.log(error);
    return notFound();
  }

  return (
    <DefaultLayout me={me}>
      <div className="flex h-screen w-full flex-col">
        <SystemPeriodHeader me={me}></SystemPeriodHeader>
        <SystemPeriodContent
          periods={periods}
          objectives={objectives}
          fbs={fbs}
        ></SystemPeriodContent>
      </div>
    </DefaultLayout>
  );
}
