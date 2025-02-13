"use client";
import React, { useState } from "react";
import { KeyResult, Objective } from "../../../../../dtos/okr-dtos";
import { Feedback, FeedbackRequest } from "../../../../../dtos/feedback-dtos";
import RatingDropdown from "../rating-dropdown";
import { unpackActionResponse } from "../../../../../../../lib/server-actions/action-response";
import {
  putFeedbackRequestAction,
  putFeedbackSubmitStatusAction,
  putFeedbackToUndoAction,
  putSecondSubmitFeedbackAction,
} from "../../../../../server-actions/actions";
import { Me } from "../../../../../../users/dtos/users-dto";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";
import { toast, Bounce } from "react-toastify";
import FeedbackRejectModal from "./feedback-reject-modal";
import FeedbackRejectReasonPoPover from "./feedback-reject-reason-input";
import FeedbackRejectInput from "./feedback-reject-reason-input";
interface Props {
  objective: Objective;
  keyResult: KeyResult;
  feedback: Feedback;
  period: string;
  me: Me;
  currentSystemPeriod: PeriodDto;
  isSingle: boolean;
}

export default function TrackFeedbackCard({
  objective,
  keyResult,
  feedback,
  period,
  me,
  currentSystemPeriod,
  isSingle,
}: Props) {
  //const krNum = keyResults.length;
  let isSubmitted = false;
  let submitTime = "未提交";
  let self = "";
  let pv = "";
  const isHeadP = me.roles.find(
    (x) => x.roleName === "HeadCompanyPreliminaryReviewer",
  );

  const isSubR = me.departmentDto.departments
    .find((x) => x.id === objective.departmentId)
    ?.roles?.find((x) => x === "11c28011-db0c-44c1-96cb-160c92172a34");

  if (feedback !== null && feedback.isSubmitted === 1) {
    isSubmitted = true;
    submitTime = feedback.submitOn.substring(0, 10);
    if (feedback.selfScore === "0.0") {
      self = "0.0 / 無進展";
    } else if (feedback.selfScore === "0.3") {
      self = "0.3 / 未達到預期目標";
    } else if (feedback.selfScore === "0.7") {
      self = "0.7 / 達到預期目標";
    } else if (feedback.selfScore === "1.0") {
      self = "1.0 / 超出預期結果";
    }
  }

  let departs = "";
  if (keyResult.belongToDepartment1Name !== undefined) {
    departs = keyResult.belongToDepartment1Name;
  }
  if (
    keyResult.belongToDepartment2Name !== undefined &&
    keyResult.belongToDepartment2Name !== ""
  ) {
    departs =
      keyResult.belongToDepartment1Name +
      "," +
      keyResult.belongToDepartment2Name;
  }

  const [progressDescription, setProgressDescription] = useState(
    feedback !== null ? (feedback.progressDescription ?? "") : "",
  );
  const [progressValue, setProgressValue] = useState(
    feedback !== null ? (feedback.progressValue.toString() ?? "") : "",
  );
  const [defectProblem, setDefectProblem] = useState(
    feedback !== null ? (feedback.defectProblem ?? "") : "",
  );
  const [solution, setSolution] = useState(
    feedback !== null ? (feedback.solution ?? "") : "",
  );
  const [selfScore, setSelfScore] = useState(
    feedback !== null ? (feedback.selfScore ?? "") : "",
  );
  const [nextPlanDescription, setNextPlanDescription] = useState(
    feedback !== null ? (feedback.nextPlanDescription ?? "") : "",
  );
  const [requiredResources, setRequiredResources] = useState(
    feedback !== null ? (feedback.requiredResources ?? "") : "",
  );
  const [planDescription, setPlanDescription] = useState(
    feedback !== null ? (feedback.planDescription ?? "") : "",
  );
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "progressDescription":
        setProgressDescription(value);
        break;
      case 'planDescription':
        setPlanDescription(value);
        break;
      case "progressValue":
        setProgressValue(value);
        break;
      case "requiredResources":
        setRequiredResources(value);
        break;
      case "defectProblem":
        setDefectProblem(value);
        break;
      case "solution":
        setSolution(value);
        break;
      case "nextPlanDescription":
        setNextPlanDescription(value);
        break;
      default:
        break;
    }
  };
  const validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (
      value === "" ||
      (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) >= 0)
    ) {
      setProgressValue(value);
    } else {
      console.log("请输入0-100的数字或留空");
    }
  };

  function toastError(name: string) {
    toast.error("反饋提交失敗: " + name + "爲空！", {
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

  function toastSuccess(name: string) {
    toast.success(name, {
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

  const handleSaveOKRClick = async () => {
    const request: FeedbackRequest = {
      planDescription: planDescription,
      progressDescription: progressDescription,
      progressValue: progressValue,
      defectProblem: defectProblem,
      solution: solution,
      requiredResources: requiredResources,
      selfScore: selfScore,
      highScore: "",
      period: period,
      nextPlanDescription: nextPlanDescription,
      isSubmitted: 0,
      okrPeriodId: currentSystemPeriod.id,
    };
    unpackActionResponse(
      await putFeedbackRequestAction(objective.id, keyResult.id, request),
    );
    toastSuccess("反饋保存成功！");
  };
  const handleSubmmitOKRClick = async () => {
    const request: FeedbackRequest = {
      planDescription: planDescription,
      progressDescription: progressDescription,
      progressValue: progressValue,
      defectProblem: defectProblem,
      solution: solution,
      requiredResources: requiredResources,
      selfScore: selfScore,
      highScore: "",
      period: period,
      nextPlanDescription: nextPlanDescription,
      isSubmitted: 1,
      okrPeriodId: currentSystemPeriod.id,
    };

    if (request.progressDescription === "") {
      toastError("進度描述");
    } else if (request.progressValue === "") {
      toastError("進度");
    } else if (request.selfScore === "") {
      toastError("計劃描述");
    } else {
      unpackActionResponse(
        await putFeedbackSubmitStatusAction(
          objective.id,
          keyResult.id,
          request,
        ),
      );
      toastSuccess("反饋提交成功！");
    }
  };

  const handleSecondSubmmitOKRClick = async () => {
    unpackActionResponse(
      await putSecondSubmitFeedbackAction(
        objective.id,
        feedback.id,
        "IsSecondSubmitted",
      ),
    );
    toastSuccess("反饋初審確認成功！");
  };

  const handleThirdSubmmitOKRClick = async () => {
    unpackActionResponse(
      await putSecondSubmitFeedbackAction(
        objective.id,
        feedback.id,
        "IsThirdSubmitted",
      ),
    );
    toastSuccess("反饋負責人確認成功！");
  };

  const [isExpanded, setIsExpanded] = useState(isSingle);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  let isHidden = true;
  if (feedback?.isSubmitted === 0) {
    if (
      me.roles.find(
        (x) =>
          x.roleName === "HeadCompanyPreliminaryReviewer" ||
          x.roleName === "HeadCompanyResponsiblePerson",
      ) === undefined
    ) {
      const departmentByUser = me.departmentDto.departments.find(
        (x) => x.id === objective.departmentId,
      );
      const secretaryByDepartment = departmentByUser!.roles?.find(
        (x) => x === "8E7801AB-6BCA-4C8B-AD2C-F1C2FAC01DD4".toLowerCase(),
      );

      if (
        secretaryByDepartment !== undefined ||
        me.id === objective.belongToEmplId
      ) {
        isHidden = false;
      }
    }
  }
  if (feedback?.isSubmitted === 1) {
    isHidden = false;
  }
  if(feedback === null || feedback === undefined)
    {
      isHidden = false;
    }
  return (
    <>
      <main className="mt-5">
        <div className="w-160  card mt-5 h-full bg-base-100 shadow-xl">
          <div className="card-body ">
            <div className="card ml-4 mt-0">
              <div className="content">
                <div className="ml-5 block" onClick={toggleExpand}>
                  <div className="flex">
                    <button className="btn  btn-success btn-xs w-14 rounded-full text-slate-200">
                      KR{keyResult.sortId}
                    </button>
                    {feedback !== null &&
                      feedback.rejectReason !== "" &&
                      feedback.rejectReason !== null &&
                      feedback.isThirdSubmitted !== 1 && (
                        <FeedbackRejectInput
                          rejectReason={feedback.rejectReason}
                          handleTextareaMouseDown={() =>
                            handleTextareaMouseDown
                          }
                        ></FeedbackRejectInput>
                      )}

                    <h3 className="ml-3 max-w-180 font-bold text-black">
                      {keyResult.description}
                    </h3>
                  </div>

                  <div className="flex">
                    <div className="ml-0 mt-3 flex">
                      <label className="mb-2 ml-3 text-xs text-slate-500">
                        归属部門: {departs}
                      </label>
                    </div>

                    {isSubmitted && (
                      <div className="ml-0 mt-3 flex">
                        {feedback !== null &&
                          feedback.progressValue !== null && (
                            <label className="mb-2 ml-3 text-xs text-slate-500">
                              {"完成度: " + feedback.progressValue + " %"}
                            </label>
                          )}
                      </div>
                    )}

                    {isSubmitted && (
                      <div className="ml-0 mt-3 flex">
                        {feedback !== null &&
                          feedback.selfScore !== "" &&
                          feedback.selfScore !== null && (
                            <label className="mb-2 ml-3 text-xs text-slate-500">
                              {"自評: " + feedback.selfScore}
                            </label>
                          )}
                      </div>
                    )}

                    {isSubmitted && (
                      <div className="ml-0 mt-3 flex">
                        {feedback !== null &&
                          feedback.highScore !== "" &&
                          feedback.highScore !== null && (
                            <label className="mb-2 ml-3 text-xs text-slate-500">
                              {"上評: " + feedback.highScore}
                            </label>
                          )}
                      </div>
                    )}

                    {isSubmitted && feedback.isSecondSubmitted === 1 && (
                      <div className="ml-0 mt-3 flex">
                        {feedback !== null && (
                          <label className="mb-2 ml-3 text-xs text-slate-500">
                            {"初审已确认"}
                          </label>
                        )}
                      </div>
                    )}
                    {isSubmitted && feedback.isSecondSubmitted !== 1 && (
                      <div className="ml-0 mt-3 flex">
                        {feedback !== null && (
                          <label className="mb-2 ml-3 text-xs text-rose-600">
                            等待初审确认
                          </label>
                        )}
                      </div>
                    )}

                    {isSubmitted &&
                      feedback.isSecondSubmitted === 1 &&
                      feedback.isThirdSubmitted === 1 && (
                        <div className="ml-0 mt-3 flex">
                          {feedback !== null && (
                            <label className="mb-2 ml-3 text-xs text-slate-500">
                              {"子公司負責人已確認"}
                            </label>
                          )}
                        </div>
                      )}
                    {isSubmitted &&
                      feedback.isSecondSubmitted === 1 &&
                      feedback.isThirdSubmitted === 0 && (
                        <div className="ml-0 mt-3 flex">
                          {feedback !== null && (
                            <label className="mb-2 ml-3 text-xs text-rose-600">
                              等待子公司負責人確認
                            </label>
                          )}
                        </div>
                      )}

                    <div className="absolute right-10 ml-0 flex">
                      <label className="text-md mb-2 ml-3 text-black">
                        點擊這裏可展開/收縮
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="bottom-line ml-5"
                  style={{
                    borderBottom: "1px solid gray",
                    width: "97%",
                    opacity: 0.3,
                  }}
                />
                {isExpanded && (
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    {!isSubmitted && (
                      <>
                        <div className="rounded--2xl ml-10 mt-4 flex h-full w-11/12 rounded-l-none bg-white ">
                          <div className="w-6/12">
                          <div className="mb-3 mt-1">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                本季度計劃
                              </label>
                              <textarea
                                rows={3}
                                name="planDescription"
                                placeholder=""
                                value={isHidden ? "" : planDescription}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>
                            <div className="mb-3 mt-1">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                進度描述
                              </label>
                              <textarea
                                rows={3}
                                name="progressDescription"
                                placeholder=""
                                value={isHidden ? "" : progressDescription}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>

                            <div className="mb-3">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                現存/潛在問題
                              </label>
                              <textarea
                                rows={6}
                                name="defectProblem"
                                placeholder={isHidden ? "" : defectProblem}
                                value={isHidden ? "" : defectProblem}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>

                            <div className="mb-3">
                              <label className="mb-3 block  text-sm font-medium text-black dark:text-white">
                                解決策略
                              </label>
                              <textarea
                                rows={6}
                                name="solution"
                                placeholder=""
                                value={isHidden ? "" : solution}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>

                            <div className="mb-3">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                所需資源
                              </label>
                              <textarea
                                rows={6}
                                name="requiredResources"
                                placeholder=""
                                value={isHidden ? "" : requiredResources}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>
                          </div>
                          <div className="ml-10 mt-0 w-6/12">
                            <div className="mt-1">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                下一季度計劃
                              </label>
                              <textarea
                                rows={6}
                                name="nextPlanDescription"
                                placeholder=""
                                value={isHidden ? "" : nextPlanDescription}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>
                            <div className="mb-3">
                              <div>
                                <label className="mb-3 mt-2 block text-sm font-medium text-black dark:text-white">
                                  完成度(%)
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={isHidden ? "" : progressValue}
                                  onChange={validateInput}
                                  className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                                />
                              </div>
                            </div>

                            <div className="mb-2">
                              <RatingDropdown
                                title="自評"
                                type={false}
                                selectOptionValue={
                                  isHidden
                                    ? ""
                                    : feedback !== null
                                      ? (feedback.selfScore ?? "")
                                      : ""
                                }
                                setValue={setSelfScore}
                              />
                            </div>
                            <div className=" mt-3">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                反饋時間
                              </label>
                              <input
                                type="text"
                                placeholder={isHidden ?"":submitTime}
                                disabled
                                className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                              />
                            </div>
                            <div className="mt-4">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                上評
                              </label>
                              <input
                                type="text"
                                placeholder={isHidden ?  "未评分": feedback?.highScore}
                                disabled
                                className="w-full rounded-lg border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {isSubmitted && (
                      <>
                        <div className="rounded--2xl ml-10 mt-4 flex h-full w-11/12 rounded-l-none bg-white ">
                          <div className="w-6/12">
                          <div className="mb-3 mt-1 ">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              本季度計劃
                              </label>
                              <textarea
                                rows={6}
                                name="planDescription"
                                placeholder=""
                                disabled
                                value={isHidden ?"":planDescription}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>
                            <div className="mb-3 mt-1 ">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                進度描述
                              </label>
                              <textarea
                                rows={6}
                                name="progressDescription"
                                placeholder=""
                                disabled
                                value={isHidden ?"":progressDescription}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>

                            <div className="mb-3">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                現存/潛在問題
                              </label>
                              <textarea
                                rows={6}
                                name="defectProblem"
                                placeholder={isHidden ?"":defectProblem}
                                value={isHidden ?"":defectProblem}
                                disabled
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>

                            <div className="mb-3 ">
                              <label className="mb-3 block  text-sm font-medium text-black dark:text-white">
                                解決策略
                              </label>
                              <textarea
                                rows={6}
                                name="solution"
                                placeholder=""
                                disabled
                                value={isHidden ?"":solution}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>

                            <div className="mb-3 ">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                所需資源
                              </label>
                              <textarea
                                rows={6}
                                name="requiredResources"
                                placeholder=""
                                disabled
                                value={isHidden ?"":requiredResources}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>
                          </div>
                          <div className="ml-10 mt-0 w-6/12">
                            <div className="mb-3 mt-1">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                下一季度計劃
                              </label>
                              <textarea
                                rows={6}
                                name="nextPlanDescription"
                                placeholder=""
                                disabled
                                value={isHidden ?"":nextPlanDescription}
                                onChange={handleTextAreaChange}
                                className="h-16 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              ></textarea>
                            </div>
                            <div className="mb-3">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                完成度(%)
                              </label>
                              <input
                                type="text"
                                placeholder={isHidden ?"":progressValue}
                                disabled
                                className="w-full rounded-lg border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                              />
                            </div>

                            <div className="mb-3">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                自評
                              </label>
                              <input
                                type="text"
                                placeholder={isHidden ?"":self}
                                disabled
                                className="w-full rounded-lg border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                              />
                            </div>
                            <div className="mb-4 mt-4">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                反饋時間
                              </label>
                              <input
                                type="text"
                                placeholder={isHidden ?"":submitTime}
                                disabled
                                className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                              />
                            </div>
                            <div className="">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                上級評分
                              </label>
                              <input
                                type="text"
                                placeholder={isHidden ?  "未评分": (feedback?.highScore ?? "未评分") }
                                disabled
                                className="w-full rounded-lg border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isSubmitted &&
            (me.id === (feedback! && feedback.createBy) ||
              me.id === objective.belongToEmplId ||
              me.id === objective.createBy ||
              (me.roles.find((x) => x.roleName === "Secretary") &&
                me.departmentDto.departments
                  .find((x) => x.id == objective.departmentId)
                  ?.roles?.find(
                    (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
                  ))) && (
              <>
                <footer className="footer footer-center bg-green-200  p-8 opacity-90">
                  <aside>
                    <button
                      disabled={
                        (me.roles.find((x) => x.roleName === "Secretary") !==
                        undefined
                          ? true
                          : false) && objective.belongToEmplId !== me.id
                      }
                      className="btn btn-sm absolute bottom-0 right-6 mb-4 w-25 bg-rose-500 text-white hover:border-black hover:bg-rose-600"
                      onClick={handleSubmmitOKRClick}
                    >
                      提交
                    </button>

                    <button
                      className={
                        (feedback?.progressDescription !== "" &&
                          feedback?.selfScore !== "" &&
                          feedback?.progressDescription !== undefined &&
                          feedback?.progressValue !== undefined &&
                          feedback?.selfScore !== undefined) === true
                          ? "btn btn-outline btn-sm absolute bottom-0 right-36 mb-4 w-25 bg-green-600 text-white  hover:border-black hover:bg-green-700"
                          : "btn btn-outline btn-sm absolute bottom-0 right-36 mb-4 w-25 bg-rose-500 text-white  hover:border-black hover:bg-rose-600"
                      }
                      onClick={handleSaveOKRClick}
                    >
                      保存
                    </button>
                  </aside>
                </footer>
              </>
            )}

          {isSubmitted && feedback.stage === "SecondSubmit" && isHeadP && (
            <>
              <footer className="footer footer-center bg-green-200  p-8 opacity-90">
                <aside>
                  <button
                    className="btn btn-success btn-sm absolute bottom-0 right-6 mb-4 w-25 text-white "
                    onClick={handleSecondSubmmitOKRClick}
                  >
                    初審確認
                  </button>
                  {/* <button
                    className="btn btn-sm absolute bottom-0 right-34 mb-4 w-25 border-2 border-green-400 bg-white text-green-600 "
                    onClick={()=>handleUndoOKRClick("初審")}
                  >
                    駁回
                  </button> */}
                  <FeedbackRejectModal
                    fbId={feedback.id}
                    oId={objective.id}
                    role={"初審"}
                  ></FeedbackRejectModal>
                </aside>
              </footer>
            </>
          )}

          {feedback !== null &&
            feedback.isSecondSubmitted === 1 &&
            feedback.stage === "ThirdSubmit" &&
            isSubR && (
              <>
                <footer className="footer footer-center bg-green-200  p-8 opacity-90">
                  <aside>
                    <button
                      className="btn btn-success btn-sm absolute bottom-0 right-6 mb-4 w-25 text-white "
                      onClick={handleThirdSubmmitOKRClick}
                    >
                      負責人確認
                    </button>
                    <FeedbackRejectModal
                      fbId={feedback.id}
                      oId={objective.id}
                      role={"負責人"}
                    ></FeedbackRejectModal>
                  </aside>
                </footer>
              </>
            )}
        </div>
      </main>
    </>
  );
}
