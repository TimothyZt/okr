"use client";
import { Feedback, FeedbackResponse } from "../../../../../dtos/feedback-dtos";
import { useState } from "react";
import RatingCard from "./rating-card";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";
import { Objective } from "../../../../../dtos/okr-dtos";

interface Props {
  fbResponses: FeedbackResponse[];
  objective: Objective;
  currentPeriod: PeriodDto;
  systemPeriods: PeriodDto[];
}

export default function RatingContainer({
  fbResponses,
  objective,
  systemPeriods,
  currentPeriod,
}: Props) {
  const currentSystemPeriod = currentPeriod;
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
  const [selectedQuarter, setSelectedQuarter] = useState(select);
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
          <RatingCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objectiveId={objective.id}
            currentPeriod={currentPeriod}
          />
        ))}
      {selectedQuarter === "SecondSeason" &&
        data2.map((fb, key) => (
          <RatingCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objectiveId={objective.id}
            currentPeriod={currentPeriod}
          />
        ))}
      {selectedQuarter === "ThirdSeason" &&
        data3.map((fb, key) => (
          <RatingCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objectiveId={objective.id}
            currentPeriod={currentPeriod}
          />
        ))}
      {selectedQuarter === "ForthSeason" &&
        data4.map((fb, key) => (
          <RatingCard
            key={key}
            keyResult={fb.keyResult}
            feedback={fb.feedback!}
            period={selectedQuarter}
            objectiveId={objective.id}
            currentPeriod={currentPeriod}
          />
        ))}
    </>
  );
}
