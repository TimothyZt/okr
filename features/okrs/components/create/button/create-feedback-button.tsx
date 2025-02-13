"use client";
import React, { useState } from "react";
import { Objective } from "../../../dtos/okr-dtos";
import { Me } from "../../../../users/dtos/users-dto";
import TrackFeedbackLink from "./button-content/feedback/feedback-button";
import { PeriodDto } from "../../../../system/dtos/system-dtos";

interface Props {
  objective: Objective;
  isAllPage: boolean;
  currentPeriod: PeriodDto;
  me: Me;
  isSaved: boolean;
  selectSeasonName:string;
}

export default function CreateFeedbackButton({
  objective,
  isAllPage,
  currentPeriod,
  me,
  isSaved,selectSeasonName
}: Props) {
  console.log(selectSeasonName)
  return (
    <>
      {objective.okrStatus! === "track" &&
        isAllPage &&
        (me.roles.find(
          (x) => x.roleName === "HeadCompanyPreliminaryReviewer",
        ) ||
          (me.roles.find((x) => x.roleName === "Secretary") &&
            me.departmentDto.departments
              .find((x) => x.id == objective.departmentId)
              ?.roles?.find(
                (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
              ))) &&
        objective.isSpringSecondSubmitted === 0 &&
        selectSeasonName === "第一季度" && (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}

      {objective.okrStatus! === "track" &&
        isAllPage &&
        objective.isSpringSecondSubmitted === 1 &&
        selectSeasonName === "第一季度" && (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}

      {objective.okrStatus! === "track" &&
        isAllPage &&
        (me.roles.find(
          (x) => x.roleName === "HeadCompanyPreliminaryReviewer",
        ) ||
          me.departmentDto.departments
            .find((x) => x.id === objective.departmentId)
            ?.roles?.find(
              (x) => x === "11c28011-db0c-44c1-96cb-160c92172a34",
            ) ||
          (me.roles.find((x) => x.roleName === "Secretary") &&
            me.departmentDto.departments
              .find((x) => x.id == objective.departmentId)
              ?.roles?.find(
                (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
              ))) &&
        objective.isSummerSecondSubmitted === 0 &&
        selectSeasonName === "第二季度"&& (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}

      {objective.okrStatus! === "track" &&
        isAllPage &&
        objective.isSummerSecondSubmitted === 1 &&
        selectSeasonName === "第二季度" && (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}

      {objective.okrStatus! === "track" &&
        isAllPage &&
        (me.roles.find(
          (x) => x.roleName === "HeadCompanyPreliminaryReviewer",
        ) ||
          me.departmentDto.departments
            .find((x) => x.id === objective.departmentId)
            ?.roles?.find(
              (x) => x === "11c28011-db0c-44c1-96cb-160c92172a34",
            ) ||
          (me.roles.find((x) => x.roleName === "Secretary") &&
            me.departmentDto.departments
              .find((x) => x.id == objective.departmentId)
              ?.roles?.find(
                (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
              ))) &&
        objective.isAutumnSecondSubmitted === 0 &&
        selectSeasonName === "第三季度" && (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}

      {objective.okrStatus! === "track" &&
        isAllPage &&
        objective.isAutumnSecondSubmitted === 1 &&
        selectSeasonName === "第三季度" && (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}

      {objective.okrStatus! === "track" &&
        isAllPage &&
        (me.roles.find(
          (x) => x.roleName === "HeadCompanyPreliminaryReviewer",
        ) ||
          me.departmentDto.departments
            .find((x) => x.id === objective.departmentId)
            ?.roles?.find(
              (x) => x === "11c28011-db0c-44c1-96cb-160c92172a34",
            ) ||
          (me.roles.find((x) => x.roleName === "Secretary") &&
            me.departmentDto.departments
              .find((x) => x.id == objective.departmentId)
              ?.roles?.find(
                (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
              ))) &&
        objective.isWinterSecondSubmitted === 0 &&
        selectSeasonName === "第四季度" && (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}

      {objective.okrStatus! === "track" &&
        isAllPage &&
        objective.isWinterSecondSubmitted === 1 &&
        selectSeasonName === "第四季度" && (
          <TrackFeedbackLink
            objectiveId={objective.id}
            isSaved={isSaved}
            isAllPage={isAllPage}
          ></TrackFeedbackLink>
        )}
    </>
  );
}
