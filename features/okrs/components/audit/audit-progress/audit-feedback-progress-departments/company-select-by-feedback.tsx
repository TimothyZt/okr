import { useState } from "react";
import { FilterCompaniesDtos } from "../../../../../baseInfo/dtos/baseinfo-dtos";
import { FeedbackAuditResponseByDetail } from "../../../../dtos/feedback-dtos";
import { unpackActionResponse } from "../../../../../../lib/server-actions/action-response";
import { getFeedbackResponsesByFirstStageAction } from "../../../../server-actions/actions";
import { formatDate } from "../../../../../system/extension/system-extension";
import { PeriodDto } from "../../../../../system/dtos/system-dtos";

interface Props {
  filterCompanyDtos: FilterCompaniesDtos;
  setFbds: (fbds: FeedbackAuditResponseByDetail[]) => void;
  selectedCompany: number;
  setSelectedCompany: (value: number) => void;
  selectedYear: string;
  systemPeriods: PeriodDto[];
}

export default function CompanySelectByFeedback({
  filterCompanyDtos,
  selectedYear,
  setFbds,
  selectedCompany,
  setSelectedCompany,
  systemPeriods,
}: Props) {
  // const [obs, setObs] = useState<Objective[]>(objectives);
  // const [selectedCompany, setSelectedCompany] = useState<number>();
  //const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const yearPeriod = systemPeriods.find(
    (x) => x.okrYear === selectedYear && x.sysCodeValue === "AllSeason",
  )!;
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

    if (companyId === 0) {
      const fbds = unpackActionResponse(
        await getFeedbackResponsesByFirstStageAction(yearPeriod.id),
      );
      setFbds(fbds);
    } else {
      const fbds = unpackActionResponse(
        await getFeedbackResponsesByFirstStageAction(yearPeriod.id),
      );
      setFbds(fbds.filter((x) => x.departmentName === name.companyName));
    }
  };

  return (
    <>
      <label className="ml-2 mr-2 mt-2">公司範圍:</label>
      <div className="flex items-center">
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
