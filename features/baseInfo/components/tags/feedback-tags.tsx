"use client";
import React from "react";

interface Props {
  season: string;
  isCompleted: number;
}
export default function FeedbackTags({ season, isCompleted }: Props) {
  return (
    <>
      {season === "第一季度" && isCompleted === 0 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          有未提交的反饋
        </div>
      )}
      {season === "第一季度" && isCompleted === 1 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2 border-green-800 bg-green-600  text-center text-xs text-white">
          所有反饋已提交
        </div>
      )}

      {season === "第二季度" && isCompleted === 0 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          有未提交的反饋
        </div>
      )}

      {season === "第二季度" && isCompleted === 1 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          所有反饋已提交
        </div>
      )}

      {season === "第三季度" && isCompleted === 0 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          有未提交的反饋
        </div>
      )}

      {season === "第三季度"  && isCompleted === 1 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          所有反饋已提交
        </div>
      )}

      {season === "第四季度" && isCompleted === 0 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2 border-rose-800 bg-rose-500 text-center text-xs text-white">
          有未提交的反饋
        </div>
      )}
      
      {season === "第四季度"  && isCompleted === 1 && (
        <div className="h-5  -translate-y-1 w-28 rounded-lg border-2  border-green-800 bg-green-600  text-center text-xs text-white">
          所有反饋已提交
        </div>
      )}
    </>
  );
}
