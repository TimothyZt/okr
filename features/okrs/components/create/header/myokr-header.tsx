"use client";
import React, { useState } from "react";
import { Me } from "../../../../users/dtos/users-dto";
import CreateO from "../new/new-o";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import SystemYearSelect from "./select-system-year";

interface Props {
  me: Me;
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  season: string;
  setSeason: (value: string) => void;
}

export default function MyOKRHeader({
  me,
  systemPeriods,
  currentSystemPeriod,
  selectedYear,
  setSelectedYear,
  season,
  setSeason,
}: Props) {
  function handleSelectYearClick(value: string) {
    if (currentSystemPeriod.okrYear > value) {
      setSeason("第四季度");
    }
    if (currentSystemPeriod.okrYear < value) {
      setSeason("第一季度");
    }
    if (currentSystemPeriod.okrYear === value) {
      setSeason(currentSystemPeriod?.sysCodeValueName);
    }
  }

  return (
    <>
      <div className="relative flex">
        <div className="absolute right-0 top- flex">
          <CreateO
            btnCss="btn btn-success btn-sm mr-2 block text-white bg-teal-600 rounded-md mt-0.5"
            btnName="+添加O(目標)"
            me={me}
            myRespCompany={me.departmentDto!}
            systemPeriods={systemPeriods.filter(
              (x) => x.isActive === 1 && x.isDeleted === 0,
            )}
          />
          <div className="dropdown dropdown-hover h-10">
            <SystemYearSelect
              me={me}
              systemPeriods={systemPeriods}
              currentSystemPeriod={currentSystemPeriod}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              handleSelectYearClick={handleSelectYearClick}
            ></SystemYearSelect>
          </div>
          <div
            tabIndex={0}
            role="button"
            aria-disabled={true}
            className="btn btn-sm ml-2 h-[36px] w-25 rounded-md bg-white"
          >
            {season}{" "}
          </div>
        </div>
      </div>
    </>
  );
}
