"use server";
import React from "react";
import {
  getFeedbackResponsesAction,
  getKeyResultsAction,
  getkeyResultsByOIdsAction,
  getobjectivesInTrackAction,
} from "../../../../features/okrs/server-actions/actions";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound } from "next/navigation";
import {
  getDepartmentsAction,
  getFilterDepartmentsAction,
} from "../../../../features/baseInfo/server-actions/baseinfo";
import { Me } from "../../../../features/users/dtos/users-dto";
import {
  Department,
  FilterCompaniesDtos,
  Period,
} from "../../../../features/baseInfo/dtos/baseinfo-dtos";
import { KeyResult, Objective, QueryObjectiveByTrackDto } from "../../../../features/okrs/dtos/okr-dtos";
import AllOKRContainer from "../../../../features/okrs/components/create/allokr-container";
import { FeedbackResponse } from "../../../../features/okrs/dtos/feedback-dtos";
import { PeriodDto } from "../../../../features/system/dtos/system-dtos";
import { getPeriodAction } from "../../../../features/system/server-actions/actions";
import { formatDate, getCurrentSystemPeriod } from "../../../../features/system/extension/system-extension";

export default async function AllOkrPage() {
  let me: Me;
  let objectives: Objective[] = [];
  let meDepart: Department | undefined;
  let filterCompanyDtos: FilterCompaniesDtos;
  let krs: KeyResult[] = [];
  let fbs: FeedbackResponse[] = [];
  let systemPeriods: PeriodDto[] = [];
  let currentSystemPeriod: PeriodDto;

  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    systemPeriods = unpackActionResponse(await getPeriodAction());
    currentSystemPeriod = getCurrentSystemPeriod(systemPeriods)!; //season
    const currentPeriodOfYear = systemPeriods.find(x=>x.okrYear === currentSystemPeriod.okrYear && x.sysCodeValue === "AllSeason")
    const query :QueryObjectiveByTrackDto ={
    okrPeriodByYearId:  currentPeriodOfYear!.id,
    companyId:"",
      createOn: formatDate(new Date()) ,
      limit: 2
   }
    objectives = unpackActionResponse(await getobjectivesInTrackAction(query));
  
    meDepart = unpackActionResponse(
      await getDepartmentsAction(),
    ).departments.find((x) => x.id === me.companyId);
    filterCompanyDtos = unpackActionResponse(
      await getFilterDepartmentsAction(),
    );
    const objectiveIds = objectives.map(x=>x.id);
    krs =  unpackActionResponse(
      await getkeyResultsByOIdsAction(objectiveIds),
    );
    // for (const o of objectives) {
    //   const objectiveKrs = unpackActionResponse(
    //     await   getKeyResultsAction(o.id),
    //   );
    //   krs = krs.concat(objectiveKrs);
    // }

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
    <AllOKRContainer
      me={me}
      meDepart={meDepart!}
      filterCompanyDtos={filterCompanyDtos}
      objectives={objectives}
      krs={krs}
      fbs={fbs}
      systemPeriods={systemPeriods.filter(
        (x) => x.isActive === 1 && x.isDeleted === 0,
      )}
      currentSystemPeriod={currentSystemPeriod}
    ></AllOKRContainer>
  );
}
