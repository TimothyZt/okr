import { Card, CardBody } from "@nextui-org/card";
import React, { useState } from "react";
import PanelOKRCardBtn from "./PanelOKRCardBtn";
import { ReportRecordResponse } from "../../../features/okrs/dtos/okr-dtos";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import { getReportsAction } from "../../../features/okrs/server-actions/actions";
interface Props {
  type: string;
  number: number;
  oNum: number;
}

export default function PanelOKRCard({ type, number, oNum }: Props) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    if (!showModal) setShowModal(true);
    else {
      setShowModal(false);
    }
  };
  const [records, setRecords] = useState<ReportRecordResponse[]>([]);
  const handleDataClick = async () => {
    let typeRequest = "";
    if (type === "create") typeRequest = "OKRsInCreateStage";
    else if (type === "audit") typeRequest = "OKRsInAuditStage";
    else if (type === "track") typeRequest = "OKRsInTrackStage";
    else if (type === "end") typeRequest = "OKRsInEndStage";
    setRecords(unpackActionResponse(await getReportsAction(typeRequest)));
    handleClose();
  };
  return (
    <Card className="ml-2 mt-5 h-35 w-1/4 bg-white shadow-14">
      <CardBody className="overflow-visible p-0">
        <div className="relative ml-6 mt-6 flex">
          {type === "create" && (
            <>
              <button className="mb-4" onClick={handleDataClick}>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="-10.08 -10.08 44.16 44.16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(90)"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0">
                    <rect
                      x="-10.08"
                      y="-10.08"
                      width="44.16"
                      height="44.16"
                      rx="3.5328"
                      fill="#bcf0d3"
                      strokeWidth="0"
                    />
                  </g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M17.1109 13.5754C17.5014 13.9659 18.1346 13.9659 18.5251 13.5754L21 11.1005C23.1479 8.95265 23.1479 5.47025 21 3.32236C18.8521 1.17448 15.3697 1.17448 13.2218 3.32236L10.7469 5.79724C10.3564 6.18776 10.3564 6.82093 10.7469 7.21145C11.1375 7.60197 11.7706 7.60197 12.1612 7.21145L14.636 4.73658C16.0029 3.36974 18.2189 3.36974 19.5858 4.73658C20.9526 6.10341 20.9526 8.31949 19.5858 9.68632L17.1109 12.1612C16.7204 12.5517 16.7204 13.1849 17.1109 13.5754Z"
                      fill="#06a252"
                    />{" "}
                    <path
                      d="M5.79719 10.747C6.18771 10.3565 6.82088 10.3565 7.2114 10.747C7.60193 11.1375 7.60193 11.7707 7.2114 12.1612L4.73653 14.6361C3.36969 16.0029 3.36969 18.219 4.73653 19.5858C6.10336 20.9527 8.31944 20.9527 9.68628 19.5858L12.1612 17.1109C12.5517 16.7204 13.1848 16.7204 13.5754 17.1109C13.9659 17.5015 13.9659 18.1346 13.5754 18.5252L11.1005 21C8.95261 23.1479 5.4702 23.1479 3.32232 21C1.17443 18.8521 1.17443 15.3697 3.32232 13.2219L5.79719 10.747Z"
                      fill="#06a252"
                    />{" "}
                    <path
                      d="M8.97917 15.3432C8.58865 14.9527 8.58865 14.3195 8.97917 13.929L13.9289 8.97922C14.3194 8.58869 14.9526 8.58869 15.3431 8.97922C15.7337 9.36974 15.7337 10.0029 15.3431 10.3934L10.3934 15.3432C10.0029 15.7337 9.3697 15.7337 8.97917 15.3432Z"
                      fill="#06a252"
                    />{" "}
                  </g>
                </svg>
              </button>
              <PanelOKRCardBtn
                isOpen={showModal}
                onOpenChange={handleClose}
                title={"處於制定階段的人數"}
                records={records}
              ></PanelOKRCardBtn>
            </>
          )}

          {type === "audit" && (
            <>
              <button className="mb-4" onClick={handleDataClick}>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="-4.8 -4.8 57.60 57.60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0">
                    <rect
                      x="-4.8"
                      y="-4.8"
                      width="57.60"
                      height="57.60"
                      rx="0"
                      fill="#fdfbc9"
                      strokeWidth="0"
                    />
                  </g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <rect
                      width="48"
                      height="48"
                      fill="white"
                      fill-opacity="0.01"
                    />{" "}
                    <path
                      d="M7.99976 36L8.00437 28.0426C8.00527 27.4906 8.45289 27.0432 9.00495 27.0426C12.3389 27.0426 15.6729 27.0426 19.0069 27.0426C19.9284 27.0426 19.9235 26.2252 19.9235 24.2792C19.9235 22.3332 15.0219 20.6941 15.0219 13.8528C15.0219 7.01151 20.0997 5 24.3198 5C28.5399 5 33.1364 7.01151 33.1364 13.8528C33.1364 20.6941 28.2605 21.7818 28.2605 24.2792C28.2605 26.7765 28.2605 27.0426 29.0411 27.0426C32.3607 27.0426 35.6804 27.0426 39.0001 27.0426C39.5523 27.0426 40.0001 27.4904 40.0001 28.0426V36H7.99976Z"
                      fill="#f5ee2e"
                      stroke="#f5ee2e"
                      stroke-width="4"
                      stroke-linejoin="round"
                    />{" "}
                    <path
                      d="M8 42H40"
                      stroke="#f5ee2e"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />{" "}
                  </g>
                </svg>
              </button>
              <PanelOKRCardBtn
                records={records}
                isOpen={showModal}
                onOpenChange={handleClose}
                title={"處於審核階段的人數"}
              ></PanelOKRCardBtn>
            </>
          )}

          {type === "track" && (
            <>
              <button className="mb-4" onClick={handleDataClick}>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="-1.44 -1.44 26.88 26.88"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0">
                    <rect
                      x="-1.44"
                      y="-1.44"
                      width="26.88"
                      height="26.88"
                      rx="0"
                      fill="#b9e9f9"
                      strokeWidth="0"
                    />
                  </g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      fill="#0844f7"
                    />{" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 3C12.5523 3 13 3.44772 13 4V5.07089C16.0657 5.5094 18.4906 7.93431 18.9291 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H18.9291C18.4906 16.0657 16.0657 18.4906 13 18.9291V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V18.9291C7.93431 18.4906 5.5094 16.0657 5.07089 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H5.07089C5.5094 7.93431 7.93431 5.5094 11 5.07089V4C11 3.44772 11.4477 3 12 3ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z"
                      fill="#0844f7"
                    />{" "}
                  </g>
                </svg>
              </button>
              <PanelOKRCardBtn
                records={records}
                isOpen={showModal}
                onOpenChange={handleClose}
                title={"處於追蹤階段的人數"}
              ></PanelOKRCardBtn>
            </>
          )}

          {type === "end" && (
            <>
              <button className="mb-4" onClick={handleDataClick}>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 20.00 20.00"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0">
                    <rect
                      x="0"
                      y="0"
                      width="20.00"
                      height="20.00"
                      rx="0"
                      fill="#bdffbe"
                      strokeWidth="0"
                    />
                  </g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M15.3742 5.98559L10.3742 14.9856C9.72664 16.1511 7.97832 15.1798 8.62585 14.0143L13.6258 5.01431C14.2734 3.84876 16.0217 4.82005 15.3742 5.98559Z"
                      fill="#22cc00"
                    />{" "}
                    <path
                      d="M5.1247 9.71907L10.1247 13.7191C11.1659 14.552 9.91646 16.1137 8.87531 15.2808L3.87531 11.2808C2.83415 10.4479 4.08354 8.88615 5.1247 9.71907Z"
                      fill="#22cc00"
                    />{" "}
                  </g>
                </svg>
              </button>
              <PanelOKRCardBtn
                records={records}
                isOpen={showModal}
                onOpenChange={handleClose}
                title={"處於結束階段的人數"}
              ></PanelOKRCardBtn>
            </>
          )}
          <div className="block">
            <div className="">
              {type === "create" && <label className="ml-3">制定階段</label>}
              {type === "audit" && <label className="ml-3">審核階段</label>}
              {type === "track" && <label className="ml-3">追蹤階段</label>}
              {type === "end" && <label className="ml-3">結束階段</label>}
            </div>
            <div className="">
              <label className="ml-6 text-2xl text-black">{number}</label>
            </div>
          </div>
        </div>

        <div className="ml-6 flex">
          <progress
            className="progress mt-8 w-40"
            value={Math.round((number / (oNum === 0 ? 1 : oNum)) * 100)}
            max="100"
          ></progress>
          <label className="ml-3 mt-6">
            {Math.round((number / (oNum === 0 ? 1 : oNum)) * 100)}%
          </label>
        </div>
      </CardBody>
    </Card>
  );
}
