import { FilterCompaniesDtos } from "../../dtos/baseinfo-dtos";
import { useState } from "react";
import {
  KeyResult,
  Objective,
  QueryObjectiveByTrackDto,
} from "../../../okrs/dtos/okr-dtos";
import { formatDate } from "../../../system/extension/system-extension";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getkeyResultsByOIdsAction, getobjectivesInTrackAction } from "../../../okrs/server-actions/actions";
import { PeriodDto } from "../../../system/dtos/system-dtos";

interface Props {
  selectYear: string;
  systemPeriods: PeriodDto[];
  filterCompanyDtos: FilterCompaniesDtos;
  setKeyResults: (krs: KeyResult[]) => void;
  setObs: (obs: Objective[]) => void;
  selectedCompany: number;
  setSelectedCompany: (value: number) => void;
}

export default function CompanySelect({
  filterCompanyDtos,
  selectYear,
  systemPeriods,
  setObs,setKeyResults,
  selectedCompany,
  setSelectedCompany,
}: Props) {
  // const [obs, setObs] = useState<Objective[]>(objectives);
  // const [selectedCompany, setSelectedCompany] = useState<number>();
  //const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const yearPeriod = systemPeriods.find(x=>x.okrYear === selectYear && x.sysCodeValue === "AllSeason");
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
      const os = unpackActionResponse(await getobjectivesInTrackAction(query));
      setObs(os);
      const krs = unpackActionResponse(await getkeyResultsByOIdsAction(os.map(x=>x.id)));
      setKeyResults(krs);
    } else {
      const query: QueryObjectiveByTrackDto = {
        okrPeriodByYearId: yearPeriod?.id,
        companyId: selectCompanyId,
        createOn: formatDate(new Date()),
        limit: 100,
      };
      const os = unpackActionResponse(await getobjectivesInTrackAction(query));
      setObs(os);
      const krs = unpackActionResponse(await getkeyResultsByOIdsAction(os.map(x=>x.id)));
      setKeyResults(krs);
      // const oIds = os.map((x) => x.id);
      // let krss:KeyResult[]=[];
      // for (const o of os) {
      //     const objectiveKrs = unpackActionResponse(
      //       await   getKeyResultsAction(o.id),
      //     );
      //     krss = krss.concat(objectiveKrs);
      //   }
      //   setKeyResults(krss)
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
