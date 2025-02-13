import React from "react";
import AuditKRBtn from "./audit-kr-button";
import { Audit_KRResponse, Audit_OResponse } from "../../../dtos/audit-dtos";
import KRDetail from "../../create/detail/create-kr-detail";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import { Me } from "../../../../users/dtos/users-dto";

interface Props {
  me:Me;
  KRPermission: boolean;
  OKRType: boolean; //false is symbol of depart level,then true is symbol of company level
  auditStatus: string;
  krResponse: Audit_KRResponse;
  isSubmitter: boolean;
  systemPeriods :PeriodDto[];
  oResponse:Audit_OResponse;
  setCompletedList: (auditOs:Audit_OResponse[]) => void,
  setAuditingList: (auditOs:Audit_OResponse[]) => void,
  setSubmittedAuditOs: (auditOs:Audit_OResponse[]) => void,
  setAuditKRs: (auditKRs:Audit_KRResponse[]) => void,
}

export default function AuditKRTableItem({
  me,
  krResponse,
  KRPermission,
  OKRType,
  auditStatus,
  isSubmitter,
  systemPeriods,
  oResponse,
  setCompletedList,
  setAuditingList,
  setSubmittedAuditOs,
  setAuditKRs
}: Props) {
  return (
    <>
      <tr className="hover border-none">
        <td>
          <div className="flex text-center">
            <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
              KR{krResponse.keyResult.sortId}
            </button>
            <label id="itemname" className="ml-2  text-slate-800 mt-0.5 text-center">
              {krResponse.description}
            </label>
          </div>
        </td>

        <td className="text-center text-slate-800">{krResponse.weight}%</td>
        <td className="text-center text-slate-800">
          <div>
            {KRPermission && (
              <AuditKRBtn
              me={me}
                KRPermission={true}
                KRId={krResponse.keyResult.sortId}
                OKRType={OKRType}
                krResponse={krResponse}
                isSubmitter={isSubmitter}
                systemPeriods = {systemPeriods}
                oResponse={oResponse}
                setCompletedList={setCompletedList}
                setAuditingList={setAuditingList}
                setSubmittedAuditOs={setSubmittedAuditOs}
                setAuditKRs={setAuditKRs}
              />
            )}

            {KRPermission === false && (
              <AuditKRBtn
                me={me}
                KRPermission={false}
                KRId={krResponse.keyResult.sortId}
                OKRType={OKRType}
                krResponse={krResponse}
                isSubmitter={isSubmitter}
                systemPeriods={systemPeriods} 
                setCompletedList={setCompletedList}
                setAuditingList={setAuditingList}
                setSubmittedAuditOs={setSubmittedAuditOs}
                oResponse={oResponse}
                setAuditKRs={setAuditKRs}

              />
            )}
          </div>
        </td>
        {/* {auditStatus === "remake" && <td className="text-center"></td>}
        {!(auditStatus === "remake") && (
          <td className="text-center">
            <KRDetail btnName="詳情" kr={krResponse.keyResult}></KRDetail>
          </td>
        )} */}
      </tr>
    </>
  );
}
