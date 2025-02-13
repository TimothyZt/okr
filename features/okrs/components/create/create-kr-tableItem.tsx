import React, { useState } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import {
  deleteKeyResultAction,
  putKeyResultAction,
} from "../../server-actions/actions";
import AlertKRContent from "./alter/alter-kr-content";
import KRDetail from "./detail/create-kr-detail";
import { KeyResult, UpdateKR } from "../../dtos/okr-dtos";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import ensurePeriodIsHavePermission from "../../../system/extension/system-extension";
import { toast, Bounce } from "react-toastify";
import { FeedbackResponse } from "../../dtos/feedback-dtos";
import FeedbackRejectInput from "./button/button-content/feedback/feedback-reject-reason-input";

interface Props {
  kr: KeyResult;
  objectiveId: string;
  okrStatus: string;
  krNum: number;
  systemPeriods: PeriodDto[];
  isAllPage: boolean;
  feedbackResponse: FeedbackResponse;
  okrPeriodId: string;
}
const KRTableItem = ({
  kr,
  objectiveId,
  okrStatus,
  krNum,
  systemPeriods,
  feedbackResponse,
  isAllPage,
  okrPeriodId,
}: Props) => {
  let d2Name = "";
  if (
    kr.belongToDepartment2Name !== null &&
    kr.belongToDepartment2Name !== ""
  ) {
    d2Name = "、部门2: " + kr.belongToDepartment2Name;
  }
  const AssignmentDescrip = "部门1:" + kr.belongToDepartment1Name + d2Name;
  const periodByO = systemPeriods.find((x) => x.id === okrPeriodId);
  const handleCancelOKRClick = async () => {
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!, systemPeriods)) {
      const isConfirmed = confirm(
        "確定要刪除名爲" + kr.description + "的KR嗎?",
      );
      if (isConfirmed) {
        unpackActionResponse(await deleteKeyResultAction(objectiveId, kr.id));
        toast.success("成功刪除KR!", {
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
  const [krWeight, setKrWeight] = useState<number>(kr.weight!); // 初始值可以根据需要调整
  const [isEditing, setIsEditing] = useState(false);
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      if (krWeight > 100 || krWeight <= 0) {
        toast.error("权重的值不符合要求,请输入0-100的值", {
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
        if (ensurePeriodIsHavePermission(periodByO?.okrYear!, systemPeriods)) {
          const update: UpdateKR = {
            id: kr.id,
            description: kr.description,
            krType: kr.krTypeId,
            department:
              kr.belongToDepartment2Id ===
              "00000000-0000-0000-0000-000000000000"
                ? [kr.belongToDepartment1Id!]
                : [kr.belongToDepartment1Id!, kr.belongToDepartment2Id!],
            weight: krWeight,
          };
          await putKeyResultAction(objectiveId, kr.id, update);
          toast.success("關鍵結果(KR)修改成功!", {
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
      setIsEditing(false);
    }
  };
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {okrStatus === "create" && (
        <tr className="hover border-none">
          <td>
            <div className="flex">
              <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-green-600">
                KR{kr.sortId}
              </button>
              <label id="itemname" className="ml-2 mt-0.5">
                {kr.description}
              </label>
            </div>
          </td>
          <td className="text-center">
            <div>
              <label className="input h-4 w-10 max-w-xs  rounded-none ">
                {isEditing ? (
                  <input
                    type="number"
                    value={krWeight}
                    onChange={(e) => setKrWeight(Number(e.target.value))}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => setIsEditing(true)}>{kr.weight}%</span>
                )}
                {/* <kbd className="kbd-sm ml-1 mt-1">%</kbd> */}
              </label>
            </div>
          </td>
          <td className="mr-4 flex text-center">
            {kr.auditBackStatus !== "Completed" && (
              <>
                <AlertKRContent
                  oId={objectiveId}
                  kr={kr}
                  krNum={krNum}
                  systemPeriods={systemPeriods}
                  okrPeriodId={okrPeriodId}
                />
                <button
                  className="btn  btn-ghost btn-xs inline-block rounded-none text-green-500"
                  onClick={handleCancelOKRClick}
                >
                  删除
                </button>
              </>
            )}
            <KRDetail btnName="詳情" kr={kr}></KRDetail>
          </td>
        </tr>
      )}

      {okrStatus === "audit" && (
        <tr className="hover w-full border-none">
          <td>
            <div className="flex text-center">
              <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
                KR{kr.sortId}
              </button>
              <label id="itemname" className="ml-2 mt-0.5 text-center">
                {kr.description}
              </label>
            </div>
          </td>
          <td className="text-center">{kr.weight}%</td>
          <td className="text-center">
            <div>
              <button
                className="btn  btn-xs w-16 rounded-none bg-gray  text-center text-black"
                disabled
              >
                待審核
              </button>
            </div>
          </td>
          <td className="text-center">
            <KRDetail btnName="詳情" kr={kr}></KRDetail>
          </td>
        </tr>
      )}

      {okrStatus === "track" && (
        <tr className="hover border-none">
          <td>
            <div>
              <div className="flex text-center">
                <button className="btn btn-xs mr-1 w-12 rounded-xl bg-green-100 text-center text-green-600">
                  KR{kr.sortId}
                </button>

                {!isAllPage &&
                  feedbackResponse! &&
                  feedbackResponse.feedback !== null &&
                  feedbackResponse.feedback?.rejectReason !== "" &&
                  feedbackResponse.feedback?.rejectReason !== null &&
                  feedbackResponse.feedback?.isThirdSubmitted !== 1 && (
                    <FeedbackRejectInput
                      rejectReason={feedbackResponse?.feedback?.rejectReason!}
                      handleTextareaMouseDown={() => handleTextareaMouseDown}
                    ></FeedbackRejectInput>
                  )}
                <label id="itemname" className="ml-2 mt-0.5 text-center">
                  {kr.description}
                </label>
              </div>
              <div className="ml-13 mt-1 flex">
                <button
                  className="w-max-150 btn btn-ghost btn-xs  rounded-full text-start text-xs"
                  disabled
                >
                  <label id="asignto" className="mt-0.5 text-xs text-slate-400">
                    指派給:{AssignmentDescrip}
                  </label>
                </button>
              </div>
            </div>
          </td>

          <td className="text-center">
            <CircularProgress
              classNames={{
                svg: "w-12 h-12 drop-shadow-sm",
                indicator: "stroke-black",
                track: "stroke-black/10",
                // value: "text-xs  font-semibold text-black",
              }}
              value={kr.progress === undefined ? 0 : parseInt(kr.progress)}
              strokeWidth={1}
              showValueLabel={true}
              className="ml-32"
            />
          </td>
          <td className="text-center">{kr.weight}%</td>
          <td className="text-center">
            <KRDetail btnName="詳情" kr={kr}></KRDetail>
          </td>
        </tr>
      )}

      {okrStatus === "end" && (
        <tr className="hover border-none">
          <td>
            <div>
              <div className="flex text-center">
                <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
                  KR{kr.sortId}
                </button>
                <label id="itemname" className="ml-2 mt-0.5 text-center">
                  {kr.description}
                </label>
              </div>
              <div className="ml-13 mt-1 flex">
                <button
                  className="btn btn-ghost btn-xs w-25  rounded-full text-start text-xs"
                  disabled
                >
                  <label id="asignto" className="mt-0.5 text-xs text-slate-400">
                    指派給:{AssignmentDescrip}
                  </label>
                </button>
              </div>
            </div>
          </td>

          <td className="text-center">
            <CircularProgress
              classNames={{
                svg: "w-12 h-12 drop-shadow-sm",
                indicator: "stroke-black",
                track: "stroke-black/10",
                // value: "text-xs  font-semibold text-black",
              }}
              value={70}
              strokeWidth={1}
              showValueLabel={true}
            />
          </td>
          <td className="text-center">{kr.weight}%</td>
          <td className="text-center">0.8</td>
          <td className="text-center">
            <KRDetail btnName="詳情" kr={kr}></KRDetail>
          </td>
        </tr>
      )}
    </>
  );
};

export default KRTableItem;
