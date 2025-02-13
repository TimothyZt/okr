"use client";
import React, { useState } from "react";
import { KeyResult, Objective } from "../../dtos/okr-dtos";
import AlterOContent from "./alter/alter-o-content";
import ODetail from "./detail/create-o-detail";
import { DepartmentDto, Period } from "../../../baseInfo/dtos/baseinfo-dtos";
import { FeedbackResponse } from "../../dtos/feedback-dtos";
import { Me } from "../../../users/dtos/users-dto";
import CreateTagsDesc from "./tags-desc/create-tags-desc";
import { PeriodDto } from "../../../system/dtos/system-dtos";

interface Props {
  objective: Objective;
  feedbacks: FeedbackResponse[];
  krNum: number;
  currentSystemPeriod: PeriodDto;
  me: Me;
  myRespCompany: DepartmentDto;
  systemPeriods: PeriodDto[];
  krs: KeyResult[];
}

type CombinedProps = Props;
export default function OContent({
  objective,
  feedbacks,
  krNum,
  me,
  currentSystemPeriod,
  myRespCompany,
  systemPeriods,
  krs,
}: CombinedProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // #region Divide four season records to []
  // 首先筛选 各自季节的KR的所有fb记录  这里的记录 一定是krNum * 4  因为后台获得的空的记录会被转化成伪数据
  const springList = feedbacks.filter(
    (x) => x.feedback! && x.feedback.period === "FirstSeason",
  );
  const summerList = feedbacks.filter(
    (x) => x.feedback! && x.feedback.period === "SecondSeason",
  );
  const autumnList = feedbacks.filter(
    (x) => x.feedback! && x.feedback.period === "ThirdSeason",
  );
  const winterList = feedbacks.filter(
    (x) => x.feedback! && x.feedback.period === "ForthSeason",
  );
  
  const periodByO = systemPeriods.find(x=>x.id === objective.okrperiodId);
  let selectPeriodBySeason = currentSystemPeriod;
  if (currentSystemPeriod.okrYear > periodByO?.okrYear!) {
    selectPeriodBySeason = systemPeriods.find(x=>x.okrYear === periodByO?.okrYear! && x.sysCodeValueName === "第四季度") !
  }
  if (currentSystemPeriod.okrYear < periodByO?.okrYear!) {
    selectPeriodBySeason = systemPeriods.find(x=>x.okrYear === periodByO?.okrYear! && x.sysCodeValueName === "第一季度") !
  }
  if (currentSystemPeriod.okrYear === periodByO?.okrYear!) {
   selectPeriodBySeason = currentSystemPeriod;
  }
  //#endregion
  //#region Set season of data
  //如果一个季度里一个o的所有的kr都反馈了 则显示self high completed等分值，且springIsSubmitted代表这个季度的反馈已经完成
  let self = 0;
  let high = 0;
  let completed = 0;
  let isSubmitted = false;
  let springIsSubmitted = 0;
  if (
    springList.length !== 0 &&
    springList.every((x) => x.feedback?.isSubmitted === 1) &&
    springList.length === krNum &&
    selectPeriodBySeason.sysCodeValueName === "第一季度"
  ) {
    springIsSubmitted = 1;
    let sumSelf = 0;
    let highValue = 0;
    let completedValue = 0;
    for (let i = 0; i < springList.length; i++) {
      sumSelf +=
        parseFloat(
          springList[i].feedback?.selfScore === ""
            ? "0.0"
            : springList[i].feedback?.selfScore!,
        ) * springList[i].keyResult.weight!;
      highValue +=
        parseFloat(
          springList[i].feedback?.highScore === ""
            ? "0.0"
            : springList[i].feedback?.highScore!,
        ) * springList[i].keyResult.weight!;
      completedValue +=
        springList[i].feedback?.progressValue! *
        springList[i].keyResult.weight!;
    }
    self = parseFloat((sumSelf / 100).toFixed(1));
    high = parseFloat((highValue / 100).toFixed(1));
    completed = parseFloat((completedValue / 100).toFixed(1));
    isSubmitted = true;
  }

  let summerIsSubmitted = 0;
  if (
    summerList.length !== 0 &&
    summerList.every((x) => x.feedback?.isSubmitted === 1) &&
    summerList.length === krNum &&
    selectPeriodBySeason.sysCodeValueName === "第二季度"
  ) {
    summerIsSubmitted = 1;
    let sumSelf = 0;
    let highValue = 0;
    let completedValue = 0;
    for (let i = 0; i < summerList.length; i++) {
      sumSelf +=
        parseFloat(
          summerList[i].feedback?.selfScore! === ""
            ? "0.0"
            : summerList[i].feedback?.selfScore!,
        ) * summerList[i].keyResult.weight!;
      highValue +=
        parseFloat(
          summerList[i].feedback?.highScore === ""
            ? "0.0"
            : summerList[i].feedback?.highScore!,
        ) * summerList[i].keyResult.weight!;
      completedValue +=
        summerList[i].feedback?.progressValue! *
        summerList[i].keyResult.weight!;
    }
    self = parseFloat((sumSelf / 100).toFixed(1));
    high = parseFloat((highValue / 100).toFixed(1));
    completed = parseFloat((completedValue / 100).toFixed(1));
    isSubmitted = true;
  }

  let autumnIsSubmitted = 0;
  if (
    autumnList.length !== 0 &&
    autumnList.every((x) => x.feedback?.isSubmitted === 1) &&
    autumnList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第三季度"
  ) {
    autumnIsSubmitted = 1;
    let sumSelf = 0;
    let highValue = 0;
    let completedValue = 0;
    for (let i = 0; i < autumnList.length; i++) {
      sumSelf +=
        parseFloat(
          autumnList[i].feedback?.selfScore === ""
            ? "0.0"
            : autumnList[i].feedback?.selfScore!,
        ) * autumnList[i].keyResult.weight!;
      highValue +=
        parseFloat(
          autumnList[i].feedback?.highScore === ""
            ? "0.0"
            : autumnList[i].feedback?.highScore!,
        ) * autumnList[i].keyResult.weight!;
      completedValue +=
        autumnList[i].feedback?.progressValue! *
        autumnList[i].keyResult.weight!;
    }
    self = parseFloat((sumSelf / 100).toFixed(1));
    high = parseFloat((highValue / 100).toFixed(1));
    completed = parseFloat((completedValue / 100).toFixed(1));
    isSubmitted = true;
  }
  let winterIsSubmitted = 0;
  if (
    winterList.length !== 0 &&
    winterList.every((x) => x.feedback?.isSubmitted === 1) &&
    winterList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第四季度"
  ) {
    winterIsSubmitted = 1;
    let sumSelf = 0;
    let highValue = 0;
    let completedValue = 0;
    for (let i = 0; i < winterList.length; i++) {
      sumSelf +=
        parseFloat(
          winterList[i].feedback?.selfScore === ""
            ? "0.0"
            : winterList[i].feedback?.selfScore!,
        ) * winterList[i].keyResult.weight!;
      highValue +=
        parseFloat(
          winterList[i].feedback?.highScore === ""
            ? "0.0"
            : winterList[i].feedback?.highScore!,
        ) * winterList[i].keyResult.weight!;
      completedValue +=
        winterList[i].feedback?.progressValue! *
        winterList[i].keyResult.weight!;
    }
    self = parseFloat((sumSelf / 100).toFixed(1));
    high = parseFloat((highValue / 100).toFixed(1));
    completed = parseFloat((completedValue / 100).toFixed(1));
    isSubmitted = true;
  }
  //#endregion

  //#region Set second submit data
  //获取当前季度个人反馈和二次提交的值
  let currentIsSubmitted = 0;
  let currentIsSecondSubmitted = 0;
  ///////////////////////////////////////////
  if (
    springList.length !== 0 &&
    springList.every((x) => x.feedback?.isSubmitted === 1) &&
    springList.length === krNum &&
    selectPeriodBySeason.sysCodeValueName === "第一季度"
  ) {
    currentIsSubmitted = springIsSubmitted;
  }
  if (
    summerList.length !== 0 &&
    summerList.every((x) => x.feedback?.isSubmitted === 1) &&
    summerList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第二季度"
  ) {
    currentIsSubmitted = summerIsSubmitted;
  }
  if (
    autumnList.length !== 0 &&
    autumnList.every((x) => x.feedback?.isSubmitted === 1) &&
    autumnList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第三季度"
  ) {
    currentIsSubmitted = autumnIsSubmitted;
  }
  if (
    winterList.length !== 0 &&
    winterList.every((x) => x.feedback?.isSubmitted === 1) &&
    winterList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第四季度"
  ) {
    currentIsSubmitted = winterIsSubmitted;
  }
  ////////////////////////////////////////
  if (
    springList.length !== 0 &&
    springList.every((x) => x.feedback?.isSecondSubmitted === 1) &&
    springList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第一季度"
  ) {
    currentIsSecondSubmitted = 1;
  }

  let summerIsSecondSubmitted = 0;
  if (
    summerList.length !== 0 &&
    summerList.every((x) => x.feedback?.isSecondSubmitted === 1) &&
    summerList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第二季度"
  ) {
    currentIsSecondSubmitted = 1;
  }
  if (
    autumnList.length !== 0 &&
    autumnList.every((x) => x.feedback?.isSecondSubmitted === 1) &&
    autumnList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第三季度"
  ) {
    currentIsSecondSubmitted = 1;
  }

  if (
    winterList.length !== 0 &&
    winterList.every((x) => x.feedback?.isSecondSubmitted === 1) &&
    winterList.length === krNum &&
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第四季度"
  ) {
    currentIsSecondSubmitted = 1;
  }

  let currentIsThirdSubmitted = 0;
  if (
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第一季度"
  ) {
    currentIsThirdSubmitted = objective.isSpringSecondSubmitted;
  }

  if (
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第二季度"
  ) {
    currentIsThirdSubmitted = objective.isSummerSecondSubmitted;
  }

  if (
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第三季度"
  ) {
    currentIsThirdSubmitted = objective.isAutumnSecondSubmitted;
  }

  if (
    selectPeriodBySeason! &&
    selectPeriodBySeason.sysCodeValueName === "第四季度"
  ) {
    currentIsThirdSubmitted = objective.isWinterSecondSubmitted;
  }
  // #endregion

  
  return (
    <>
      <div className="card ml-4 mt-5">
        <div className="content">
          {objective.okrStatus === "create" && (
            <div className="absolute right-30 top-5">
              {objective.auditBackStatus !== "Completed" && (
                <>
                  <AlterOContent
                    btnCss="btn inline-block btn-xs btn-ghost text-green-500 rounded-none"
                    btnName="編輯"
                    objective={objective}
                    myRespCompany={myRespCompany}
                    periodByO={
                      systemPeriods.find((x) => x.id === objective.okrperiodId)!
                    }
                    me={me}
                  />
                </>
              )}
            </div>
          )}

          {objective.okrStatus === "track" && (
            <div className="absolute right-12 top-5">
              <div className="ml-2 flex ">
                {/* <button
                  className="btn btn-ghost btn-xs w-25 rounded-full text-start text-xs"
                  disabled
                >
                  <label id="asignto" className="mt-0.5 text-xs text-slate-400">
                    指派給:T12345
                  </label>
                </button> */}
                <div className="absolute right-22 flex">
                  {/* <progress
                    className="progress mt-2 h-1.5 w-30 align-middle"
                    value="0"
                    max="100"
                  ></progress>
                  <label id="percent" className="ml-3 mr-2">
                    {objective.weight}%
                  </label> */}
                  {/* <Assignment
                    deptInCharge={departmentInCharge!}
                    setDeptInCharge={setDepartmentInCharge}
                    btnCss={
                      "btn btn-outline h-5 btn-success btn-xs mr-5 w-18 border-dashed"
                    }
                  /> */}
                </div>
              </div>
            </div>
          )}

          <div className="block" onClick={toggleExpand}>
            <div className="flex">
      
              <button className="btn btn-success mt-0.5 btn-xs w-14 rounded-full text-slate-200">
                {objective.okrLevel}
              </button>
              <h3 className="ml-3 max-w-180 text-black text-lg font-bold">{objective.desc}</h3>
            </div>
            <div className="ml-17 mt-2 flex">
              <label className="text-sm  text-slate-500 ">
                {" "}
                負責人: {objective.belongToEmplN}
              </label>
              <label className="ml-5 text-sm  text-slate-500">
                {" "}
                OKR所屬公司: {objective.departmentName}
              </label>
              {objective.okrStatus === "track" && (
                <CreateTagsDesc
                  me={me}
                  currentIsSubmitted={currentIsSubmitted}
                  currentIsSecondSubmitted={currentIsSecondSubmitted}
                  currentIsThirdSubmitted={currentIsThirdSubmitted}
                  completed={completed}
                  self={self}
                  high={high}
                  period={
                    selectPeriodBySeason! && selectPeriodBySeason.sysCodeValueName
                  }
                  fbResponsiblePerson={objective.belongToEmplId!}
                  objective={objective}
                />
              )}
            </div>
          </div>

          {isExpanded && (
            <div
              className={`translate transform overflow-hidden ${
                !open && "hidden"
              }`}
            >
              <ul className="mb-0 mt-1 flex flex-col gap-2.5 pl-6">
                <li>
                  <div className="flex">
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
                          backgroundColor: "gray",
                          marginTop: "30px",
                          marginBottom: "0px",
                        }}
                      />
                    </div>
                    {/* {objective.okrStatus === "create" && (
                      <button className="btn btn-ghost btn-success btn-xs mt-2 text-sm text-green-500">
                        + 新建對齊
                      </button>
                    )}
                    {objective.okrStatus !== "create" && (
                      <button
                        className="btn btn-ghost btn-success btn-xs mt-2 text-sm text-green-500"
                        disabled
                      >
                        + 新建對齊
                      </button>
                    )} */}
                    <div className="mt-2">
                      <ODetail
                        btnCss="btn inline-block btn-xs btn-ghost text-green-500 rounded-none"
                        btnName="目標(O)詳情"
                        objective={objective}
                        sysstemPeriods={systemPeriods}
                      ></ODetail>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex">
                    {/* <label id='auditer' className='text-sm'>
        OKR對齊 : {okrCheckPerson}
        </label> */}
                    {/* <label className="ml-5 text-sm">
                      OKR級別 : {objective.okrLevel}
                    </label>
                    <label className="ml-5 text-sm">OKR所屬部門 :</label> */}
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* <!-- Dropdown Menu End --> */}
        </div>
      </div>
      <div
        className="bottom-line ml-5"
        style={{ borderBottom: "1px solid gray", width: "97%", opacity: 0.3 }}
      />
    </>
  );
}
