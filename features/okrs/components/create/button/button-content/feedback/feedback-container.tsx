"use client";
import { Period } from "../../../../../../baseInfo/dtos/baseinfo-dtos";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";
import { getCurrentSystemPeriodByOKRPeriodId } from "../../../../../../system/extension/system-extension";
import { Me } from "../../../../../../users/dtos/users-dto";
import { Feedback, FeedbackResponse } from "../../../../../dtos/feedback-dtos";
import { Objective } from "../../../../../dtos/okr-dtos";
import TrackFeedbackCard from "./feedback-card";
import { useState } from "react";

interface Props {
  fbResponses: FeedbackResponse[];
  objective: Objective;
  me: Me;
  currentSystemPeriod: PeriodDto;
  systemPeriods: PeriodDto[];
  isSingle: boolean;
}

export default function FeedbackContainer({
  fbResponses,
  objective,
  me,
  currentSystemPeriod,
  systemPeriods,
  isSingle,
}: Props) {
  const periodByO = systemPeriods.find(x=>x.id === objective.okrperiodId)
  let select = currentSystemPeriod.sysCodeValue;
  if (currentSystemPeriod.okrYear > periodByO?.okrYear!) {
    select = "ForthSeason";
  }
  if (currentSystemPeriod.okrYear < periodByO?.okrYear!) {
    select = "FirstSeason";
  }
  if (currentSystemPeriod.okrYear === periodByO?.okrYear!) {
    select = currentSystemPeriod?.sysCodeValue;
  }
  const [selectedQuarter, setSelectedQuarter] = useState(
    select
  );
  const quarterMapping: Record<string, string> = {
    FirstSeason: "第一季度",
    SecondSeason: "第二季度",
    ThirdSeason: "第三季度",
    ForthSeason: "第四季度",
  };
  let data1 = fbResponses.filter((x) => x.period === "FirstSeason");
  let data2 = fbResponses.filter((x) => x.period === "SecondSeason");
  let data3 = fbResponses.filter((x) => x.period === "ThirdSeason");
  let data4 = fbResponses.filter((x) => x.period === "ForthSeason");
  let i1 = 1;
  let i2 = 1;
  let i3 = 1;
  let i4 = 1;
  data1.forEach((element) => {
    element.keyResult.sortId = i1++;
  });
  data2.forEach((element) => {
    element.keyResult.sortId = i2++;
  });
  data3.forEach((element) => {
    element.keyResult.sortId = i3++;
  });
  data4.forEach((element) => {
    element.keyResult.sortId = i4++;
  });
  return (
    <>
      <div className="relative flex">
        <div className="dropdown dropdown-hover absolute right-0 top-0 h-10">
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="btn btn-sm w-40 rounded-md bg-white"
          >
            {Object.keys(quarterMapping).map((quarter) => (
              <option key={quarter} value={quarter}>
                {quarterMapping[quarter]}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedQuarter === "FirstSeason" &&
        data1.map((fb, key) => (
          <TrackFeedbackCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objective={objective}
            me={me}
            currentSystemPeriod={currentSystemPeriod!}
            isSingle={isSingle}
          />
        ))}
      {selectedQuarter === "SecondSeason" &&
        data2.map((fb, key) => (
          <TrackFeedbackCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objective={objective}
            me={me}
            currentSystemPeriod={currentSystemPeriod!}
            isSingle={isSingle}
          />
        ))}
      {selectedQuarter === "ThirdSeason" &&
        data3.map((fb, key) => (
          <TrackFeedbackCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objective={objective}
            me={me}
            currentSystemPeriod={currentSystemPeriod!}
            isSingle={isSingle}
          />
        ))}
      {selectedQuarter === "ForthSeason" &&
        data4.map((fb, key) => (
          <TrackFeedbackCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objective={objective}
            me={me}
            currentSystemPeriod={currentSystemPeriod!}
            isSingle={isSingle}
          />
        ))}
    </>
  );
}
