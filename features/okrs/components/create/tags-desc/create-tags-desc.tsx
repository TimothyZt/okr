"use client";
import React from "react";
import { Me } from "../../../../users/dtos/users-dto";
import FeedbackTags from "../../../../baseInfo/components/tags/feedback-tags";
import { Objective } from "../../../dtos/okr-dtos";

interface Props {
  me: Me;
  currentIsSubmitted: number;
  currentIsSecondSubmitted: number;
  currentIsThirdSubmitted: number;
  completed: number;
  self: number;
  high: number;
  fbResponsiblePerson: string;
  period: string;
  objective: Objective;
}

export default function CreateTagsDesc({
  me,
  currentIsSubmitted,
  currentIsSecondSubmitted,
  currentIsThirdSubmitted,
  completed,
  self,
  high,
  fbResponsiblePerson,
  period,
  objective,
}: Props) {
  return (
    <>    
      {currentIsSubmitted === 1 && currentIsSecondSubmitted === 1 && (
        <div className="flex ">
          <label className="ml-3 text-xs text-green-600">
            {"完成度: " + completed + " %"}
          </label>
        </div>
      )}
      {currentIsSubmitted === 1 && currentIsSecondSubmitted === 1 && (
        <div className="flex ">
          <label className="ml-3 text-xs text-green-600">
            {"自评: " + self}
          </label>
        </div>
      )}
      {currentIsSubmitted === 1 && currentIsSecondSubmitted === 1 && (
        <div className="flex ">
          <label className="ml-3 text-xs text-green-600">
            {"上评: " + high}
          </label>
        </div>
      )}

      {currentIsSubmitted === 1 &&
        currentIsSecondSubmitted === 0 &&
        fbResponsiblePerson === me.id && (
          <div className="flex ">
            <label className="ml-3 text-xs text-green-600">
              {"完成度: " + completed + " %"}
            </label>
          </div>
        )}
      {currentIsSubmitted === 1 &&
        currentIsSecondSubmitted === 0 &&
        fbResponsiblePerson === me.id && (
          <div className="flex ">
            <label className="ml-3 text-xs text-green-600">
              {"自评: " + self}
            </label>
          </div>
        )}
      {currentIsSubmitted === 1 &&
        currentIsSecondSubmitted === 0 &&
        fbResponsiblePerson === me.id && (
          <div className="flex ">
            <label className="ml-3 text-xs text-green-600">
              {"上评: " + high}
            </label>
          </div>
        )}

      {currentIsSubmitted === 1 &&
        (fbResponsiblePerson === me.id ||
          me.roles.find(
            (x) => x.roleName === "HeadCompanyPreliminaryReviewer",
          ) ||
          me.departmentDto.departments
            .find((x) => x.id === objective.departmentId)
            ?.roles?.find(
              (x) => x === "11c28011-db0c-44c1-96cb-160c92172a34" || x === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
            )) && (
          <div className="ml-3">
            <FeedbackTags season={period} isCompleted={1} />
          </div>
        )}
      {currentIsSubmitted === 0 &&
        (fbResponsiblePerson === me.id ||
          me.roles.find(
            (x) => x.roleName === "HeadCompanyPreliminaryReviewer",
          ) ||
          me.departmentDto.departments
            .find((x) => x.id === objective.departmentId)
            ?.roles?.find(
              (x) => x === "11c28011-db0c-44c1-96cb-160c92172a34" || x === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
            )) && (
          <div className="ml-3">
            <FeedbackTags season={period} isCompleted={0} />
          </div>
        )}
    </>
  );
}
