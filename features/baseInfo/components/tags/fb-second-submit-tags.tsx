"use client";
import React from "react";

interface Props {
  season: string;
  isSecondSubmitted: number;
}
export default function FbSecondSubmittedTags({ season, isSecondSubmitted }: Props) {
  return (
    <>
      {season === "第一季度" && isSecondSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          初審未确认反馈
        </div>
      )}
      {season === "第一季度" && isSecondSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2 border-green-800 bg-green-600  text-center text-xs text-white">
          初審确认反馈
        </div>
      )}

      {season === "第二季度" && isSecondSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
           初審未确认反馈
        </div>
      )}

      {season === "第二季度" && isSecondSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          初審确认反馈
        </div>
      )}

      {season === "第三季度" && isSecondSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          初審未确认反馈
        </div>
      )}

      {season === "第三季度"  && isSecondSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          初審确认反馈
        </div>
      )}

      {season === "第四季度" && isSecondSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          初審未确认反馈
        </div>
      )}
      
      {season === "第四季度"  && isSecondSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-24 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          初審确认反馈
        </div>
      )}
    </>
  );
}
