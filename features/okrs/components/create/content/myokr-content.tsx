"use client";
import React, { useState } from "react";
import { Me } from "../../../../users/dtos/users-dto";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import OKRCard from "../create-card";
import { KeyResult, Objective } from "../../../dtos/okr-dtos";
import { Period } from "../../../../baseInfo/dtos/baseinfo-dtos";
import { FeedbackResponse } from "../../../dtos/feedback-dtos";

interface Props {
  me: Me;
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  objectives: Objective[];
  krs: KeyResult[];
  fbs: FeedbackResponse[];
  selectedYear: string;
  selectSeasonName:string
}

export default function MyOKRContent({
  me,
  systemPeriods,
  currentSystemPeriod,
  objectives,
  krs,
  fbs,
  selectedYear,selectSeasonName
}: Props) {
  const systemPeriodIdByYear = systemPeriods.find(
    (x) => x.okrYear === selectedYear,
  );
  let os = objectives.filter((x) => x.okrperiodId === systemPeriodIdByYear?.id);
  return (
    <>
      <div className="mt-16">
        {os.map((o) => (
          // eslint-disable-next-line react/jsx-key
          <OKRCard
            currentSystemPeriod={currentSystemPeriod}
            systemPeriods={systemPeriods.filter(
              (x) => x.isActive === 1 && x.isDeleted === 0
            )}
            objective={o}
            keyResults={krs.filter((x) => x.belongOid === o.id)}
            isAllPage={false}
            feedbacks={fbs.filter((x) => x.keyResult.belongOid === o.id)}
            me={me}
            myRespCompany={me.departmentDto!} selectSeasonName={selectSeasonName}          />
        ))}
      </div>
    </>
  );
}
