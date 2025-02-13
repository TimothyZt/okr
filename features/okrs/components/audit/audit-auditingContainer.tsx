"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useState } from "react";
import {
  Audit_KRResponse,
  Audit_OResponse,
  MultiApproverStatusRequest,
} from "../../dtos/audit-dtos";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/react";
import AuditCard from "./audit-card";
import { Me } from "../../../users/dtos/users-dto";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import {
  getAuditO_RecordsAction,
  putMultiApproverStatusAction,
} from "../../server-actions/actions";
import { Bounce, toast } from "react-toastify";
import ensurePeriodIsHavePermission, {
  reloadAuditOReponses,
} from "../../../system/extension/system-extension";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import SystemYearSelect from "../create/header/select-system-year";
import {
  auditingFilter,
  completedListFilter,
  submittedListFilter,
} from "./audit-extension/audit-extension";

interface Props {
  auditObjetives: Audit_OResponse[];
  auditKeyResults: Audit_KRResponse[];
  auditObjetivesSubmitted: Audit_OResponse[];
  auditKeyResultsSubmitted: Audit_KRResponse[];
  me: Me;
  currentSystemPeriod: PeriodDto;
  systemPeriods: PeriodDto[];
}

export default function AuditingContainer({
  //{obesolute}
  auditObjetives,
  auditKeyResults,
  auditObjetivesSubmitted,
  auditKeyResultsSubmitted,
  me,
  currentSystemPeriod,
  systemPeriods,
}: Props) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const handleAllCheckClick = () => {
    setIsAllChecked(true);
    const ids = auditingList
      .map((item) => item.auditId)
      .filter((id) => id !== undefined) as string[];
    setSelectedOIds(ids);
  };

  const handleAllCheckCancel = () => {
    setIsAllChecked(false);
    setSelectedOIds([]);
  };
  //   const currentYear = systemPeriods.find(x=>x.okrYear === currentSystemPeriod.okrYear && x.sysCodeValue === "AllSeason" )
  // const [auditOs, setAuditOs] = useState<Audit_OResponse[]>(auditObjetives.filter(x=>x.objective.okrperiodId === currentYear?.id));
  
  const [auditOs, setAuditOs] = useState<Audit_OResponse[]>(auditObjetives);
  const initCompletedList = completedListFilter(me, auditOs);
  const initSubmittedList = submittedListFilter(me, auditOs);
  const initAuditingList = auditingFilter(me, auditOs);
  const [completedList, setCompletedList] =
    useState<Audit_OResponse[]>(initCompletedList);
  const [auditingList, setAuditingList] =
    useState<Audit_OResponse[]>(initAuditingList);
  const [submittedAuditOs, setSubmittedAuditOs] = useState<Audit_OResponse[]>(
    auditObjetivesSubmitted,
  );
  const [selectedOIds, setSelectedOIds] = useState<string[]>([]);
  const handleMultiAuditOClick = (
    oResponse: Audit_OResponse,
    check: boolean,
  ) => {
    if (check) {
      const updatedOIds = selectedOIds.filter(
        (id) => id !== oResponse.auditId!,
      );
      setSelectedOIds(updatedOIds);
    } else {
      if (!selectedOIds.includes(oResponse.auditId!)) {
        setSelectedOIds([...selectedOIds, oResponse.auditId!]);
      }
    }
  };

  const handleMultiSetApproveStatus = async (status: number) => {
    if (ensurePeriodIsHavePermission(selectedYear,systemPeriods)) {
      const request: MultiApproverStatusRequest = {
        ids: selectedOIds,
        type: true,
        reason: "",
        status: status,
      };
      unpackActionResponse(await putMultiApproverStatusAction(request));
      let systemPeriodIdByYear = systemPeriods.find(
        (x) => x.okrYear === selectedYear && x.sysCodeValue === "AllSeason",
      );
      reloadAuditOReponses(
        systemPeriodIdByYear?.id!,
        me,
        setCompletedList,
        setAuditingList,
        setSubmittedAuditOs,
      );
      setSelectedOIds([]);
      toast.success("批量審核成功!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  async function handleSelectYearClick(value: string) {
    let systemPeriodIdByYear = systemPeriods.find((x) => x.okrYear === value);
    setSubmittedAuditOs([])
    setAuditingList([])
    setCompletedList([])
    reloadAuditOReponses(
      systemPeriodIdByYear?.id!,
      me,
      setCompletedList,
      setAuditingList,
      setSubmittedAuditOs,
    );
  }

  const [selectedYear, setSelectedYear] = useState(currentSystemPeriod.okrYear);
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
      >
        <Tab
          key="create"
          title={
            <div className="flex items-center space-x-2">
              <span>未處理的</span>
              <Chip size="sm" variant="faded">
                {auditingList.length}
              </Chip>
            </div>
          }
          className={
            auditingList.length === 0 ? "text-slate-700" : "text-rose-600"
          }
        >
          <div className="relative left-0 ml-5 flex">
            {isAllChecked && (
              <button
                className="btn btn-success btn-sm mr-5 block rounded-md bg-teal-600 text-white"
                onClick={handleAllCheckCancel}
              >
                取消全選
              </button>
            )}
            {!isAllChecked && (
              <button
                className="btn btn-success btn-sm mr-5 block rounded-md bg-teal-600 text-white"
                onClick={handleAllCheckClick}
              >
                全選
              </button>
            )}
            <Popover placement="bottom" offset={20} showArrow>
              <PopoverTrigger>
                <button className="btn btn-success btn-sm mr-5 block rounded-md bg-teal-600 text-white">
                  批量審核
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="border-2 border-slate-400 bg-slate-200">
                  <button
                    onClick={() => handleMultiSetApproveStatus(3)}
                    className="btn btn-success btn-sm ml-3 mr-3 mt-3 block rounded-md bg-teal-600 text-white"
                  >
                    通過
                  </button>
                  <button
                    onClick={() => handleMultiSetApproveStatus(2)}
                    className="btn btn-success btn-sm mb-3 ml-3 mr-3 mt-3 block rounded-md bg-teal-600 text-white"
                  >
                    駁回
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {auditingList.map((o) => (
            // eslint-disable-next-line react/jsx-key
            <AuditCard
              // setAuditOs={setAuditOs}
              isSubmitter={false}
              isAllChecked={isAllChecked}
              setisAllChecked={setIsAllChecked}
              isAuditing={true}
              oResponse={o}
              auditKeyResults={auditKeyResults.filter(
                (x) => x.managementId === o.managementId,
              )}
              handleMultiAuditOClick={handleMultiAuditOClick}
              systemPeriods={systemPeriods}
              currentPeriodByOInYear={
                systemPeriods.find((x) => x.id === o.objective.okrperiodId)!
              }
              setCompletedList={setCompletedList}
              setAuditingList={setAuditingList}
              setSubmittedAuditOs={setSubmittedAuditOs}
              me={me}
            />
          ))}
        </Tab>
        <Tab key="Completed" title="已處理的">
          {completedList.map((o) => (
            // eslint-disable-next-line react/jsx-key
            <AuditCard
              // setAuditOs={setAuditOs}
              isSubmitter={false}
              isAllChecked={isAllChecked}
              setisAllChecked={setIsAllChecked}
              isAuditing={false}
              oResponse={o}
              auditKeyResults={auditKeyResults.filter(
                (x) => x.managementId === o.managementId,
              )}
              handleMultiAuditOClick={handleMultiAuditOClick}
              systemPeriods={systemPeriods}
              currentPeriodByOInYear={
                systemPeriods.find((x) => x.id === o.objective.okrperiodId)!
              }
              setCompletedList={setCompletedList}
              setAuditingList={setAuditingList}
              setSubmittedAuditOs={setSubmittedAuditOs}
              me={me}
            />
          ))}
        </Tab>

        <Tab key="Submmited" title="已提交的">
          {submittedAuditOs.map((o) => (
            // eslint-disable-next-line react/jsx-key
            <AuditCard
              // setAuditOs={setAuditOs}
              isSubmitter={true}
              isAllChecked={isAllChecked}
              setisAllChecked={setIsAllChecked}
              isAuditing={false}
              oResponse={o}
              auditKeyResults={auditKeyResultsSubmitted.filter(
                (x) => x.managementId === o.managementId,
              )}
              handleMultiAuditOClick={handleMultiAuditOClick}
              systemPeriods={systemPeriods}
              currentPeriodByOInYear={
                systemPeriods.find((x) => x.id === o.objective.okrperiodId)!
              }
              setCompletedList={setCompletedList}
              setAuditingList={setAuditingList}
              setSubmittedAuditOs={setSubmittedAuditOs}
              me={me}
            />
          ))}
        </Tab>
      </Tabs>
    </>
  );
}
