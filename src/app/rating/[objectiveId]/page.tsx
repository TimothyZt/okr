"use server";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RatingContainer from "../../../../features/okrs/components/create/button/button-content/rating/rating-container";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound } from "next/navigation";
import {
  getFeedbackResponsesAction,
  getObjectiveAction,
} from "../../../../features/okrs/server-actions/actions";
import { getCurrentPeriodAction } from "../../../../features/baseInfo/server-actions/baseinfo";
import { Me } from "../../../../features/users/dtos/users-dto";
import { FeedbackResponse } from "../../../../features/okrs/dtos/feedback-dtos";
import { Period } from "../../../../features/baseInfo/dtos/baseinfo-dtos";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { Objective } from "../../../../features/okrs/dtos/okr-dtos";
import { getCurrentSystemPeriod } from "../../../../features/system/extension/system-extension";
interface IRatingProps {
  params: { objectiveId: string };
}

export default async function RatingPage(props: IRatingProps) {
  let me: Me;
  let fbResponses: FeedbackResponse[];
  let currentPeriod: PeriodDto;
  let fbs: FeedbackResponse[];
  let systemPeriods: PeriodDto[] = [];
  const objectiveId = props.params.objectiveId;
  if (objectiveId === null) notFound();
  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    fbResponses = unpackActionResponse(
      await getFeedbackResponsesAction(objectiveId),
    );

    fbs = fbResponses.filter((x) =>
      x.feedback !== null ? x.feedback?.isSubmitted === 1 : 1,
    );
    systemPeriods = unpackActionResponse(await getPeriodAction());
    currentPeriod = getCurrentSystemPeriod(systemPeriods)!;
  } catch (error) {
    console.log(error);
    return notFound();
  }
  return (
    <DefaultLayout me={me}>
      <RatingContainer
        fbResponses={fbs.filter(
          (x) =>
            x.feedback &&
            x.feedback.isSubmitted === 1 &&
            x.feedback.isSecondSubmitted === 1,
        )}
        objective={
        unpackActionResponse(
                  await getObjectiveAction(objectiveId)
                )
        }
        currentPeriod={currentPeriod}
        systemPeriods={systemPeriods}
      />
    </DefaultLayout>
  );
}
