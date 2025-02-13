import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ChartReport from "./ChartReport";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import { getReportsAction } from "../../../features/okrs/server-actions/actions";
import { ReportRecordResponse } from "../../../features/okrs/dtos/okr-dtos";

interface ChartThreeState {
  series: number[];
}

interface Props {
  analysis1: number;
  analysis2: number;
  analysis3: number;
  OProgressAnalysis1: ReportRecordResponse[];
  OProgressAnalysis2: ReportRecordResponse[];
  OProgressAnalysis3: ReportRecordResponse[];
}

export default function CompleteChartThree({
  analysis1,
  analysis2,
  analysis3,
  OProgressAnalysis1,
  OProgressAnalysis2,
  OProgressAnalysis3,
}: Props) {
  const [pointIndex, setPointIndex] = useState(Number);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    if (!showModal) setShowModal(true);
    else {
      setShowModal(false);
    }
  };

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // alert(config.dataPointIndex);
          handleClose();
          setPointIndex(config.dataPointIndex);
          handleDataClick(config.dataPointIndex);
        },
      },
    },
    colors: ["#BBDEFB", "#64B5F6", "#1976D2"],
    labels: ["未達到預期目標", "達到預期目標", "超出預期結果"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 200,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  let total = analysis1+analysis2+analysis3
  let left =  33.3;
  let mid = 33.3;
  let right = 33.3;
  if(total !== 0)
    {
      left =  Number((analysis1/total).toFixed(2));
      mid = Number((analysis2/total).toFixed(2));
      right =  Number((analysis3/total).toFixed(2));    
    }
  const [state, setState] = useState<ChartThreeState>({
    series: [left, mid,  right],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [30, 30, 30],
    }));
  };
  handleReset;
  const [records, setRecords] = useState<ReportRecordResponse[]>([]);
  const handleDataClick = async (type: number) => {
    let typeRequest = "";
    if (type === 1) typeRequest = "OProgressAnalysis1";
    else if (type === 0) typeRequest = "OProgressAnalysis2";
    else if (type === 2) typeRequest = "OProgressAnalysis3";

    const results = unpackActionResponse(await getReportsAction(typeRequest));
    if (records.length !== 0) {
      setRecords(results.filter((x) => x.krProgress >= 100));
    }

    handleClose;
  };
  return (
    <div className="ml-2 mt-5 h-60 w-1/2 bg-white shadow-14">
      <div className="relative left-4 top-2 flex">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Interface / Line_Xl">
              {" "}
              <path
                id="Vector"
                d="M12 21V3"
                stroke="#07bb9d"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
            </g>{" "}
          </g>
        </svg>
        <label className=" text-sm text-black">目標進度分析</label>
        <div className="ml-1 mt-1">
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.83834 14.1056 10.6796 13.3353 11.1354C13.1385 11.2518 12.9761 11.3789 12.8703 11.5036C12.7675 11.6246 12.75 11.7036 12.75 11.75V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V11.75C11.25 11.2441 11.4715 10.8336 11.7266 10.533C11.9786 10.236 12.2929 10.0092 12.5715 9.84439C12.9044 9.64739 13.125 9.28655 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                fill="#1C274C"
              />{" "}
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-10 flex">
        <div className="mb-2 ml-2 w-1/2">
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart
              options={options}
              series={state.series}
              type="donut"
            />
            {pointIndex === 2 && (
              <ChartReport
                isOpen={showModal}
                onOpenChange={handleClose}
                title={"目標進度(達到預期目標甚至超越預期結果)的人數"}
                records={OProgressAnalysis3}
                type={true}
              ></ChartReport>
            )}
            {pointIndex === 1 && (
              <ChartReport
                isOpen={showModal}
                records={OProgressAnalysis2}
                onOpenChange={handleClose}
                title={"目標進度(未達到預期目標)的人數"}
                type={true}
              ></ChartReport>
            )}
            {pointIndex === 0 && (
              <ChartReport
                isOpen={showModal}
                records={OProgressAnalysis1}
                onOpenChange={handleClose}
                title={"目標進度(未開展)的人數"}
                type={true}
              ></ChartReport>
            )}
          </div>
        </div>

        <div className="block">
          <div className="ml-1 mt-7 flex">
            <label className="mt-1 h-4 w-6 bg-blue-200"></label>
            <div className="ml-3 flex-col">
              <label className="">0.0% ~ 30.0%</label>
            </div>
          </div>

          <div className="ml-1 mt-1 flex">
            <label className="mt-1 h-4 w-6 bg-blue-400"></label>
            <div className="ml-3 flex-col">
              <label className="">30.0% ~ 70.0%</label>
            </div>
          </div>

          <div className="ml-1 mt-1 flex">
            <label className="mt-1 h-4 w-6 bg-blue-600"></label>
            <div className="ml-3 flex-col">
              <label className="">70% ~ 100%</label>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="ml-3 mt-7 flex">
            <label className="ml-3 text-black">{analysis1}</label>
          </div>
          <div className="ml-3 mt-1 flex">
            <label className="ml-3 text-black">{analysis2}</label>
          </div>
          <div className="ml-3 mt-1 flex">
            <label className="ml-3 text-black">{analysis3}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
