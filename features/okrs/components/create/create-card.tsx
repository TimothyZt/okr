"use client";
import React, { useState } from "react";
import { KeyResult, Objective } from "../../dtos/okr-dtos";
import {
  deleteObjectiveAction,
  putOKRToUndoAction,
  submmitObjectiveAction,
} from "../../server-actions/actions";
import Progress from "@/components/Progress";
import OContent from "./create-o-content";
import KRTable from "./create-kr-table";
import KRTableItem from "./create-kr-tableItem";
import CardBottonBtn from "./button/card-under-button";
import CardBottomBtnTrack from "./button/card-under-button-track";
import { FeedbackResponse } from "../../dtos/feedback-dtos";
import { Me } from "../../../users/dtos/users-dto";
import { DepartmentDto, Period } from "../../../baseInfo/dtos/baseinfo-dtos";
import { Bounce, toast } from "react-toastify";
import CreateFeedbackButton from "./button/create-feedback-button";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import ensurePeriodIsHavePermission from "../../../system/extension/system-extension";

interface Props {
  objective: Objective;
  keyResults: KeyResult[];
  isAllPage: boolean;
  feedbacks: FeedbackResponse[];
  me: Me;
  myRespCompany: DepartmentDto;
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  selectSeasonName: string;
}

export default function OKRCard({
  objective,
  keyResults,
  isAllPage,
  feedbacks,
  me,
  myRespCompany,
  systemPeriods,
  currentSystemPeriod,
  selectSeasonName,
}: Props) {
  let i = 1;
  keyResults.forEach((element) => {
    element.sortId = i++;
  });

  const periodByO = systemPeriods.find((x) => x.id === objective.okrperiodId);

  //Cancel OKR
  const handleCancelOKRClick = async () => {
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!, systemPeriods)) {
      const isConfirmed = confirm(
        "確定要刪除名爲" + objective.desc + "的OKR嗎?",
      );
      if (isConfirmed) {
        unpackActionResponse(await deleteObjectiveAction(objective.id));
        toast.success("成功刪除OKR!", {
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
  const handleSubmmitOKRClick = async () => {
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!, systemPeriods)) {
      const isConfirmed = confirm(
        "確定要提交名爲" + objective.desc + "的OKR嗎?",
      );
      if (isConfirmed) {
        try {
          const sumOfWeights = keyResults.reduce(
            (accumulator, currentValue) => {
              return (
                parseFloat(accumulator.toFixed(1)) +
                parseFloat(currentValue.weight!.toFixed(1))
              );
            },
            0,
          );
          if (sumOfWeights !== 100) {
            toast.error("所有kr的權重總和應為100%!", {
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
            unpackActionResponse(await submmitObjectiveAction(objective.id));

            toast.success("成功提交OKR!", {
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
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleUndoClick = async () => {
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!, systemPeriods)) {
      const isConfirmed = confirm(
        "確定要撤銷名爲" + objective.desc + "的OKR嗎?",
      );
      if (isConfirmed) {
        unpackActionResponse(await putOKRToUndoAction(objective.id));
        toast.success("成功撤銷已提交的OKR!", {
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
  let selectSeason = currentSystemPeriod.sysCodeValue;
  if (selectSeasonName === "第四季度") {
    selectSeason = "ForthSeason";
  }
  if (selectSeasonName === "第三季度") {
    selectSeason = "ThirdSeason";
  }
  if (selectSeasonName === "第二季度") {
    selectSeason = "SecondSeason";
  }
  if (selectSeasonName === "第一季度") {
    selectSeason = "FirstSeason";
  }
  const okrYearByO = systemPeriods.find(
    (x) => x.id === objective.okrperiodId,
  )?.okrYear;

  const fbsByPeriod = feedbacks.filter(
    (x) => x.period === selectSeason,
  );
  const isSaved = fbsByPeriod.every(
    (x) =>
      x.feedback !== null &&
      x.feedback?.progressDescription !== "" &&
      x.feedback?.selfScore !== "",
  );

  return (
    <main>
      <div className=" w-12/12 card mt-5 h-full overflow-y-auto bg-base-100 shadow-xl">
        <div className="card-body overflow-y-auto">
          {!isAllPage && (
            <div className="justify-content ml-0 mr-0 flex w-full bg-center">
              <Progress
                progressValue={100}
                status={objective.okrStatus!}
                isReject={
                  objective.auditBackStatus === "Refused" ||
                  keyResults.filter((x) => x.auditBackStatus === "Refused")
                    .length !== 0
                    ? true
                    : false
                }
                objectiveId={objective.id}
                auditBackManagementId={objective.auditBackManagementId}
              ></Progress>
            </div>
          )}
          <div className="mt-0 w-full">
            <OContent
              objective={objective}
              feedbacks={feedbacks}
              krNum={keyResults.length}
              currentSystemPeriod={currentSystemPeriod}
              me={me}
              myRespCompany={myRespCompany}
              systemPeriods={systemPeriods}
              krs={keyResults}
            />
            <div className="ml-5 mr-5 overflow-auto">
              <KRTable
                okrYearByO={okrYearByO!}
                oStatus={objective.okrStatus!}
                oId={objective.id}
                krNum={keyResults.length}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
                systemPeriods={systemPeriods}
                krs={keyResults}
              >
                {isExpanded &&
                  keyResults.map((kr, index) => (
                    <KRTableItem
                      key={index}
                      kr={kr}
                      objectiveId={objective.id}
                      okrStatus={objective.okrStatus!}
                      krNum={keyResults.length}
                      feedbackResponse={
                        feedbacks.find(
                          (x) =>
                            x.keyResult.id === kr.id &&
                            x.feedback?.okrPeriodId === currentSystemPeriod.id,
                        )!
                      }
                      systemPeriods={systemPeriods}
                      isAllPage={isAllPage}
                      okrPeriodId={objective.okrperiodId!}
                    />
                  ))}
              </KRTable>
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
          {/* {okrStatus === 'create' && <UpdateOKR></UpdateOKR>} */}
          {objective.okrStatus! === "audit" &&
            !me.departmentDto.departments.find(
              (x) =>
                x.code.length === 6 &&
                x.roles?.find(
                  (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
                ) &&
                x.roles?.length === 1 &&
                x.id === objective.departmentId,
            ) && (
              <CardBottonBtn handleUndoClick={handleUndoClick}></CardBottonBtn>
            )}
          {objective.okrStatus! === "track" && !isAllPage && (
            <CardBottomBtnTrack
              objectiveId={objective.id}
              isSaved={isSaved}
            ></CardBottomBtnTrack>
          )}

          <CreateFeedbackButton
            objective={objective}
            isAllPage={isAllPage}
            currentPeriod={currentSystemPeriod}
            me={me}
            isSaved={isSaved} selectSeasonName={selectSeasonName}
                      ></CreateFeedbackButton>
       
        </div>

        {objective.okrStatus! === "create" && (
          <footer className="footer footer-center bg-green-200  p-8 opacity-90">
            <aside>
              <button
                disabled={
                  me.departmentDto.departments.find(
                    (x) =>
                      x.roles?.find(
                        (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
                      ) && x.roles.length === 1,
                  ) !== undefined || objective.belongToEmplId !== me.id
                }
                className="btn btn-success btn-sm absolute bottom-0 right-6 mb-4 w-25 text-white "
                onClick={handleSubmmitOKRClick}
              >
                提交發佈
              </button>

              <button
                className="btn btn-outline btn-success btn-sm absolute bottom-0 right-36 mb-4 w-25 bg-white"
                onClick={handleCancelOKRClick}
              >
                取消
              </button>
            </aside>
          </footer>
        )}
      </div>
    </main>
  );
}
