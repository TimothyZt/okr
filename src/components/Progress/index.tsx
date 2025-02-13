"use client";
import React from "react";
import ProgressSvgItem from "./ProgressSvgItem";
interface Props {
  progressValue: number;
  status: string;
  isReject: boolean;
  objectiveId: string;
  auditBackManagementId?: string;
}
const Progress = ({
  progressValue,
  status,
  isReject,
  objectiveId,
  auditBackManagementId,
}: Props) => {
  return (
    <div className=" flex w-full items-center">
      {status === "create" && (
        <div className=" flex w-full  items-center">
          <ProgressSvgItem status="Auditing" isAudit={false}></ProgressSvgItem>
          <label id="create" className="w-19 text-sm">
            OKR制定
          </label>
          <progress
            className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
            value={0}
            max="100"
          ></progress>

          <ProgressSvgItem
            status={isReject ? "Refused" : "NoStart"}
            objectiveId={objectiveId}
            auditBackManagementId={auditBackManagementId} 
            isAudit={false}          ></ProgressSvgItem>
          <label id="audit" className="w-19 text-sm">
            OKR審核
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={0}
            max="100"
          ></progress>

          <ProgressSvgItem status="NoStart" isAudit={false}></ProgressSvgItem>
          <label id="track" className="w-19 text-sm">
            OKR追蹤
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={0}
            max="100"
          ></progress>

          <ProgressSvgItem status="NoStart" isAudit={false}></ProgressSvgItem>
          <label id="end" className="w-19 text-sm">
            OKR結束
          </label>
        </div>
      )}

      {status === "audit" && (
        <div className=" flex w-full  items-center">
          <ProgressSvgItem status="Completed" isAudit={false}></ProgressSvgItem>
          <label id="create" className="w-19 text-sm">
            OKR制定
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={100}
            max="100"
          ></progress>

          <ProgressSvgItem status="Auditing" isAudit={false}></ProgressSvgItem>
          <label id="audit" className="w-19 text-sm">
            OKR審核
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={0}
            max="100"
          ></progress>

          <ProgressSvgItem status="NoStart" isAudit={false}></ProgressSvgItem>
          <label id="track" className="w-19 text-sm">
            OKR追蹤
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={0}
            max="100"
          ></progress>

          <ProgressSvgItem status="NoStart" isAudit={false}></ProgressSvgItem>
          <label id="end" className="w-19 text-sm">
            OKR結束
          </label>
        </div>
      )}

      {status === "track" && (
        <div className=" flex w-full  items-center">
          <ProgressSvgItem status="Completed" isAudit={false}></ProgressSvgItem>
          <label id="create" className="w-19 text-sm">
            OKR制定
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={100}
            max="100"
          ></progress>

          <ProgressSvgItem status="Completed" isAudit={false}></ProgressSvgItem>
          <label id="audit" className="w-19 text-sm">
            OKR審核
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={100}
            max="100"
          ></progress>

          <ProgressSvgItem status="Auditing" isAudit={false}></ProgressSvgItem>
          <label id="track" className="w-19 text-sm">
            OKR追蹤
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={0}
            max="100"
          ></progress>

          <ProgressSvgItem status="NoStart" isAudit={false}></ProgressSvgItem>
          <label id="end" className="w-19 text-sm">
            OKR結束
          </label>
        </div>
      )}

      {status === "end" && (
        <div className=" flex w-full items-center">
          <ProgressSvgItem status="Completed" isAudit={false}></ProgressSvgItem>
          <label id="create" className="w-19 text-sm">
            OKR制定
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={100}
            max="100"
          ></progress>

          <ProgressSvgItem status="Completed" isAudit={false}></ProgressSvgItem>
          <label id="audit" className="w-19 text-sm">
            OKR審核
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={100}
            max="100"
          ></progress>

          <ProgressSvgItem status="Completed" isAudit={false}></ProgressSvgItem>
          <label id="track" className="w-19 text-sm">
            OKR追蹤
          </label>
          <progress
            className="progress progress-success h-[1.5px] w-3/12 rounded-full"
            value={100}
            max="100"
          ></progress>

          <ProgressSvgItem status="Completed" isAudit={false}></ProgressSvgItem>
          <label id="end" className="w-19 text-sm">
            OKR結束
          </label>
        </div>
      )}
    </div>
  );
};

export default Progress;
