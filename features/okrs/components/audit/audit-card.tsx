"use client";

import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";
import { Audit_KRResponse, Audit_OResponse } from "../../dtos/audit-dtos";
import AuditOModel from "./audit-content/audit-o-model";
import AuditKRTable from "./audit-content/audit-kr-table";
import AuditKRTableItem from "./audit-content/audit-kr-tableItem";
import AuditContent from "./audit-content/audit-content";
import { Bounce, toast } from "react-toastify";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import { Me } from "../../../users/dtos/users-dto";

interface Props {
  me: Me;
  isAllChecked: boolean;
  setisAllChecked: (s: boolean) => void;
  handleMultiAuditOClick: (r: Audit_OResponse, check: boolean) => void;
  isAuditing: boolean;
  isSubmitter: boolean;
  oResponse: Audit_OResponse;
  auditKeyResults: Audit_KRResponse[];
  systemPeriods: PeriodDto[];
  currentPeriodByOInYear: PeriodDto;
  setCompletedList: (auditOs: Audit_OResponse[]) => void;
  setAuditingList: (auditOs: Audit_OResponse[]) => void;
  setSubmittedAuditOs: (auditOs: Audit_OResponse[]) => void;
}

export default function AuditCard({
  me,
  isAllChecked,
  handleMultiAuditOClick,
  isAuditing,
  isSubmitter,
  oResponse,
  auditKeyResults,
  systemPeriods,
  currentPeriodByOInYear,
  setCompletedList,
  setAuditingList,
  setSubmittedAuditOs,
}: Props) {
  let i = 1;
  auditKeyResults.forEach((element) => {
    element.keyResult.sortId = i++;
  });
  const [auditO, setAuditO] = useState<Audit_OResponse>(oResponse);
  const [auditKRs, setAuditKRs] = useState<Audit_KRResponse[]>(auditKeyResults);
  const [cardSelected1, setCardSelected1] = useState(false);
  const handleOneCheckClick1 = () => {
    if (!isAllChecked) {
      setCardSelected1(!cardSelected1);
      handleMultiAuditOClick(auditO, cardSelected1);
    }
  };
  const [isExpanded, setIsExpanded] = useState(false); //O
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const [isExpanded2, setIsExpanded2] = useState(false); //KR
  const toggleExpand2 = () => {
    setIsExpanded2(!isExpanded2);
  };
  return (
    <Card>
      <CardBody className="h-full w-full">
        <AuditContent
          auditStatus={auditO.auditStatus!}
          isSubmitter={isSubmitter}
          submmitOn={auditO.submitterOn!}
        >
          {isAuditing && (
            <div className="absolute left-5 top-5">
              {isAllChecked && !cardSelected1 && (
                <input
                  type="checkbox"
                  className="checkbox checkbox-md"
                  checked={!cardSelected1}
                  onChange={handleOneCheckClick1}
                />
              )}
              {isAllChecked && cardSelected1 && (
                <input
                  type="checkbox"
                  className="checkbox checkbox-md"
                  checked={!cardSelected1}
                  onChange={handleOneCheckClick1}
                />
              )}
              {!isAllChecked && cardSelected1 && (
                <input
                  type="checkbox"
                  className="checkbox checkbox-md"
                  checked={cardSelected1}
                  onChange={handleOneCheckClick1}
                />
              )}

              {!isAllChecked && !cardSelected1 && (
                <input
                  type="checkbox"
                  className="checkbox checkbox-md"
                  checked={false}
                  onChange={handleOneCheckClick1}
                />
              )}
            </div>
          )}

          <div className="">
            <div className="justify-content ml-3 mr-0 flex w-full overflow-hidden bg-center"></div>
            <div className="mt-5 w-full">
              <AuditOModel
                isExpand={isExpanded}
                toggleExpand={toggleExpand}
                oResponse={auditO}
                isSubmitter={isSubmitter}
                systemPeriods={systemPeriods}
                setCompletedList={setCompletedList}
                setAuditingList={setAuditingList}
                setSubmittedAuditOs={setSubmittedAuditOs}
                setAuditO={setAuditO}
                me={me}
              />
              <div className="ml-5 mr-5 overflow-auto">
                <AuditKRTable
                  oStatus="audit"
                  auditStatus=""
                  toggleExpand2={toggleExpand2}
                  isExpanded={isExpanded2}
                  currentPeriodByOInYear={currentPeriodByOInYear}
                >
                  {isExpanded2 &&
                    auditKRs.map((kr, index) => (
                      <AuditKRTableItem
                        systemPeriods={systemPeriods}
                        auditStatus={kr.auditStatus!}
                        KRPermission={true}
                        OKRType={true}
                        krResponse={kr}
                        key={index}
                        isSubmitter={isSubmitter}
                        setCompletedList={setCompletedList}
                        setAuditingList={setAuditingList}
                        setSubmittedAuditOs={setSubmittedAuditOs}
                        me={me}
                        oResponse={auditO}
                        setAuditKRs={setAuditKRs}
                      />
                    ))}
                </AuditKRTable>
              </div>
              <div
                className="bottom-line ml-5"
                style={{
                  borderBottom: "1px solid gray",
                  width: "97%",
                  opacity: 0.3,
                }}
              />
            </div>
          </div>
        </AuditContent>
      </CardBody>
    </Card>
  );
}
