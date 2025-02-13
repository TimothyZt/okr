"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RatingHeader from "./rating-header";
import RatingTable from "./rating-table";
import { Me } from "../../../../../../users/dtos/users-dto";
import { RatingRecordResponse } from "../../../../../dtos/feedback-dtos";
import { useState } from "react";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";
import { unpackActionResponse } from "../../../../../../../lib/server-actions/action-response";
import { getRaingRecordsResponsesAction } from "../../../../../server-actions/actions";
import { FilterCompaniesDtos } from "../../../../../../baseInfo/dtos/baseinfo-dtos";
import CompanySelectByRating from "../../../../../../baseInfo/components/department/company-select-rating";
import SystemYearSelect from "../../../header/select-system-year";

interface Props {
  me: Me;
  ratingRecords: RatingRecordResponse[];
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  filterCompanyDtos: FilterCompaniesDtos;
}

export default function RatingTableContainer({
  me,
  ratingRecords,
  systemPeriods,
  currentSystemPeriod,
  filterCompanyDtos,
}: Props) {
  const [selectedYear, setSelectedYear] = useState(currentSystemPeriod.okrYear);
  const [ratingRecordList, SetRatingRecordList] =
    useState<RatingRecordResponse[]>(ratingRecords);
  async function handleSelectYearClick(value: string) {
    const ratingRecs = unpackActionResponse(
      await getRaingRecordsResponsesAction(),
    );

    let systemPeriodIdByYear = systemPeriods.find((x) => x.okrYear === value);
    SetRatingRecordList(
      ratingRecs.filter((x) => x.okrPeriodId === systemPeriodIdByYear?.id),
    );
  }
    const [selectedCompany, setSelectedCompany] = useState<number>();
  
  return (
    <DefaultLayout me={me!}>
      <div className="flex h-screen w-full flex-col">
        {/* <RatingHeader
          me={me}
          systemPeriods={systemPeriods}
          currentSystemPeriod={currentSystemPeriod}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          handleSelectYearClick={handleSelectYearClick}
          filterCompanyDtos={filterCompanyDtos}
          setRatingRecords={SetRatingRecordList}
          ratingRecords={ratingRecords}
        /> */}
        <div className="absolute right-12 mr-5 flex">
                <div className="dropdown dropdown-hover  mr-4 mt-1 h-10">
                  <SystemYearSelect
                    me={me}
                    systemPeriods={systemPeriods}
                    currentSystemPeriod={currentSystemPeriod}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    handleSelectYearClick={handleSelectYearClick}
                  ></SystemYearSelect>
                </div>
                {/* <div className="dropdown dropdown-hover flex h-10">
                  <CompanySelectByRating
                  selectYear ={selectedYear}
                    filterCompanyDtos={filterCompanyDtos}
                    setRatingRecords={ SetRatingRecordList}
                    selectedCompany={selectedCompany!}
                    setSelectedCompany={setSelectedCompany}
                    systemPeriods={systemPeriods}
                    ratingRecords={ratingRecords}
                  ></CompanySelectByRating>
                </div> */}
              </div>
        <RatingTable
          ratingRecords={ratingRecordList}
          currentPeriod={currentSystemPeriod}
          systemPeriods={systemPeriods} setRatingRecords={SetRatingRecordList}        />
      </div>
    </DefaultLayout>
  );
}
