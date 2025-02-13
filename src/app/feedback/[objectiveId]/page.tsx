"use server";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound, redirect } from "next/navigation";
import {
  getFeedbackResponsesAction,
  getObjectiveAction,
} from "../../../../features/okrs/server-actions/actions";
import FeedbackContainer from "../../../../features/okrs/components/create/button/button-content/feedback/feedback-container";
import { getCurrentPeriodAction } from "../../../../features/baseInfo/server-actions/baseinfo";
import { Period } from "../../../../features/baseInfo/dtos/baseinfo-dtos";
import { FeedbackResponse } from "../../../../features/okrs/dtos/feedback-dtos";
import { Me } from "../../../../features/users/dtos/users-dto";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import {
  getCurrentSystemPeriod,
  getCurrentSystemPeriodByOKRPeriodId,
} from "../../../../features/system/extension/system-extension";
import { Objective } from "../../../../features/okrs/dtos/okr-dtos";

interface IFeedbackProps {
  params: { objectiveId: string };
}

export default async function FeedbackPage(props: IFeedbackProps) {
  const objectiveId = props.params.objectiveId;
  console.log(objectiveId);
  if (objectiveId === null) notFound();
  let me: Me;
  let fbResponses: FeedbackResponse[];
  let systemPeriods: PeriodDto[] = [];
  let objective: Objective;
  let currentSystemPeriod: PeriodDto;
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null || me === undefined) notFound();
    fbResponses = unpackActionResponse(
      await getFeedbackResponsesAction(objectiveId),
    );
    systemPeriods = unpackActionResponse(await getPeriodAction());
    objective =unpackActionResponse(
          await getObjectiveAction(objectiveId)
        )
    currentSystemPeriod = getCurrentSystemPeriod(systemPeriods)!;
  } catch (error) {
    console.log(error);
    return notFound();
  }

  return (
    <DefaultLayout me={me!}>
      <div className="flex h-screen w-full flex-col">
        <FeedbackContainer
          fbResponses={fbResponses}
          objective={objective}
          me={me!}
          systemPeriods={systemPeriods}
          currentSystemPeriod={currentSystemPeriod!}
          isSingle={false}
        />
      </div>
    </DefaultLayout>
  );
}
