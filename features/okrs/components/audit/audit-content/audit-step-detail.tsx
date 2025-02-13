import ProgressSvgItem from "@/components/Progress/ProgressSvgItem";
import React from "react";
import { AuditStepDetailResponse } from "../../../dtos/audit-dtos";

interface Props {
  steps: AuditStepDetailResponse[];
}

export default function AuditProgress({ steps }: Props) {
  const step1 = steps.find((x) => x.step === 1);
  const step2 = steps.find((x) => x.step === 2);
  const step3 = steps.find((x) => x.step === 3);
  const step4 = steps.find((x) => x.step === 4);


  return (
    <div>
      <div className=" flex w-full items-center">
        {step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Auditing" &&
          (step3?.auditStatus === "Auditing" ||
            step3?.auditStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Auditing"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={ (step2?.auditStatus === "Auditing" || step2?.auditStatus === "Waiting") === true?0:100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={(step2?.auditStatus === "Auditing" || step2?.auditStatus === "Waiting") === true?"NoStart":"Auditing"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="NoStart"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Refused" &&
          (step3?.auditStatus === "Auditing" ||
            step3?.auditStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Refused"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"NoStart"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="NoStart"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Completed" &&
          (step3?.approverStatus === "Auditing" ||
            step3?.approverStatus === "Waiting") &&
          (step4?.auditStatus === "Auditing" ||
            step4?.auditStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Auditing"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="NoStart"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}
{step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Auditing" &&
          step2?.auditStatus === "Completed" &&
          (step3?.approverStatus === "Completed" ||
            step3?.approverStatus === "Refused")&&
            step3?.auditStatus === "Refused" &&
          (step4?.auditStatus === "Auditing" ||
            step4?.auditStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={step3?.approverStatus}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={step3?.approverStatus === "Completed"?100:0}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={step3?.approverStatus === "Completed"?"Auditing":"NoStart"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}
{step1?.auditStatus === "Completed" &&
 step2?.approverStatus === "Auditing" && 
          step2?.auditStatus === "Completed" &&
          step3?.auditStatus === "Completed" &&
          (step4?.approverStatus === "Auditing" ||
            step4?.approverStatus === "Waiting") &&
          (step4?.auditStatus === "Auditing" ||
            step4?.auditStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Auditing"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}
          {step1?.auditStatus === "Completed" &&
 step2?.approverStatus === "Auditing" && 
          step2?.auditStatus === "Completed" &&
          step3?.auditStatus === "Completed" &&
          step4?.approverStatus === "Refused" &&
          step4?.auditStatus === "Refused" && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Refused"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}
                   {step1?.auditStatus === "Completed" &&
 step2?.approverStatus === "Auditing" && 
          step2?.auditStatus === "Completed" &&
          step3?.auditStatus === "Completed" &&
          step4?.approverStatus === "Completed" &&(
          step4?.auditStatus === "Completed" || step4?.auditStatus === "Refused") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}
        {step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Completed" &&
          step3?.approverStatus === "Refused" &&
          (step4?.approverStatus === "Auditing" ||
            step4?.approverStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Refused"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="NoStart"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Completed" &&
          step3?.approverStatus === "Completed" &&
          (step4?.approverStatus === "Auditing" ||
            step4?.approverStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="Auditing"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Completed" &&
          step3?.approverStatus === "Completed" &&
          step4?.approverStatus === "Refused" && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="Refused"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}
        {step1?.auditStatus === "Completed" &&
          step2?.approverStatus === "Completed" &&
          step3?.approverStatus === "Completed" &&
          step4?.approverStatus === "Completed" && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={"Completed"}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}
        {/* {step1?.auditStatus === "Completed" &&
          step2?.auditStatus === "Completed" &&
          (step3?.auditStatus === "Auditing" ||
            step3?.auditStatus === "Refused") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={step3.approverStatus}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={step3.approverStatus === "Completed" ? 100 : 0}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={
                  step3.approverStatus === "Completed" ? "Auditing" : "NoStart"
                }
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step1?.auditStatus === "Completed" &&
          step2?.auditStatus === "Completed" &&
          step3?.auditStatus === "Completed" &&
          step4 && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status="Completed"
                isAudit={true}
              ></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem
                status={step4.approverStatus}
                isAudit={true}
              ></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )} */}

        {/*  */}
        {/* {step1?.approverStatus === "Completed" &&
          step2?.approverStatus !== "Completed" &&
          (step3?.approverStatus === "Auditing" ||
            step3?.approverStatus === "Waiting") && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="1" className="mb-1 w-30  text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success   h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Auditing"></ProgressSvgItem>
              <label id="2" className="mb-1 w-30 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem status="NoStart"></ProgressSvgItem>
              <label id="3" className="mb-1 w-30 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem status="NoStart"></ProgressSvgItem>
              <label id="4" className="mb-1 w-30 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step2?.approverStatus === "Completed" &&
          step3?.approverStatus !== "Completed" &&
          step2.auditStatus !== "Completed" && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="1" className="mb-1 w-12 text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Auditing"></ProgressSvgItem>
              <label id="2" className="mb-1 w-12 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem status="NoStart"></ProgressSvgItem>
              <label id="3" className="mb-1 w-12 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem status="NoStart"></ProgressSvgItem>
              <label id="4" className="mb-1 w-12 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step2?.approverStatus === "Completed" &&
          step3?.approverStatus !== "Completed" &&
          step2.auditStatus === "Completed" && (
            <div className=" flex w-full  items-center">
              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="1" className="mb-1 w-12 text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="2" className="mb-1 w-12 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Auditing"></ProgressSvgItem>
              <label id="3" className="mb-1 w-12 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem status="NoStart"></ProgressSvgItem>
              <label id="4" className="mb-1 w-12 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step3?.approverStatus === "Completed" &&
          step4?.approverStatus !== "Completed" &&
          step3.auditStatus !== "Completed" && (
            <div className=" flex w-full items-center">
              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="1" className="mb-1 w-12 text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="2" className="mb-1 w-12 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Auditing"></ProgressSvgItem>
              <label id="3" className="mb-1 w-12 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={0}
                max="100"
              ></progress>

              <ProgressSvgItem status="NoStart"></ProgressSvgItem>
              <label id="4" className="mb-1 w-12 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step3?.approverStatus === "Completed" &&
          step4?.approverStatus !== "Completed" &&
          step3.auditStatus === "Completed" && (
            <div className=" flex w-full items-center">
              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="1" className="mb-1 w-12 text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="2" className="mb-1 w-12 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="3" className="mb-1 w-12 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Auditing"></ProgressSvgItem>
              <label id="4" className="mb-1 w-12 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step4?.approverStatus === "Completed" &&
          step4.auditStatus !== "Auditing" && (
            <div className=" flex w-full items-center">
              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="1" className="mb-1 w-12 text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="2" className="mb-1 w-12 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="3" className="mb-1 w-12 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Auditing"></ProgressSvgItem>
              <label id="4" className="mb-1 w-12 text-xs">
                總公司負責人
              </label>
            </div>
          )}

        {step4?.approverStatus === "Completed" &&
          step4?.auditStatus === "Auditing" && (
            <div className=" flex w-full items-center">
              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="1" className="mb-1 w-12 text-xs">
                子公司填寫人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="2" className="mb-1 w-12 text-xs">
                子公司負責人
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="3" className="mb-1 w-12 text-xs">
                总公司初審
              </label>
              <progress
                className="progress progress-success h-[1.5px] w-3/12 rounded-full"
                value={100}
                max="100"
              ></progress>

              <ProgressSvgItem status="Completed"></ProgressSvgItem>
              <label id="4" className="mb-1 w-12 text-xs">
                總公司負責人
              </label>
            </div>
          )} */}
      </div>
    </div>
  );
}
