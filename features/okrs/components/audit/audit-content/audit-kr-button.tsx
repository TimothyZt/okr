import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";
import Draggable from "react-draggable";
import AuditButton from "./audit-button";
import {
  ApproverStatusRequest,
  Audit_KRResponse,
  Audit_OResponse,
  AuditStepDetailResponse,
} from "../../../dtos/audit-dtos";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import {
  getAuditKR_RecordsAction,
  getAuditO_RecordsAction,
  getAuditStepDetailResponseAction,
  putApproverStatusAction,
} from "../../../server-actions/actions";
import AuditProgress from "./audit-step-detail";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import ensurePeriodIsHavePermission, {
  reloadAuditOReponses,
} from "../../../../system/extension/system-extension";
import { toast, Bounce } from "react-toastify";
import { Me } from "../../../../users/dtos/users-dto";

interface Props {
  me: Me;
  KRId: number;
  KRPermission: boolean;
  OKRType: boolean;
  isSubmitter: boolean;
  // auditStatus:boolean;
  krResponse: Audit_KRResponse;
  systemPeriods: PeriodDto[];
  setCompletedList: (auditOs: Audit_OResponse[]) => void;
  setAuditingList: (auditOs: Audit_OResponse[]) => void;
  setSubmittedAuditOs: (auditOs: Audit_OResponse[]) => void;
  oResponse: Audit_OResponse;
  setAuditKRs: (auditKRs: Audit_KRResponse[]) => void;
}

