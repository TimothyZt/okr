"use client";
import React from "react";

interface Props {
  season: string;
  isThirdSubmitted: number;
}
export default function FbThirdSubmittedTags({ season, isThirdSubmitted }: Props) {
  return (
    <>
      {season === "第一季度" && isThirdSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          負責人未确认反馈
        </div>
      )}
      {season === "第一季度" && isThirdSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2 border-green-800 bg-green-600  text-center text-xs text-white">
          負責人确认反馈
        </div>
      )}

      {season === "第二季度" && isThirdSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
           負責人未确认反馈
        </div>
      )}

      {season === "第二季度" && isThirdSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          負責人确认反馈
        </div>
      )}

      {season === "第三季度" && isThirdSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          負責人未确认反馈
        </div>
      )}

      {season === "第三季度"  && isThirdSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          負責人确认反馈
        </div>
      )}

      {season === "第四季度" && isThirdSubmitted === 0 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          負責人未确认反馈
        </div>
      )}
      
      {season === "第四季度"  && isThirdSubmitted === 1 && (
        <div className="h-5  -translate-y-1 w-32 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          負責人确认反馈
        </div>
      )}
    </>
  );
}
