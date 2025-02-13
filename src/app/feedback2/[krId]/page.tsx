"use server";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound, redirect } from "next/navigation";
import {
  getFeedbackResponsesAction,
  getKeyResultAction,
  getObjectiveAction,

} from "../../../../features/okrs/server-actions/actions";
import FeedbackContainer from "../../../../features/okrs/components/create/button/button-content/feedback/feedback-container";
import { FeedbackResponse } from "../../../../features/okrs/dtos/feedback-dtos";
import { Me } from "../../../../features/users/dtos/users-dto";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import {
  getCurrentSystemPeriod,
} from "../../../../features/system/extension/system-extension";
import { Objective } from "../../../../features/okrs/dtos/okr-dtos";

interface IFeedbackProps {
  params: { krId: string };
}

export default async function FeedbackPage2(props: IFeedbackProps) {
  const krId = props.params.krId;
  if (krId === null) notFound();
  let me: Me;
  let fbResponses: FeedbackResponse[];
  let systemPeriods: PeriodDto[] = [];
  let objective: Objective;
  let currentSystemPeriod: PeriodDto;
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null || me === undefined) notFound();
    const kr = unpackActionResponse(await getKeyResultAction(krId));

    const fbResponsesByO = unpackActionResponse(
      await getFeedbackResponsesAction(kr?.belongOid!),
    );
    systemPeriods = unpackActionResponse(await getPeriodAction());
    objective = unpackActionResponse(
          await getObjectiveAction(kr.belongOid!)
        )

    fbResponses = fbResponsesByO.filter((x) => x.keyResult.id === krId);
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
          isSingle={true}
        />
      </div>
    </DefaultLayout>
  );
}
