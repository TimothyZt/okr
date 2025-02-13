"use client";
import { useState } from "react";
import { Period } from "../../../baseInfo/dtos/baseinfo-dtos";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import { Me } from "../../../users/dtos/users-dto";
import { FeedbackResponse } from "../../dtos/feedback-dtos";
import { Objective, KeyResult } from "../../dtos/okr-dtos";
import MyOKRContent from "./content/myokr-content";
import MyOKRHeader from "./header/myokr-header";

interface Props {
  me: Me;
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  objectives: Objective[];
  krs: KeyResult[];
  fbs: FeedbackResponse[];
}

export default function MyOKRContainer({
  me,
  systemPeriods,
  currentSystemPeriod,
  objectives,
  krs,
  fbs,
}: Props) {
  const [selectedYear, setSelectedYear] = useState(
    currentSystemPeriod?.okrYear,
  );
  const [season, setSeason] = useState(currentSystemPeriod?.sysCodeValueName);
  return (
    <>
      <MyOKRHeader
        me={me}
        systemPeriods={systemPeriods}
        currentSystemPeriod={currentSystemPeriod}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        season={season}
        setSeason={setSeason}
      />
      <MyOKRContent
        me={me}
        systemPeriods={systemPeriods}
        currentSystemPeriod={currentSystemPeriod}
        objectives={objectives}
        krs={krs}
        fbs={fbs}
        selectedYear={selectedYear}
        selectSeasonName={season}
      />
    </>
  );
}