export default function AuditKRBtn({
  me,
  krResponse,
  OKRType,
  isSubmitter,
  systemPeriods,
  oResponse,
  setCompletedList,
  setAuditingList,
  setSubmittedAuditOs,
  setAuditKRs,
}: Props) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [stepDetail, setStepDetail] = useState<AuditStepDetailResponse[]>([]);

  const [rejectReason, setRejectReason] = useState("");
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRejectReason(event.target.value);
  };
  const handleAudit = async () => {
    let statusValue = 0;
    if (selectedOption === "Completed") {
      statusValue = 3;
    }
    if (selectedOption === "Refused") {
      statusValue = 2;
    }
    const request: ApproverStatusRequest = {
      id: krResponse.auditId!,
      type: false,
      reason: me.emplName+" => 驳回："+rejectReason,
      status: statusValue,
    };
    if (statusValue === 0) {
      toast.error("請選擇審核狀態", {
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
    } else {
      unpackActionResponse(await putApproverStatusAction(request));
      const akrs = unpackActionResponse(await getAuditKR_RecordsAction());
      const akrsByOId = akrs.filter(
        (x) =>
          x.objectiveId === oResponse.objectiveId &&
          x.managementId === oResponse.managementId,
      );

      let i = 1;
      akrsByOId.forEach((element) => {
        element.keyResult.sortId = i++;
      });
      setAuditKRs(akrsByOId);
      const currentPeriodByOInYear = systemPeriods.find(
        (x) => x.id === oResponse.objective.okrperiodId,
      )!;

      reloadAuditOReponses(
        currentPeriodByOInYear?.id!,
        me,
        setCompletedList,
        setAuditingList,
        setSubmittedAuditOs,
      );
      toast.success("審核關鍵結果(KR)成功!", {
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

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleAuditStepsBtn = async () => {
    const periodByO = systemPeriods.find(x=>x.id === oResponse.objective.okrperiodId)
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!,systemPeriods)) {
         var steps = unpackActionResponse(
           await getAuditStepDetailResponseAction(
             krResponse.managementId!,
             false,
             krResponse.keyResult.id!,
           ),
         );
      steps = steps.sort((x) => x.step);
      setStepDetail(steps);
    }
    onOpen();
  };
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <AuditButton
        approvorStatus={krResponse.approverStatus!}
        onOpen={handleAuditStepsBtn}
        isSubmitter={isSubmitter}
      ></AuditButton>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-500px w-230
         border-2 border-slate-400 bg-white shadow-2xl "
      >
        <Draggable>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b-2 border-slate-400">
                  <div className="flex-col">
                    <label>KR審核詳情</label>
                    {OKRType && (
                      <AuditProgress steps={stepDetail}></AuditProgress>
                    )}

                    {OKRType === false && (
                      <ul className="steps ml-4">
                        <li
                          data-content="C"
                          className="step step-primary w-26 text-xs"
                        >
                          子公司填寫人起草
                        </li>
                        <li
                          data-content="B"
                          className="step step-primary w-26 text-xs"
                        >
                          子公司負責人審核
                        </li>
                        <li data-content="A1" className="step w-22 text-xs">
                          總公司初審
                        </li>
                        <li data-content="A2" className="step w-22 text-xs">
                          總公司終審
                        </li>
                        <li data-content="✔" className="step w-22 text-xs">
                          End
                        </li>
                      </ul>
                    )}

                    {/* {OKRType === false && 
                    <ul className="steps ml-4">
                      <li data-content="C" className="step step-primary text-xs w-30">部門填寫人起草</li>
                      <li data-content="B" className="step step-primary text-xs w-30">部门負責人審核</li>
                      <li data-content="✔" className="step text-xs w-30">End</li>
                    </ul>} */}
                  </div>
                </ModalHeader>
                <ModalBody className="mt-2 overflow-auto">
                  <div className="ml-6 mt-2 w-11/12">
                    <div className="ml-3">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        KR詳情
                      </label>
                      <textarea
                        rows={6}
                        disabled
                        placeholder={krResponse.description}
                        className="h-20 w-full overflow-auto rounded-lg border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:disabled:bg-black"
                      ></textarea>
                    </div>
                    <div className="flex">
                    <div className="ml-3 mt-3 w-4/12">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            KR類型
                          </label>

                          <input
                            type="text"
                            placeholder={krResponse.krType}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div>
                        <div className="mt-3 ml-3 w-3/12 ">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            权重(%)
                          </label>

                          <input
                            type="text"
                            placeholder={krResponse.weight?.toString()}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div>
                      <div className="mt-3 ml-3 w-3/12">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            完成度(%)
                          </label>

                          <input
                            type="text"
                            placeholder={"0"}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div></div>
                    <div className="ml-3 flex">
                      {/* <div className="mt-5 w-6/12">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          KR負責人
                        </label>
                        <input
                          type="text"
                          value={
                            "Test7"
                          }
                          disabled
                          className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                        />
                      </div> */}
                      <div className="mb-4 ml-0 mt-5  w-7/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          KR負責部門
                        </label>
                        <input
                          type="text"
                          value={
                            krResponse.belongToDepartment1Name! +
                            (krResponse.belongToDepartment2Name ===
                            null
                              ? ""
                              : "、" +
                                krResponse.belongToDepartment2Name)
                          }
                          disabled
                          className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                        />
                      </div>
                      <div className="ml-5 mt-5 w-5/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          審核結果
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          {krResponse.approverStatus !== "Auditing" && (
                            <input
                              type="text"
                              placeholder={
                                krResponse.approverStatus === "Completed"
                                  ? "通过"
                                  : "驳回"
                              }
                              disabled
                              className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                            />
                          )}
                          {krResponse.approverStatus === "Auditing" &&
                            isSubmitter && (
                              <input
                                type="text"
                                placeholder="审核中"
                                disabled
                                className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                              />
                            )}
                          {krResponse.approverStatus === "Auditing" &&
                            !isSubmitter && (
                              <>
                                <select
                                  value={selectedOption}
                                  onChange={(e) => {
                                    setSelectedOption(e.target.value);
                                    changeTextColor();
                                  }}
                                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition  dark:border-form-strokedark dark:bg-form-input ${
                                    isOptionSelected
                                      ? "text-black dark:text-white"
                                      : ""
                                  }`}
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="text-body dark:text-bodydark"
                                  >
                                    請選擇
                                  </option>

                                  <option
                                    value="Completed"
                                    className="text-body dark:text-bodydark"
                                  >
                                    通過
                                  </option>
                                  <option
                                    value="Refused"
                                    className="text-body dark:text-bodydark"
                                  >
                                    駁回
                                  </option>
                                </select>
                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g opacity="0.8">
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                        fill="#637381"
                                      ></path>
                                    </g>
                                  </svg>
                                </span>
                              </>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {krResponse.approverStatus === "Refused" && (
                    <div className="ml-9 w-11/12">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        駁回原因
                      </label>
                      <input
                        type="text"
                        placeholder={krResponse.refuseReason}
                        disabled
                        className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                      />
                    </div>
                  )}

                  {selectedOption === "Refused" &&
                    krResponse.approverStatus === "Auditing" && (
                      <div className="ml-9 w-11/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          駁回原因
                        </label>
                        <textarea
                          rows={6}
                          placeholder="請填寫駁回原因"
                          className="h-30 w-full rounded-lg border-[1.5px] border-slate-400  bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                          value={rejectReason}
                          onChange={handleTextareaChange}
                          onMouseDown={handleTextareaMouseDown}
                        ></textarea>
                      </div>
                    )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    取消
                  </Button>
                  {krResponse.approverStatus === "Auditing" && !isSubmitter && (
                    <Button
                      color="default"
                      onPress={() => {
                        handleAudit();
                        onClose();
                      }}
                    >
                      确认
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
