"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  getFeedbackResponsesAction,
  getKeyResultsAction,
  getObjectivesAction,
} from "../../../../features/okrs/server-actions/actions";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { notFound } from "next/navigation";
import { getMeAction } from "../../../../features/users/server-actions/user";
import {
  getDepartmentsAction,
} from "../../../../features/baseInfo/server-actions/baseinfo";
import {
  Department,
} from "../../../../features/baseInfo/dtos/baseinfo-dtos";
import { KeyResult, Objective } from "../../../../features/okrs/dtos/okr-dtos";
import { Me } from "../../../../features/users/dtos/users-dto";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import { getCurrentSystemPeriod } from "../../../../features/system/extension/system-extension";
import { FeedbackResponse } from "../../../../features/okrs/dtos/feedback-dtos";
import MyOKRContainer from "../../../../features/okrs/components/create/myokr-container";

export default async function MyOKRPage() {
  let me: Me;
  let objectives: Objective[];
  let meDepart: Department | undefined;
  let systemPeriods: PeriodDto[];
  let currentSystemPeriod: PeriodDto;
  let krs: KeyResult[] = [];
  let fbs: FeedbackResponse[] = [];
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    objectives = unpackActionResponse(await getObjectivesAction());
    meDepart = unpackActionResponse(
      await getDepartmentsAction(),
    ).departments.find((x) => x.id === me.companyId);
    systemPeriods = unpackActionResponse(await getPeriodAction());
    currentSystemPeriod = getCurrentSystemPeriod(systemPeriods)!;

    for (const o of objectives) {
      const objectiveKrs = unpackActionResponse(
        await getKeyResultsAction(o.id),
      );
      krs = krs.concat(objectiveKrs);
    }

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
      <MyOKRContainer
        me={me}
        systemPeriods={systemPeriods.filter((x) => x.sysCode === "年度")}
        currentSystemPeriod={currentSystemPeriod}
        objectives={objectives}
        krs={krs}
        fbs={fbs}
      ></MyOKRContainer>
    </DefaultLayout>
  );
}
