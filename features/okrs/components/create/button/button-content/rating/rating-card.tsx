"use client";
import React, { useState } from "react";
import { KeyResult } from "../../../../../dtos/okr-dtos";
import { Feedback, RatingRequest } from "../../../../../dtos/feedback-dtos";
import { unpackActionResponse } from "../../../../../../../lib/server-actions/action-response";
import { putHighScoreAction } from "../../../../../server-actions/actions";
import RatingDropdown from "../rating-dropdown";
import RatingTagColor from "./rating-tag-color";
import { toast, Bounce } from "react-toastify";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";
interface Props {
  objectiveId: string;
  keyResult: KeyResult;
  feedback: Feedback;
  period: string;
  currentPeriod:PeriodDto;
}

export default function RatingCard({
  objectiveId,
  keyResult,
  feedback,
  period,
  currentPeriod
}: Props) {
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
  let isSubmitted = false;
  let submitTime = "未提交";
  let self = "";
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

  const [rating, setRating] = useState<string>(feedback.highScore);
  const handleSubmmitOKRClick = async () => {
    const request: RatingRequest = {
      objectiveId: objectiveId,
      keyResultId: keyResult.id,
      ratingScore: rating,
      period: period,
      okrPeriodId:currentPeriod.id
    };
    if (rating === "") {
      toast.error("評分失敗，請選擇上評分數！", {
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
      unpackActionResponse(
        await putHighScoreAction(objectiveId, feedback.id, request),
      );
      toast.success("評分成功!", {
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
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <main className="mt-10">
        <div className="w-160  card mt-5 h-full bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card ml-4 mt-0">
              <div className="content">
                <div className="block" onClick={toggleExpand}>
                  <div className="ml-4 flex">
                    <RatingTagColor
                      feedback={feedback}
                      isSubmitted={feedback.highScore === null}
                      keyResult={keyResult}
                    ></RatingTagColor>
                    {/* <button className="btn  btn-success btn-xs w-14 rounded-full text-slate-200">
                      KR{keyResult.sortId}
                    </button> */}
                    <h3 className="ml-3 max-w-180 font-bold text-black">
                      {keyResult.description}
                    </h3>
                  </div>

                  <div className="ml-2 flex">
                    <div className="ml-0 mt-3 flex">
                      <label className="mb-2 ml-3 text-sm text-slate-500">
                        归属部門: {departs}
                      </label>
                    </div>

                    <div className="ml-0 mt-3 flex">
                      {feedback !== null && feedback.progressValue !== null && (
                        <label className="mb-2 ml-3 text-sm text-slate-500">
                          {"完成度: " + feedback.progressValue + " %"}
                        </label>
                      )}
                    </div>

                    <div className="ml-0 mt-3 flex">
                      {feedback !== null &&
                        feedback.selfScore !== "" &&
                        feedback.selfScore !== null && (
                          <label className="mb-2 ml-3 text-sm text-slate-500">
                            {"自評: " + feedback.selfScore}
                          </label>
                        )}
                    </div>
                    {!isSubmitted && (
                      <label className="mb-2 ml-3 text-sm text-red ">
                        {"上評: "}
                      </label>
                    )}
                    {isSubmitted && (
                      <div className="ml-0 mt-3 flex">
                        {feedback !== null &&
                          feedback.highScore !== "" &&
                          feedback.highScore !== null && (
                            <label className="mb-2 ml-3 text-sm  text-green-600 ">
                              {"上評: " + feedback.highScore}
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
                    <>
                      <div className="rounded--2xl ml-10 mt-4 flex w-11/12 rounded-l-none bg-white ">
                        <div className="w-6/12">
                          <div className="mb-3 mt-0 ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              進度描述
                            </label>
                            <textarea
                              rows={6}
                              name="progressDescription"
                              placeholder=""
                              disabled
                              value={
                                feedback !== null
                                  ? feedback.progressDescription
                                  : ""
                              }
                              className="h-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                          </div>

                          <div className="mb-3 ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              現存/潛在問題
                            </label>
                            <textarea
                              rows={6}
                              name="defectProblem"
                              value={
                                feedback !== null ? feedback.defectProblem : ""
                              }
                              disabled
                              className="h-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                              disabled
                              value={feedback !== null ? feedback.solution : ""}
                              className="h-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                              disabled
                              value={
                                feedback !== null
                                  ? feedback.requiredResources
                                  : ""
                              }
                              className="h-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                          </div>
                        </div>
                        <div className="ml-10 mt-0 w-6/12">
                          <div className="mb-2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              下一季度計劃
                            </label>
                            <textarea
                              rows={6}
                              name="nextPlanDescription"
                              placeholder=""
                              disabled
                              value={
                                feedback !== null
                                  ? feedback.nextPlanDescription
                                  : ""
                              }
                              className="h-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                                value={
                                  feedback !== null
                                    ? (feedback.progressValue.toString() ?? "")
                                    : ""
                                }
                                disabled
                                className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                              />
                            </div>
                          </div>

                          <div className=" mb-3">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              自評
                            </label>
                            <input
                              type="text"
                              placeholder={self}
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
                              placeholder={submitTime}
                              disabled
                              className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                            />
                          </div>
                          <div className="w-12/12 mb-5">
                            <div>
                              <RatingDropdown
                                title="上評"
                                type={false}
                                setValue={setRating}
                                selectOptionValue={rating}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
          <footer className="footer footer-center bg-green-200  p-8 opacity-90">
            <aside>
              <button
                className="btn btn-success btn-sm absolute bottom-0 right-6 mb-4 w-25 text-white "
                onClick={handleSubmmitOKRClick}
              >
                提交
              </button>
            </aside>
          </footer>
        </div>
      </main>
    </>
  );
}
