"use client";
import React, { useState } from "react";
import CreateKR from "./new/new-kr";
import { PeriodDto } from "../../../system/dtos/system-dtos";
import { KeyResult, UpdateKR } from "../../dtos/okr-dtos";
import ensurePeriodIsHavePermission from "../../../system/extension/system-extension";
import { putKeyResultAction } from "../../server-actions/actions";
import { Bounce, toast } from "react-toastify";

interface Props {
  oStatus: string;
  oId: string;
  krNum: number;
  isExpanded: boolean;
  toggleExpand: () => void;
  okrYearByO: string;
  systemPeriods: PeriodDto[];
  krs: KeyResult[];
}

export default function KRTable({
  oId,
  children,
  oStatus,
  krNum,
  isExpanded,
  toggleExpand,
  okrYearByO,
  systemPeriods,
  krs,
}: { children: React.ReactNode } & Props) {
  const [isExpand, setIsExpand] = useState(isExpanded);
  const toggleTemp = () => {
    setIsExpand(!isExpand);
  };
  const handleToggleClick = () => {
    toggleExpand();
    toggleTemp();
  };
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 阻止事件冒泡
    const isConfirmed = confirm("是否確定平均计算所有KR的权重?");

    if (isConfirmed) {
      for (let i = 0; i < krNum; i++) {
        if (ensurePeriodIsHavePermission(okrYearByO,systemPeriods)) {
          var w = parseFloat((1 / krNum).toFixed(2)) * 100;
          if (i === krNum - 1) {
            w = 100 - (krNum - 1) * w;
          }
          const update: UpdateKR = {
            id: krs[i].id,
            description: krs[i].description,
            krType: krs[i].krTypeId,
            department:
              krs[i].belongToDepartment2Id ===
              "00000000-0000-0000-0000-000000000000"
                ? [krs[i].belongToDepartment1Id!]
                : [
                    krs[i].belongToDepartment1Id!,
                    krs[i].belongToDepartment2Id!,
                  ],
            weight: w,
          };
          await putKeyResultAction(oId, krs[i].id, update);
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
    }
  };
  return (
    <div className="w-full justify-center overflow-auto">
      <div className="flex">
        <div className="mt-2.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className={isExpand === true ? "" : "rotate-180"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.0002 12.825C8.83145 12.825 8.69082 12.7688 8.5502 12.6563L2.08145 6.30002C1.82832 6.0469 1.82832 5.65315 2.08145 5.40002C2.33457 5.1469 2.72832 5.1469 2.98145 5.40002L9.0002 11.2781L15.0189 5.34377C15.2721 5.09065 15.6658 5.09065 15.9189 5.34377C16.1721 5.5969 16.1721 5.99065 15.9189 6.24377L9.45019 12.6C9.30957 12.7406 9.16895 12.825 9.0002 12.825Z"
              fill="#64748B"
            />
          </svg>
        </div>
        <table className="table w-full ">
          {/* head */}

          {oStatus === "create" && (
            <thead>
              <tr className="border-0" onClick={handleToggleClick}>
                <th className="w-8/12 text-left">{okrYearByO}年 年度KR報告</th>
                <th className="">
                  <div className="flex align-middle justify-center">
                  <label className="">權重</label> 
                  <button className="ml-2" onClick={handleClick}>
                    <svg
                      width="18px"
                      height="18px"
                      viewBox="0 -4 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="invisible_box" data-name="invisible box">
                          <rect width="48" height="48" fill="none" />
                        </g>
                        <g id="Q3_icons" data-name="Q3 icons">
                          <g>
                            <path d="M41,4H7A2.9,2.9,0,0,0,4,7V41a2.9,2.9,0,0,0,3,3H41a2.9,2.9,0,0,0,3-3V7A2.9,2.9,0,0,0,41,4ZM40,40H8V8H40Z" />
                            <path d="M14,16H34a2,2,0,0,0,0-4H14a2,2,0,0,0,0,4Z" />
                            <path d="M27.3,19.8v-.2a4,4,0,0,0-6.4,0L13.3,33a2,2,0,0,0,3.4,2l1.7-3H29.6l1.7,3a2,2,0,1,0,3.4-2ZM20.7,28,24,22.1,27.3,28Z" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                  </div>
          
                </th>
                <th className="w-1/12 text-center">操作</th>
              </tr>
            </thead>
          )}
          {oStatus === "audit" && (
            <thead>
              <tr className="border-0" onClick={handleToggleClick}>
                <th className="w-8/12 text-left">{okrYearByO}年度KR報告</th>
                <th className="W-1/12 text-center">權重</th>
                <th className="W-1/12 text-center">创建審核</th>
                <th className="W-1/12 text-center">操作</th>
              </tr>
            </thead>
          )}
          {oStatus === "track" && (
            <thead>
              <tr className="border-0" onClick={handleToggleClick}>
                <th className="w-7/12 text-left">{okrYearByO} 年度KR報告</th>
                <th className="W-1/12 text-center">完成度</th>
                <th className="W-1/12 text-center">權重</th>
                <th className="W-2/12 text-center">操作</th>
              </tr>
            </thead>
          )}

          {oStatus === "end" && (
            <thead>
              <tr className="border-0" onClick={handleToggleClick}>
                <th className="w-8/12 text-left">{okrYearByO}年度KR報告</th>
                <th className="W-1/12 text-center">完成度</th>
                <th className="W-1/12 text-center">權重</th>
                <th className="W-1/12 text-center">評分</th>
                <th className="W-1/12 text-center">操作</th>
              </tr>
            </thead>
          )}

          <tbody className="border-none">{children}</tbody>
        </table>
      </div>

      {oStatus === "create" && (
        <CreateKR
          oId={oId}
          krNum={krNum}
          systemPeriods={systemPeriods} okrYearByO={okrYearByO}        ></CreateKR>
      )}
    </div>
  );
}
