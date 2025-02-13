import { FilterCompaniesDtos } from "../../dtos/baseinfo-dtos";
import { useState } from "react";
import {
  Objective,
  QueryObjectiveByTrackDto,
} from "../../../okrs/dtos/okr-dtos";
import { formatDate } from "../../../system/extension/system-extension";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getobjectivesInTrackAction, getRaingRecordsResponsesAction } from "../../../okrs/server-actions/actions";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import { RatingRecordResponse } from "../../../okrs/dtos/feedback-dtos";

interface Props {
  selectYear: string;
  systemPeriods: PeriodDto[];
  filterCompanyDtos: FilterCompaniesDtos;
  ratingRecords:RatingRecordResponse[];
  setRatingRecords: (rcs: RatingRecordResponse[]) => void;
  selectedCompany: number;
  
  setSelectedCompany: (value: number) => void;
}

export default function CompanySelectByRating({
  filterCompanyDtos,
  selectYear,
  systemPeriods,
  ratingRecords,
  setRatingRecords,
  selectedCompany,
  setSelectedCompany,
}: Props) {
  // const [obs, setObs] = useState<Objective[]>(objectives);
  // const [selectedCompany, setSelectedCompany] = useState<number>();
  //const [selectedDepartment, setSelectedDepartment] = useState<string>("");
 
  const yearPeriod = systemPeriods
  .find(x=>x.okrYear === selectYear && x.sysCodeValue === "AllSeason")
  var com = filterCompanyDtos.filterCompanies
    ? [
        { id: 0, name: "全公司" },
        ...filterCompanyDtos.filterCompanies.map((x) => ({
          id: x.sortId,
          name: x.companyName,
        })),
      ]
    : [];
  var de =
    filterCompanyDtos.filterDepartments! &&
    filterCompanyDtos.filterDepartments.flatMap((x) => [
      { companyId: x.sortId, name: x.departmentName },
    ]);
  const [companies, setCompanies] =
    useState<{ id: number; name: string }[]>(com);
  const [departments, setDepartments] =
    useState<{ companyId: number; name: string }[]>(de);
  const handleCompanyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const companyId = parseInt(e.target.value);
    const name = filterCompanyDtos.filterCompanies.find(
      (x) => x.sortId == companyId,
    )!;
    setSelectedCompany(companyId);
    //setSelectedDepartment("");
    let selectCompanyId = "";
    if (companyId === 0)selectCompanyId = "";
    if (companyId !== 0) {
      const companySelect = com.find((x) => x.id === companyId);
      selectCompanyId = filterCompanyDtos.filterCompanies.find(
        (x) => x.companyName === companySelect?.name,
      )?.companyId!;
    }
    
    if (companyId === 0) {
      const query: QueryObjectiveByTrackDto = {
        okrPeriodByYearId:yearPeriod?.id,
        companyId: "",
        createOn: formatDate(new Date()),
        limit: 100,
      };
     const ratings = unpackActionResponse(
            await getRaingRecordsResponsesAction(),
          )
      setRatingRecords(ratings.filter(x=>x.okrPeriodId === yearPeriod?.id) );
    } else {
      const query: QueryObjectiveByTrackDto = {
        okrPeriodByYearId: yearPeriod?.id,
        companyId: selectCompanyId,
        createOn: formatDate(new Date()),
        limit: 100,
      };
      console.log(ratingRecords)
      const ratings = unpackActionResponse(
        await getRaingRecordsResponsesAction(),
      )
      const selectCompany = com.find(x=>x.id === companyId);
      const ratingsOfYear = ratings.filter(x=>x.okrPeriodId === yearPeriod?.id);
      console.log(ratingsOfYear.filter(x=>x.companyName === selectCompany?.name ))
      setRatingRecords(ratingsOfYear.filter(x=>x.companyName === selectCompany?.name ));
    }
  };

  return (
    <>
      <div className="flex items-center">
        <label className="ml-2 mr-2 mt-0">公司範圍:</label>
        <select
          value={selectedCompany}
          onChange={handleCompanyChange}
          className="mr-3 border-2 border-slate-200 p-1.5"
        >
          <option disabled value="">
            選擇公司
          </option>
          {companies! &&
            companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
        </select>

        {/* {selectedCompany && selectedCompany !== undefined && selectedCompany !== 1 &&
      <select
        value={selectedDepartment || ''}
        onChange={handleDepartmentChange}
        className="p-1.5 border-2 border-slate-200 mr-3"
      >
        <option value="">選擇部門</option>
        {filteredDepartments.map((department) => (
          <option key={department.name} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>} */}
      </div>
    </>
  );
}
