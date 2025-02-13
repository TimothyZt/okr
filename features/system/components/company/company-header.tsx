"use client";

import { useState } from "react";
import SystemUploadModal from "../upload";
import NewUserCompanyAssignment from "./create/company-new";

export default function SystemUserCompanyAssignmentHeader() {
  const [isExpand, setIsExpand] = useState(false);
  function uploadExpand() {
    setIsExpand(!isExpand);
  }
  return (
    <div>
      <div className="flex">
        {!isExpand && (
          <button
            onClick={uploadExpand}
            className="btn btn-success btn-sm absolute right-34 block rounded-md bg-teal-600 text-white"
          >
            显示上传面板
          </button>
        )}
        {isExpand && (
          <button
            onClick={uploadExpand}
            className="text-blue btn btn-success btn-sm absolute right-34 block rounded-md bg-slate-400 text-black  "
          >
            隐藏上传面板
          </button>
        )}
        {/* <NewUserCompanyAssignment></NewUserCompanyAssignment> */}
      </div>
      {isExpand && (
        <SystemUploadModal
          desc={"用戶負責公司名單導入"}
          type={"company"}
        ></SystemUploadModal>
      )}
    </div>
  );
}
