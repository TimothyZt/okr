"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { useState } from "react";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import { Me } from "../../../../users/dtos/users-dto";
import SystemYearSelect from "../../create/header/select-system-year";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import {
  getFeedbackAuditResponsesAction,
  getFeedbackResponsesByFirstStageAction,
} from "../../../server-actions/actions";
import AuditFeedbackTable from "./audit-feedback-progress-content/audit-feedback-table";
import {
  FeedbackAuditRequest,
  FeedbackAuditResponse,
  FeedbackAuditResponseByDetail,
} from "../../../dtos/feedback-dtos";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { formatDate } from "../../../../system/extension/system-extension";
import CompanySelect from "../../../../baseInfo/components/department/company-select";
import { FilterCompaniesDtos } from "../../../../baseInfo/dtos/baseinfo-dtos";
import CompanySelectByFeedback from "./audit-feedback-progress-departments/company-select-by-feedback";

interface Props {
  me: Me;
  currentSystemPeriod: PeriodDto;
  systemPeriods: PeriodDto[];
  isAudit: boolean;
  filterCompanyDtos: FilterCompaniesDtos;
}

export default function AuditFeedbackProgressContainer({
  me,
  currentSystemPeriod,
  systemPeriods,
  isAudit,
  filterCompanyDtos,
}: Props) {
  const [fbs, setFbs] = useState<FeedbackAuditResponse[]>([]);
  const [fbds, setFbds] = useState<FeedbackAuditResponseByDetail[]>([]);
  const [rolee, setRolee] = useState<string>("HeadCompanyPreliminaryReviewer");
  const [selectedYear, setSelectedYear] = useState(
    currentSystemPeriod?.okrYear,
  );
  const [selectedSeason2, setSelectedSeason2] = useState(currentSystemPeriod);
  let selectedSeason = currentSystemPeriod;
  async function handleSelectYearClick(value: string) {
    let selectSeason = currentSystemPeriod;
    if (currentSystemPeriod.okrYear > value) {
      selectSeason = systemPeriods.find(
        (x) => x.okrYear === value && x.sysCodeValueName === "第四季度",
      )!;
    }
    if (currentSystemPeriod.okrYear < value) {
      selectSeason = systemPeriods.find(
        (x) => x.okrYear === value && x.sysCodeValueName === "第一季度",
      )!;
    }
    if (currentSystemPeriod.okrYear === value) {
      selectSeason = currentSystemPeriod;
    }
    selectedSeason = selectSeason;
    setSelectedSeason2(selectSeason);
    let systemPeriodIdByYear = systemPeriods.find((x) => x.okrYear === value);
    const query: FeedbackAuditRequest = {
      category: rolee,
      periodBySeasonId: selectedSeason2.id,
      okrPeriodByYearId: systemPeriodIdByYear?.id,
      createOn: formatDate(new Date()),
      limit: 100,
    };

    const fbdss = unpackActionResponse(
      await getFeedbackResponsesByFirstStageAction(systemPeriodIdByYear?.id!),
    );
    const year = systemPeriods.find((x) => x.okrYear === value);
    setFbds(fbdss.filter((x) => x.okrPeriodByYearId === year?.id));
    const fbs = unpackActionResponse(
      await getFeedbackAuditResponsesAction(query),
    );
    setFbs(fbs);
    setSelectedCompany(0);
  }
  const handleCategoryClick = async (role: string) => {
    setRolee(role);
    let systemPeriodIdByYear = systemPeriods.find(
      (x) => x.okrYear === selectedYear,
    );
    if (role === "SubsidiaryCompanyWriter") {
      const oss = unpackActionResponse(
        await getFeedbackResponsesByFirstStageAction(systemPeriodIdByYear?.id!),
      );

      const year = systemPeriods.find(
        (x) => x.okrYear === selectedSeason.okrYear,
      );

      setFbds(oss);
    } else {
      const query: FeedbackAuditRequest = {
        category: role,
        periodBySeasonId: selectedSeason.id,
        okrPeriodByYearId: systemPeriodIdByYear?.id,
        createOn: formatDate(new Date()),
        limit: 100,
      };
      const fbs = unpackActionResponse(
        await getFeedbackAuditResponsesAction(query),
      );
      setFbs(fbs);
    }
  };
  const handleClick = (krId: string) => {
    window.open("/feedback2/" + krId, "_blank");
  };
  const [selectedCompany, setSelectedCompany] = useState<number>();
  return (
    <>
      <div className="absolute right-30 flex">
        <div className="mr-2 flex">
          <label className="mr-1 mt-2">年份选择:</label>
          <SystemYearSelect
            me={me}
            systemPeriods={systemPeriods}
            currentSystemPeriod={currentSystemPeriod}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            handleSelectYearClick={handleSelectYearClick}
          ></SystemYearSelect>
        </div>
        {!isAudit && (
          <div className="flex">
            <CompanySelectByFeedback
              filterCompanyDtos={filterCompanyDtos}
              setFbds={setFbds}
              selectedCompany={selectedCompany!}
              setSelectedCompany={setSelectedCompany}
              selectedYear={selectedYear}
              systemPeriods={systemPeriods}
            ></CompanySelectByFeedback>
          </div>
        )}
      </div>
      {isAudit && (
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0  border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12 ml-6",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          onSelectionChange={(key: React.Key) =>
            handleCategoryClick(key.toString())
          }
        >
          <Tab key="HeadCompanyPreliminaryReviewer" title="總公司初審">
            {" "}
            <AuditFeedbackTable
              isExpanded={false}
              type={"HeadCompanyPreliminaryReviewer"}
              feedbackResponses={fbs}
              me={me}
            ></AuditFeedbackTable>
          </Tab>
          <Tab key="SubsidiaryCompanyResponsiblePerson" title="子公司負責人">
            <AuditFeedbackTable
              isExpanded={false}
              type={"SubsidiaryCompanyResponsiblePerson"}
              feedbackResponses={fbs}
              me={me}
            ></AuditFeedbackTable>
          </Tab>
        </Tabs>
      )}
      {!isAudit && (
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0  border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12 ml-6",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          onSelectionChange={(key: React.Key) =>
            handleCategoryClick(key.toString())
          }
        >
          <Tab key="SubsidiaryCompanyWriter" title="反饋審核進度表">
            <div className="flex">
              <Table aria-label="Example static collection table w-3/12">
                <TableHeader>
                  <TableColumn className="w-40 border-2 border-slate-300 bg-white text-center text-sm shadow-14">
                    目標(O)描述
                  </TableColumn>
                  <TableColumn className="w-40 border-2 border-slate-300 bg-white text-center text-sm shadow-14">
                    所属公司
                  </TableColumn>
                  <TableColumn className="w-28 border-2 border-slate-300 bg-white text-center text-sm shadow-14">
                    OKR負責人
                  </TableColumn>
                  <TableColumn className="border-2 border-slate-300 bg-white text-center text-sm shadow-14">
                    <div className="flex">
                      <div className="w-8/12">KR描述</div>
                      <div className="w-4/12">反饋狀態</div>
                    </div>
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {fbds.map((fbd, key) => (
                    <TableRow key={key}>
                      <TableCell className="border-2 border-slate-300 bg-white text-center text-sm">
                        {fbd.objectiveDescription + ""}
                      </TableCell>
                      <TableCell className="border-2 border-slate-300 bg-white text-center text-sm">
                        {fbd.departmentName}
                      </TableCell>
                      <TableCell className="border-2 border-slate-300 bg-white text-center text-sm">
                        {fbd.objectivePersonInCharge}
                      </TableCell>
                      <TableCell className="border-2 border-slate-300 bg-white text-center text-sm">
                        <div className="flex-col">
                          {fbd.feedbackResponses
                            .filter(
                              (x) => x.period === selectedSeason2.sysCodeValue,
                            )
                            .map((fb, key2) => (
                              <div key={key2} className="flex">
                                <div className=" w-8/12 border-b-2 border-stroke p-2">
                                  {fb.keyResult.description}
                                </div>
                                <div className="w-4/12 border-b-2 border-l-2 border-stroke text-center">
                                  {fb.status === "反饋未提交" && (
                                    <Button
                                      onClick={() =>
                                        handleClick(fb.keyResult.id)
                                      }
                                      className="btn btn-ghost btn-sm rounded-md align-middle text-blue-500"
                                    >
                                      {fb.status}
                                    </Button>
                                  )}
                                  {(fb.status === "初審駁回反饋" || fb.status === "子公司負責人駁回反饋") && (
                                    <Button
                                      onClick={() =>
                                        handleClick(fb.keyResult.id)
                                      }
                                      className="btn btn-ghost btn-sm rounded-md align-middle text-red"
                                    >
                                      {fb.status}
                                    </Button>
                                  )}

                                  {fb.status === "初審反饋確認中" && (
                                    <Button
                                      onClick={() =>
                                        handleClick(fb.keyResult.id)
                                      }
                                      className="btn btn-ghost btn-sm rounded-md align-middle text-blue-500"
                                    >
                                      {fb.status}
                                    </Button>
                                  )}

                                  {fb.status === "子公司負責人反饋確認中" && (
                                    <Button
                                      onClick={() =>
                                        handleClick(fb.keyResult.id)
                                      }
                                      className="btn btn-ghost btn-sm rounded-md align-middle text-blue-500"
                                    >
                                      {fb.status}
                                    </Button>
                                  )}

                                  {fb.status === "進入上級評分中" && (
                                    <Button
                                      onClick={() =>
                                        handleClick(fb.keyResult.id)
                                      }
                                      className="btn btn-ghost btn-sm rounded-md align-middle text-green-500"
                                    >
                                      {fb.status}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      )}
    </>
  );
}
