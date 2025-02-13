"use client";
import React, { useState } from "react";
import AuditProgressTableItem from "./audit-progress-table-item";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Audit_OResponse } from "../../../../dtos/audit-dtos";

interface Props {
  isExpanded: boolean;
  aobjetives: Audit_OResponse[];
}

export default function AuditProgressTable({
  isExpanded,
  aobjetives,
}: Props) {
  const [isExpand, setIsExpand] = useState(isExpanded);
  //   const toggleTemp = () => {
  //     setIsExpand(!isExpand);
  //   };
  //   const handleToggleClick = () => {
  //     toggleExpand();
  //     toggleTemp();
  //   };

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="border-2 w-5/12 text-center border-slate-300 bg-white text-sm shadow-14">
            目標(O)描述
          </TableColumn>
          <TableColumn className="w-3/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14">
            公司
          </TableColumn>
          <TableColumn className="w-1/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14">
            負責人
          </TableColumn>

          <TableColumn className="w-2/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14">
            進入審核的時間
          </TableColumn>
          <TableColumn className="w-1/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14 ">
            操作
          </TableColumn>
        </TableHeader>
        <TableBody>
          {aobjetives.map((ao, key) => (
            <TableRow key={key}>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                {ao?.description}
              </TableCell>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                {ao?.companyName}
              </TableCell>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                {ao?.belongToEmplN}
              </TableCell>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                {ao?.submitterOn}
              </TableCell>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                <button>催交</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
