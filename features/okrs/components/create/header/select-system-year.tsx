import React from "react";
import { Me } from "../../../../users/dtos/users-dto";
import CreateO from "../new/new-o";
import { PeriodDto } from "../../../../system/dtos/system-dtos";

interface Props {
  me: Me;
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  handleSelectYearClick:(value: string)=>void;//control objectives filter
}

export default function SystemYearSelect({
  systemPeriods,
  currentSystemPeriod,
  selectedYear,
  setSelectedYear,
  handleSelectYearClick
}: Props) {
  const yearList = systemPeriods
    .filter((x) => x.isDeleted === 0)
    .flatMap((s) => s.okrYear);
  const uniqueYearList = Array.from(new Set(yearList));
  const handleSelectYear=(value:string)=>{
    setSelectedYear(value);
    handleSelectYearClick(value);
  }
  return (
    <>
      <select
        value={selectedYear}
        onChange={(e) => handleSelectYear(e.target.value)}
        className="btn btn-sm h-9 w-28 rounded-md border-2 border-stroke bg-white"
        defaultValue={currentSystemPeriod?.okrYear + "年"}
      >
        {uniqueYearList.map((year, index) => (
          <option key={index} value={year}>
            {year}年
          </option>
        ))}
      </select>
    </>
  );
}
