"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { useState } from "react";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import { Me } from "../../../../users/dtos/users-dto";
import {
  Audit_OResponse,
  QueryMyAuditORecordsRequest,
} from "../../../dtos/audit-dtos";
import SystemYearSelect from "../../create/header/select-system-year";
import AuditProgressTable from "./audit-progress-content/audit-progress-table";
import { Objective, QueryObjectivesDto } from "../../../dtos/okr-dtos";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import {
  getAuditRecordsOByCategoryAction,
  getObjectivesAction,
  getObjectivesByHdAction,
} from "../../../server-actions/actions";
import AuditProgressTable2 from "./audit-progress-content/audit-progress-table2";
import { formatDate } from "../../../../system/extension/system-extension";

interface Props {
  aobjetives: Audit_OResponse[];
  // auditKeyResults: Audit_KRResponse[];
  me: Me;
  currentSystemPeriod: PeriodDto;
  systemPeriods: PeriodDto[];
}

export default function AuditProgressContainer({
  aobjetives,
  me,
  currentSystemPeriod,
  systemPeriods,
}: Props) {
  const [auditOs, setAuditOs] = useState<Audit_OResponse[]>([]);
  const [os, setOs] = useState<Objective[]>([]);
  const [selectedYear, setSelectedYear] = useState(
    currentSystemPeriod?.okrYear,
  );
  const [rolee, setRolee] = useState<string>("HeadCompanyPreliminaryReviewer");

  async function handleSelectYearClick(value: string) {
    let systemPeriodIdByYear = systemPeriods.find((x) => x.okrYear === value);
    const query: QueryObjectivesDto = {
      okrPeriodByYearId: systemPeriodIdByYear?.id!,
      createOn: formatDate(new Date()),
      limit: 100,
    };
    const oss = unpackActionResponse(await getObjectivesByHdAction(query));
    setOs(
      oss.filter(
        (x) =>
          x.okrStatus === "create" &&
          x.okrperiodId === systemPeriodIdByYear?.id,
      ),
    );
    const query1: QueryMyAuditORecordsRequest = {
      category: rolee,
      createOn: formatDate(new Date()),
      limit: 100,
    };
    const aos = unpackActionResponse(
      await getAuditRecordsOByCategoryAction(query1),
    );
    setAuditOs(aos.filter((x) => x.okrPeriodId === systemPeriodIdByYear?.id));
  }

  const handleCategoryClick = async (role: string) => {
    setRolee(role);
    let systemPeriodIdByYear = systemPeriods.find(
      (x) => x.okrYear === selectedYear,
    );
    if (role === "SubsidiaryCompanyWriter") {
      const query: QueryObjectivesDto = {
        okrPeriodByYearId: systemPeriodIdByYear?.id!,
        createOn: formatDate(new Date()),
        limit: 100,
      };
      const oss = unpackActionResponse(await getObjectivesByHdAction(query));
      setOs(
        oss.filter(
          (x) =>
            x.okrStatus === "create" &&
            x.okrperiodId === systemPeriodIdByYear?.id,
        ),
      );
    } else {
      const query: QueryMyAuditORecordsRequest = {
        category: role,
        createOn: formatDate(new Date()),
        limit: 100,
      };
      const aos = unpackActionResponse(
        await getAuditRecordsOByCategoryAction(query),
      );
      setAuditOs(aos.filter((x) => x.okrPeriodId === systemPeriodIdByYear?.id));
    }
  };

  return (
    <>
      <div className="absolute right-30">
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
      </div>
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
        <Tab key="SubsidiaryCompanyWriter" title="未提交的OKR">
          <AuditProgressTable2
            isExpanded={false}
            objetives={os}
          ></AuditProgressTable2>
        </Tab>
        <Tab key="SubsidiaryCompanyResponsiblePerson" title="子公司負責人">
          <AuditProgressTable
            isExpanded={false}
            aobjetives={auditOs}
          ></AuditProgressTable>
        </Tab>
        <Tab key="HeadCompanyPreliminaryReviewer" title="總公司初審">
          {" "}
          <AuditProgressTable
            isExpanded={false}
            aobjetives={auditOs}
          ></AuditProgressTable>
        </Tab>
        <Tab key="HeadCompanyResponsiblePerson" title="總公司負責人">
          {" "}
          <AuditProgressTable
            isExpanded={false}
            aobjetives={auditOs}
          ></AuditProgressTable>
        </Tab>
      </Tabs>
    </>
  );
}
