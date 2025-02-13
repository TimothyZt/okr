"use client";
import React from "react";

interface Props {
  auditStatus: string;
  isSubmitter: boolean;
  submmitOn: string;
}

export default function AuditContent({
  children,
  auditStatus,
  isSubmitter,
  submmitOn,
}: { children: React.ReactNode } & Props) {
  return (
    <main>
      <div className="w-160 card mt-0 h-full overflow-auto bg-base-100 shadow-xl">
        <div className="absolute right-8 top-4 flex h-16">
        <label className="mr-5 text-rose-500">提交时间：{submmitOn}</label>
        {auditStatus === "Auditing" && !isSubmitter && (
          <div className="text-yellow-500">待審核</div>
        )}
        {auditStatus === "Auditing" && isSubmitter && (
          <div className="text-blue-600">審核中</div>
        )}
        {auditStatus === "Refused" && (
          <div className=" text-rose-600">駁回</div>
        )}
        {auditStatus === "Completed" && (
          <div className=" text-green-600">通過</div>
        )}
      
        {auditStatus === "Undo" && (
          <div className="  text-slate-600">撤銷</div>
        )}
        <div>
         
        </div>
        </div>
        <div className="card-body overflow-auto">{children}</div>
      </div>
    </main>
  );
}
