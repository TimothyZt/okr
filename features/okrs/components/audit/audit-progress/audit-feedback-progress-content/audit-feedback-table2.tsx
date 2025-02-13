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
import { FeedbackResponse } from "../../../../dtos/feedback-dtos";

interface Props {
  isExpanded: boolean;
  feedbackResponses: FeedbackResponse[];
}

export default function AuditFeedbackTable2({
  isExpanded,
  feedbackResponses,
}: Props) {
  const [isExpand, setIsExpand] = useState(isExpanded);
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="w-100 border-2 border-slate-300 bg-white text-sm shadow-14">
            關鍵結果(KR)描述
          </TableColumn>
          <TableColumn className="w-36 border-2 border-slate-300 bg-white text-sm shadow-14">
            反馈审核进度
            </TableColumn>
    
          {/* <TableColumn className="w-16 border-2 border-slate-300 bg-white text-sm shadow-14 ">
            操作
          </TableColumn> */}
        </TableHeader>
        <TableBody>
          {feedbackResponses.map((fb, key) => (
            <TableRow key={key}>
              <TableCell className="border-2 border-slate-300 bg-white text-sm">
              {fb.keyResult.description}
              </TableCell>
           
              <TableCell className="border-2 border-slate-300 bg-white text-sm">
                
                {fb.status}
              </TableCell>
   
              {/* <TableCell className="border-2 border-slate-300 bg-white text-sm">
                {fb?.status}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
