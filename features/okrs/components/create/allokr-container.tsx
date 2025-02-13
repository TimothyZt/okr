"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OKRCard from "./create-card";
import { Me } from "../../../users/dtos/users-dto";
import {
  Department,
  FilterCompaniesDtos,
} from "../../../baseInfo/dtos/baseinfo-dtos";
import {
  KeyResult,
  Objective,
  QueryObjectiveByTrackDto,
} from "../../dtos/okr-dtos";
import { useState } from "react";
import { FeedbackResponse } from "../../dtos/feedback-dtos";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import SystemYearSelect from "./header/select-system-year";
import CompanySelect from "../../../baseInfo/components/department/company-select";
import DownloadOKRProgressReport from "./button/button-content/download-report/okr-progress-report";
import { formatDate } from "../../../system/extension/system-extension";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import {
  getkeyResultsByOIdsAction,
  getobjectivesInTrackAction,
} from "../../server-actions/actions";
import ObjectiveList from "../objectives-load";

interface Props {
  me: Me;
  meDepart: Department;
  filterCompanyDtos: FilterCompaniesDtos;
  objectives: Objective[];
  krs: KeyResult[];
  fbs: FeedbackResponse[];
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
}

export default function AllOKRContainer({
  me,
  filterCompanyDtos,
  objectives,
  krs,
  fbs,
  systemPeriods,
  currentSystemPeriod,
}: Props) {
  let currentSystemPeriodByYear: PeriodDto;
  currentSystemPeriodByYear = systemPeriods.find(
    (x) =>
      x.okrYear === new Date().getFullYear().toString() && x.sysCode === "年度",
  )!;
  const [obs, setObs] = useState<Objective[]>(objectives); //filter

  const [anchorId, setAnchorId] = useState<string>(
    obs.findLast((obj) => true)?.createOn?.toString()!,
  ); //目前以date为锚点

  const [keyResults, setKeyResults] = useState<KeyResult[]>(krs);
  const [selectedCompany, setSelectedCompany] = useState<number>();
  // const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState(currentSystemPeriod.okrYear);
  const [season, setSeason] = useState(currentSystemPeriod?.sysCodeValueName);
  var com = filterCompanyDtos.filterCompanies
    ? [
        { id: 0, name: "全公司" },
        ...filterCompanyDtos.filterCompanies.map((x) => ({
          id: x.sortId,
          name: x.companyName,
        })),
      ]
    : [];
  async function handleSelectYearClick(value: string) {
    if (currentSystemPeriod.okrYear > value) {
      setSeason("第四季度");
    }
    if (currentSystemPeriod.okrYear < value) {
      setSeason("第一季度");
    }
    if (currentSystemPeriod.okrYear === value) {
      setSeason(currentSystemPeriod?.sysCodeValueName);
    }
    let systemPeriodIdByYearId = systemPeriods.find(
      (x) => x.okrYear === value,
    )?.id;

    let companyId = "";
    if (selectedCompany === 0) companyId = "";
    if (selectedCompany !== 0) {
      const companySelect = com.find((x) => x.id === selectedCompany);
      companyId = filterCompanyDtos.filterCompanies.find(
        (x) => x.companyName === companySelect?.name,
      )?.companyId!;
    }
    const query: QueryObjectiveByTrackDto = {
      okrPeriodByYearId: systemPeriodIdByYearId,
      companyId: companyId,
      createOn: formatDate(new Date()),
      limit: 2,
    };
    const os = unpackActionResponse(await getobjectivesInTrackAction(query));

    setObs(os);
    const oIds = os.map((x) => x.id);
    krs = unpackActionResponse(await getkeyResultsByOIdsAction(oIds));
    setKeyResults(krs);
  }

  return (
    <DefaultLayout me={me}>
      <div className="relative flex">
        <div className="absolute right-0 top-0 flex">
          {/* <DownloadOKRProgressReport
            systemPeriods={systemPeriods}
            currentSystemPeriod={currentSystemPeriod}
            me={me}
            filterCompanyDtos={filterCompanyDtos}
          /> */}
          <div className="dropdown dropdown-hover  h-10">
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
            {season}
          </div>
        </div>

        <div className="dropdown dropdown-hover absolute left-0 top-0 flex h-10 w-5/12">
          <CompanySelect
            filterCompanyDtos={filterCompanyDtos}
            setObs={setObs}
            selectedCompany={selectedCompany!}
            setSelectedCompany={setSelectedCompany}
            selectYear={selectedYear}
            systemPeriods={systemPeriods}
            setKeyResults={setKeyResults}
          ></CompanySelect>
        </div>
      </div>
      <div className="mt-16">
        {/* {obs.map((o) => (
          // eslint-disable-next-line react/jsx-key
          <OKRCard
            objective={o}
            keyResults={keyResults.filter((x) => x.belongOid === o.id)}
            isAllPage={true}
            feedbacks={fbs.filter((x) => x.keyResult.belongOid === o.id)}
            me={me}
            myRespCompany={me.departmentDto!}
            systemPeriods={systemPeriods}
            currentSystemPeriod={currentSystemPeriod}
            selectSeasonName={season}
          />
        ))} */}
        <ObjectiveList
          okrPeriodByYearId={
            systemPeriods.find(
              (x) =>
                x.okrYear === selectedYear && x.sysCodeValue === "AllSeason",
            )?.id??""
          }
          companyId={""}
        ></ObjectiveList>
      </div>
    </DefaultLayout>
  );
}
