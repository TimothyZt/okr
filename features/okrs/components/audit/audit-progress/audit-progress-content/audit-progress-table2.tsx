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
import { Objective } from "../../../../dtos/okr-dtos";

interface Props {
  isExpanded: boolean;
  objetives: Objective[];
}

export default function AuditProgressTable2({ isExpanded, objetives }: Props) {
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
          <TableColumn className="w-5/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14">
            目標(O)描述
          </TableColumn>
          <TableColumn className="w-3/12  border-2 text-center border-slate-300 bg-white text-sm shadow-14">
            公司
          </TableColumn>
          <TableColumn className=" w-1/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14">
            負責人
          </TableColumn>

          <TableColumn className=" w-2/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14">
            進入審核的時間
          </TableColumn>
          <TableColumn className="w-1/12 border-2 text-center border-slate-300 bg-white text-sm shadow-14 ">
            操作
          </TableColumn>
        </TableHeader>
        <TableBody>
          {objetives.map((o, key) => (
            <TableRow key={key}>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                {o?.desc}
              </TableCell>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                {o?.departmentName}
              </TableCell>
              <TableCell className="border-2 border-slate-300 text-center bg-white text-sm">
                {o.belongToEmplN}
              </TableCell>
              <TableCell className="border-2 text-blue-500 border-slate-300 text-center bg-white text-sm">
                {"未提交至审核"}
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
