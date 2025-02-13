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
  Audit_OResponse,
  AuditStepDetailResponse,
} from "../../../dtos/audit-dtos";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import {
  getAuditO_RecordsAction,
  getAuditStepDetailResponseAction,
  putApproverStatusAction,
} from "../../../server-actions/actions";
import AuditProgress from "./audit-step-detail";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import ensurePeriodIsHavePermission, {
  reloadAuditOReponses,
} from "../../../../system/extension/system-extension";
import { Bounce, toast } from "react-toastify";
import { getAuditO_Records } from "../../../services/okr";
import { Me } from "../../../../users/dtos/users-dto";

interface Props {
  me: Me;
  oResponse: Audit_OResponse;
  OKRType: boolean;
  isSubmitter: boolean;
  systemPeriods: PeriodDto[];
  setCompletedList: (auditOs: Audit_OResponse[]) => void;
  setAuditingList: (auditOs: Audit_OResponse[]) => void;
  setSubmittedAuditOs: (auditOs: Audit_OResponse[]) => void;
  setAuditO: (auditO: Audit_OResponse) => void;
}

export default function AuditOBtn({
  me,
  OKRType,
  oResponse,
  isSubmitter,
  systemPeriods,
  setCompletedList,
  setAuditingList,
  setSubmittedAuditOs,
  setAuditO,
}: Props) {
  const [oRes, setoRes] = useState<Audit_OResponse>(oResponse);
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

  const changeTextColor = () => {
    setIsOptionSelected(true);
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
      id: oRes.auditId!,
      type: true,
      reason: me.emplName + " => 驳回：" + rejectReason,
      status: statusValue,
    };
    const periodByO = systemPeriods.find(x=>x.id === oResponse.objective.okrperiodId)
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!,systemPeriods)) {
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
        const currentPeriodByOInYear = systemPeriods.find(
          (x) => x.id === oResponse.objective.okrperiodId,
        )!;
        var aos = unpackActionResponse(await getAuditO_RecordsAction());
        const newAo = aos.find((x) => x.auditId === oResponse.auditId);
        setAuditO(newAo!);
        setoRes(newAo!);
        reloadAuditOReponses(
          currentPeriodByOInYear?.id!,
          me,
          setCompletedList,
          setAuditingList,
          setSubmittedAuditOs,
        );
        toast.success("審核目標(O)成功!", {
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
    }
  };

  const handleAuditStepsBtn = async () => {
    onOpen();
    var steps = unpackActionResponse(
      await getAuditStepDetailResponseAction(
        oRes.managementId!,
        true,
        oResponse.objectiveId!,
      ),
    );
    steps = steps.sort((x) => x.step);
    setStepDetail(steps);
  };

  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <AuditButton
        approvorStatus={oRes.approverStatus!}
        onOpen={handleAuditStepsBtn}
        isSubmitter={isSubmitter}
      ></AuditButton>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-203 border-2 border-slate-400 bg-white shadow-2xl "
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <div className="h-600px overflow-y-auto ">
                  <ModalHeader className="flex flex-col gap-1 border-b-2 border-slate-400">
                    <div className="flex-col">
                      <label>OKR審核詳情</label>
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
                  <ModalBody className="">
                    <div className="ml-6 w-11/12">
                      <div className="mt-0">
                        <div className="flex">
                          <div className="ml-0 mt-0 w-6/12">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              戰略主題
                            </label>
                            <input
                              type="text"
                              placeholder={oRes.strategicThemeName}
                              disabled
                              className="h-10 w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                            />
                          </div>
                          <div className="mt-0 w-5/12">
                            <label className="mb-3 ml-5 block text-sm font-medium text-black dark:text-white">
                              戰略目標
                            </label>
                            <input
                              type="text"
                              placeholder={oRes.strategicOName}
                              disabled
                              className="ml-5 h-10 w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                            />
                          </div>
                        </div>

                        <div className="ml-0 mt-4 w-full">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            指標來源
                          </label>
                          <input
                            type="text"
                            placeholder={oRes.indicatorsName}
                            disabled
                            className="h-10   w-[685px] rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                          />
                        </div>

                        <div className="ml-0 mt-4 w-full ">
                          <label className="block pb-3 text-sm font-medium  text-black dark:text-white">
                            目標(O)描述
                          </label>
                          <textarea
                            rows={6}
                            disabled
                            placeholder={oRes.description}
                            className="h-15 w-[685px]  rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2  text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                          ></textarea>
                        </div>

                        <div className="flex">
                          <div className="ml-0 w-3/12">
                            <label className="mb-3 mt-2  block text-sm font-medium text-black dark:text-white">
                              時間類型
                            </label>
                            <input
                              type="text"
                              placeholder={
                                systemPeriods.find(
                                  (x) => x.id === oRes.objective.okrperiodId,
                                )?.okrYear + "年度"
                              }
                              disabled
                              className="w-full border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                            />
                          </div>

                          <div className="ml-6 mt-2 w-3/12">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              負責人
                            </label>
                            <input
                              type="text"
                              placeholder={oRes.belongToEmplN}
                              disabled
                              className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                            />
                          </div>

                          <div className="ml-6 mt-2 w-3/12">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              OKR級別
                            </label>
                            <input
                              type="text"
                              placeholder={"公司級"}
                              disabled
                              className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                            />
                          </div>

                          <div className=" ml-6 flex w-5/12">
                            <div className="mt-2">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                審核結果
                              </label>
                              <div className="relative z-20 bg-white dark:bg-form-input">
                                {oRes.approverStatus !== "Auditing" && (
                                  <input
                                    type="text"
                                    placeholder={
                                      oRes.approverStatus === "Completed"
                                        ? "通过"
                                        : "驳回"
                                    }
                                    disabled
                                    className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                                  />
                                )}

                                {oRes.approverStatus === "Auditing" &&
                                  isSubmitter && (
                                    <input
                                      type="text"
                                      placeholder="審核中"
                                      disabled
                                      className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                                    />
                                  )}

                                {oRes.approverStatus === "Auditing" &&
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
                      </div>
                    </div>
                    {oRes.approverStatus === "Refused" && (
                      <div className="ml-6 w-11/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          駁回原因
                        </label>
                        <input
                          type="text"
                          placeholder={oRes.refuseReason}
                          disabled
                          className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                        />
                      </div>
                    )}

                    {selectedOption === "Refused" && (
                      <div className="ml-6 w-11/12">
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
                  <ModalFooter className="p-0">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="mr-5"
                    >
                      取消
                    </Button>
                    {oRes.approverStatus === "Auditing" && !isSubmitter && (
                      <Button
                        color="default"
                        onPress={() => {
                          handleAudit();
                          onClose();
                        }}
                      >
                        確認
                      </Button>
                    )}
                  </ModalFooter>
                </div>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
