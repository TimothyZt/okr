"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Audit_OResponse } from "../../../../dtos/audit-dtos";
import { FeedbackAuditResponse } from "../../../../dtos/feedback-dtos";
import CreateFeedbackButton from "../../../create/button/create-feedback-button";
import TrackFeedbackLink from "../../../create/button/button-content/feedback/feedback-button";
import { Button } from "@nextui-org/button";
import { Me } from "../../../../../users/dtos/users-dto";

interface Props {
  isExpanded: boolean;
  type: string;
  feedbackResponses: FeedbackAuditResponse[];
  me: Me;
}

export default function AuditFeedbackTable({
  isExpanded,
  type,
  me,
  feedbackResponses,
}: Props) {
  const [isExpand, setIsExpand] = useState(isExpanded);
  const handleClick = (krId: string) => {
    window.open("/feedback2/" + krId, '_blank');
  };
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          
          <TableColumn className="w-40 border-2 border-slate-300 bg-white text-sm shadow-14">
            目標(O)描述 
          </TableColumn>
          <TableColumn className="w-36 border-2 border-slate-300 bg-white text-sm shadow-14">
            公司名稱
          </TableColumn>
          <TableColumn className="w-18 border-2 border-slate-300 bg-white text-sm shadow-14">
            負責人
          </TableColumn>
          <TableColumn className="w-100 border-2 border-slate-300 bg-white text-sm shadow-14">
            關鍵結果(KR)描述
          </TableColumn>

          <TableColumn className="w-16 border-2 border-slate-300 bg-white text-sm shadow-14 ">
            操作
          </TableColumn>
        </TableHeader>
        <TableBody>
          {feedbackResponses.map((fb, key) => (
            <TableRow key={key}>
              <TableCell className="border-2 border-slate-300 bg-white text-sm">
                {fb?.objectiveDescription}
              </TableCell>
              <TableCell className="border-2 border-slate-300 bg-white text-sm">
                {fb?.departmentName}
              </TableCell>
              <TableCell className="border-2 border-slate-300 bg-white text-sm">
                {fb?.objectivePersonInCharge}
              </TableCell>
              <TableCell className="border-2 border-slate-300 bg-white text-sm">
                {fb?.keyResultDescription}
              </TableCell>

              <TableCell className="border-2 border-slate-300 bg-white text-sm">
                {type === "HeadCompanyPreliminaryReviewer" &&
                  me.roles.find((x) => x.roleName === type) && (
                    <Button
                      onClick={() => handleClick(fb.keyResultId)}
                      className="btn btn-ghost   btn-sm relative  top-0 z-1 flex w-30 rounded-md   align-middle text-blue-500"
                    >
                      初審反饋確認
                    </Button>
                  )}
                {type === "SubsidiaryCompanyResponsiblePerson" &&
                  me.departmentDto.departments.find((x) =>
                    x.roles?.find(
                      (x) =>
                        x ===
                        "11C28011-DB0C-44C1-96CB-160C92172A34".toLowerCase(),
                    ),
                  ) && (
                    <Button
                      onClick={() => handleClick(fb.keyResultId)}
                      className="btn-sm relative  top-0 z-1 flex w-40 rounded-md  align-middle  text-blue-500"
                    >
                      負責人反饋確認
                    </Button>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
