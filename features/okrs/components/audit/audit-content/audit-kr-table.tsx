'use client'
import React, { useState } from "react";
import { PeriodDto } from "../../../../system/dtos/system-dtos";

interface Props {
  oStatus: string;
  auditStatus: string;
  toggleExpand2: () => void;
  isExpanded:boolean;
  currentPeriodByOInYear:PeriodDto;
}

export default function AuditKRTable({
  children,
  oStatus,
  auditStatus,
  toggleExpand2,
  isExpanded,
  currentPeriodByOInYear
}: { children: React.ReactNode } & Props) {
  const [isExpand, setIsExpand] = useState(isExpanded);
  const toggleTemp = () => {
    setIsExpand(!isExpand);
  };
  const handleToggleClick = () =>{
    toggleExpand2();
    toggleTemp();
  }
  return (
    <div className="justify-center flex overflow-auto">
         <div className="mt-2.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className= { isExpand === true ? "" : "rotate-180"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.0002 12.825C8.83145 12.825 8.69082 12.7688 8.5502 12.6563L2.08145 6.30002C1.82832 6.0469 1.82832 5.65315 2.08145 5.40002C2.33457 5.1469 2.72832 5.1469 2.98145 5.40002L9.0002 11.2781L15.0189 5.34377C15.2721 5.09065 15.6658 5.09065 15.9189 5.34377C16.1721 5.5969 16.1721 5.99065 15.9189 6.24377L9.45019 12.6C9.30957 12.7406 9.16895 12.825 9.0002 12.825Z"
              fill="#64748B"
            />
          </svg>
        </div>
      <table className="table  w-full">
        {/* head */}

        {oStatus === "audit" && !(auditStatus === "remake") && (
          <thead>
            <tr className="border-0" onClick={handleToggleClick}>
              <th className="w-8/12 text-left">{currentPeriodByOInYear.okrYear}年 年度KR報告</th>
              <th className="W-1/12 text-center">權重</th>
              <th className="W-1/12 text-center">審核與詳情</th>
            </tr>
          </thead>
        )}
        {oStatus === "audit" && auditStatus === "remake" && (
          <thead>
            <tr className="border-0" onClick={handleToggleClick}>
              <th className="w-8/12 text-left">{currentPeriodByOInYear.okrYear}年 年度KR報告</th>
              <th className="W-1/12 text-center">權重</th>
              <th className="W-1/12 text-center">審核與詳情</th>
            </tr>
          </thead>
        )}

        <tbody className="border-none">{children}</tbody>
      </table>
    </div>
  );
}
