"use server";

import { redirect, notFound } from "next/navigation";
import { AppError, AppErrorType } from "../../../../lib/error/app-error";
import { IInfiniteScrollData } from "../../../system/components/loading/useInfinite-scroll";
import { KeyResult, QueryObjectiveByTrackDto } from "../../dtos/okr-dtos";
import {
  getkeyResultsByOIdsAction,
  getobjectivesInTrackAction,
} from "../../server-actions/actions";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import ObjectiveList from ".";
import { SingleObjective } from "./single-objective";
import { getMeAction } from "../../../users/server-actions/user";
import { Me } from "../../../users/dtos/users-dto";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import { getCurrentSystemPeriod } from "../../../system/extension/system-extension";
import { getPeriodAction } from "../../../system/server-actions/actions";
import { FeedbackResponse } from "../../dtos/feedback-dtos";

export async function loadMoreObjectivesAction(
  query: QueryObjectiveByTrackDto,
): Promise<IInfiniteScrollData<JSX.Element>> {
  let objectives;
  let redirectUrl = null;
  let me: Me;
  let krs: KeyResult[];
  let currentSystemPeriod: PeriodDto;
  let systemPeriods: PeriodDto[] = []; let fbs: FeedbackResponse[] = [];
  try {
    objectives = unpackActionResponse(await getobjectivesInTrackAction(query));
    systemPeriods = unpackActionResponse(await getPeriodAction());

    currentSystemPeriod = getCurrentSystemPeriod(systemPeriods)!;
    me = unpackActionResponse(await getMeAction());
    const objectiveIds = objectives.map((x) => x.id);
    krs = unpackActionResponse(await getkeyResultsByOIdsAction(objectiveIds));
  } catch (e) {
    if (e instanceof AppError) {
      switch (e.errorData.code) {
        case AppErrorType.unauthorized:
          break;
        default:
          console.log(e.message);
          break;
      }
    }
  }

  if (!objectives) {
    return notFound();
  }

  return {
    lastItemId: objectives.at(-1)?.createOn?.toString() ?? null,
    nodes:
      objectives?.map((o) => (
        <SingleObjective
          key={o.id}
          me={me}
          objective={o}
          krs={krs}
          fbs={[]}
          systemPeriods={systemPeriods}
          currentSystemPeriod={currentSystemPeriod}
          season={currentSystemPeriod.sysCodeValueName}
        />
      )) ?? [],
  };
}
