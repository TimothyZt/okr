"use client";

import React from "react";
import AuditOBtn from "./audit-o-button";
import { Audit_OResponse } from "../../../dtos/audit-dtos";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import { Me } from "../../../../users/dtos/users-dto";
interface SidebarProps {
  toggleExpand: () => void;
  isExpand: boolean;
}

interface Props {
  me: Me;
  isSubmitter: boolean;
  oResponse: Audit_OResponse;
  systemPeriods:PeriodDto[];
  setCompletedList: (auditOs:Audit_OResponse[]) => void,
  setAuditingList: (auditOs:Audit_OResponse[]) => void,
  setSubmittedAuditOs: (auditOs:Audit_OResponse[]) => void,
  setAuditO: (auditO:Audit_OResponse) => void,
}

type CombinedProps = SidebarProps & Props;
export default function AuditOModel({
  me,
  isExpand,
  toggleExpand,
  isSubmitter,
  oResponse,
  systemPeriods,
  setCompletedList,
  setAuditingList,
  setSubmittedAuditOs,
  setAuditO
}: CombinedProps) {
  return (
    <>
      <div className="card ml-4 mt-5">
        <div className="content">
          <div className="block" onClick={toggleExpand}>
            <div className="flex">
              <button className="btn  btn-success btn-xs w-14 rounded-full text-slate-200">
                公司級
              </button>
              <h3 className="ml-3 max-w-180 font-bold text-slate-800">
                {oResponse.description}
              </h3>
              <div className="btn-xs ml-4">
                <AuditOBtn
                  OKRType={true}
                  oResponse={oResponse}
                  isSubmitter={isSubmitter}
                  systemPeriods={systemPeriods}
                  setCompletedList={setCompletedList}
                  setAuditingList={setAuditingList}
                  setSubmittedAuditOs={setSubmittedAuditOs} 
                  setAuditO={setAuditO}
                  me={me}              
                />
              </div>
            </div>
            <div className="ml-17 mt-2 flex">
              <label className="text-xs text-slate-500 ">
                負責人: {oResponse.belongToEmplN}
              </label>
              <label className="ml-3 text-xs text-slate-500">
                公司和部門: {oResponse.companyName}
              </label>
            </div>
          </div>
          {isExpand && (
            <div
              className={`translate transform overflow-hidden ${
                !open && "hidden"
              }`}
            >
              <ul className="mb-0 mt-1 flex flex-col gap-2.5 pl-6">
                <li>
                  <div className="flex mb-2">
                    <div
                      className="border-spacing-26 -translate-y-3 opacity-55"
                      style={{
                        borderLeft: "1px solid gray",
                        height: "30px",
                        display: "inline-block",
                        marginRight: "7px",
                      }}
                    >
                      <hr
                        style={{
                          width: "27px",
                          height: "1px",
                          backgroundColor: "1px solid gray",
                          marginTop: "30px",
                          marginBottom: "0px",
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-ghost btn-success btn-xs mt-2 text-sm text-green-500 "
                      disabled
                    >
                      + 新建對齊
                    </button>
                  </div>
                </li>
                {/* <li>
                  <div className="flex">
                    <label id="auditer" className="text-sm text-black">
                      OKR對齊 : {oResponse.objective.belongToEmplN}
                    </label>
                    <label className="ml-5 text-sm text-black">
                      OKR級別 : {oResponse.objective.okrLevel}
                    </label>
                  </div>
                </li> */}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        className="bottom-line ml-5 text-slate-800"
        style={{
          borderBottom: "1px solid gray",
          width: "97%",
          opacity: 0.3,
        }}
      />
    </>
  );
}
