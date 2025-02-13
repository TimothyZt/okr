import React, { useState } from "react";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";
import { Me } from "../../../../../../users/dtos/users-dto";
import SystemYearSelect from "../../../header/select-system-year";
import CompanySelect from "../../../../../../baseInfo/components/department/company-select";
import { FilterCompaniesDtos } from "../../../../../../baseInfo/dtos/baseinfo-dtos";
import CompanySelectByProgressFeedback from "../../../../../../baseInfo/components/department/company-select-rating";
import { RatingRecordResponse } from "../../../../../dtos/feedback-dtos";

class MockNextApiResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: any;

  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.body = "";
  }

  setHeader(name: string, value: string): void {
    this.headers[name] = value;
  }

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  send(data: any): this {
    this.body = data;
    return this;
  }
}

interface Props {
  me: Me;
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  handleSelectYearClick: (value: string) => void;
  filterCompanyDtos: FilterCompaniesDtos;
  ratingRecords:RatingRecordResponse[];
  setRatingRecords: (rcs: RatingRecordResponse[]) => void;
}
export default function RatingHeader({
  me,
  systemPeriods,
  currentSystemPeriod,
  selectedYear,
  setSelectedYear,
  handleSelectYearClick,
  filterCompanyDtos,
  setRatingRecords, ratingRecords
}: Props) {
  const [selectedCompany, setSelectedCompany] = useState<number>();
  return (
    <>
      {/* <div className="dropdown dropdown-hover absolute left-8 ml-6 flex h-10 w-8/12">
        <label className=" ml-2 mr-2 mt-2">公司範圍: </label>
        <RatingCascading></RatingCascading>
      </div> */}
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
        <div className="dropdown dropdown-hover flex h-10">
          <CompanySelectByProgressFeedback
            filterCompanyDtos={filterCompanyDtos}
            setRatingRecords={setRatingRecords}
            selectedCompany={selectedCompany!}
            setSelectedCompany={setSelectedCompany}
            selectYear={selectedYear}
            systemPeriods={systemPeriods}
            ratingRecords={ratingRecords}
          ></CompanySelectByProgressFeedback>
        </div>
      </div>
    </>
  );
}
