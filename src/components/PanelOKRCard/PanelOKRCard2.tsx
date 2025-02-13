import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ChartReport from "../Charts/ChartReport";
import { ReportRecordResponse } from "../../../features/okrs/dtos/okr-dtos";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import { getReportsAction } from "../../../features/okrs/server-actions/actions";

interface ChartThreeState {
  series: number[];
}
interface Props {
  title: string;
  colors: string[];
  type: string;
  completedNum: number;
  notCompleteNum: number;
}

const PanelOKRCard2: React.FC<Props> = ({
  title,
  colors,
  type,
  completedNum,
  notCompleteNum,
}) => {
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
          if (config.dataPointIndex === 1) {
            handleDataClick(true);
          } else {
            handleDataClick(false);
          }
        },
      },
    },
    colors: colors,
    labels: ["未完成", "已完成"],
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
            width: 160,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 160,
          },
        },
      },
    ],
  };
  const total = (completedNum+notCompleteNum)
  let left =  50;
  let right = 50;
  if(total !== 0)
    {
      left =  Number((notCompleteNum /total).toFixed(2));
      right =  Number((completedNum / total).toFixed(2));    
    }
  const [state, setState] = useState<ChartThreeState>({
    series:  [left, right],
  });

  
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [50, 50],
    }));
  };
  handleReset;
  const [records, setRecords] = useState<ReportRecordResponse[]>([]);
  const handleDataClick = async (isCompleted: boolean) => {
    let typeRequest = "";
    if (type === "marketing") typeRequest = "KRsInSaleKRType";
    else if (type === "cost") typeRequest = " KRsInCostControlKRType";
    else if (type === "project") typeRequest = "KRsInProjectKRType";
    else if (type === "other") typeRequest = "KRsInOtherKRType";
    if (isCompleted) {
      const results = unpackActionResponse(await getReportsAction(typeRequest));
      setRecords(results.filter((x) => x.krProgress >= 100));
    } else {
      const results = unpackActionResponse(await getReportsAction(typeRequest));
      setRecords(results.filter((x) => x.krProgress < 100));
    }
    handleClose;
  };
  return (
    <div className="ml-2 mt-5 h-46 w-1/4 bg-white shadow-14">
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
        <label className=" text-sm text-black">{title}</label>
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

      <div className="mt-5 flex">
        <div className="ml-5 w-1/2">
          <div id="chartThree" className="mx-auto flex  justify-center">
            <ReactApexChart
              options={options}
              series={state.series}
              type="donut"
            />
            {pointIndex === 1 && (
              <ChartReport
                isOpen={showModal}
                onOpenChange={handleClose}
                title={title + "(已完成)"}
                records={records}
                type={false}
              ></ChartReport>
            )}
            {pointIndex === 0 && (
              <ChartReport
                isOpen={showModal}
                onOpenChange={handleClose}
                title={title + "(未完成)"}
                records={records}
                type={false}
              ></ChartReport>
            )}
          </div>
        </div>
        {type === "marketing" && (
          <div className="block">
            <div className="ml-1 mt-10 flex">
              <label className="mt-1 h-3 w-5 bg-teal-200"></label>
              <div className="ml-3 flex-col">
                <label className="text-sm ">未完成</label>
              </div>
            </div>

            <div className="ml-1 mt-1 flex">
              <label className="mt-1 h-3 w-5 bg-teal-400"></label>
              <div className="ml-3 flex-col">
                <label className=" text-sm ">已完成</label>
              </div>
            </div>
          </div>
        )}

        {type === "cost" && (
          <div className="block">
            <div className="ml-1 mt-10 flex">
              <label className="mt-1 h-3 w-5 bg-rose-300"></label>
              <div className="ml-3 flex-col">
                <label className="text-sm ">未完成</label>
              </div>
            </div>

            <div className="ml-1 mt-1 flex">
              <label className="mt-1 h-3 w-5 bg-rose-500"></label>
              <div className="ml-3 flex-col">
                <label className=" text-sm ">已完成</label>
              </div>
            </div>
          </div>
        )}

        {type === "project" && (
          <div className="block">
            <div className="ml-1 mt-10 flex">
              <label className="mt-1 h-3 w-5 bg-fuchsia-300"></label>
              <div className="ml-3 flex-col">
                <label className="text-sm ">未完成</label>
              </div>
            </div>

            <div className="ml-1 mt-1 flex">
              <label className="mt-1 h-3 w-5 bg-fuchsia-500"></label>
              <div className="ml-3 flex-col">
                <label className=" text-sm ">已完成</label>
              </div>
            </div>
          </div>
        )}

        {type === "other" && (
          <div className="block">
            <div className="ml-1 mt-10 flex">
              <label className="mt-1 h-3 w-5 bg-orange-200"></label>
              <div className="ml-3 flex-col">
                <label className="text-sm ">未完成</label>
              </div>
            </div>

            <div className="ml-1 mt-1 flex">
              <label className="mt-1 h-3 w-5 bg-orange-400"></label>
              <div className="ml-3 flex-col">
                <label className=" text-sm ">已完成</label>
              </div>
            </div>
          </div>
        )}

        <div className="block">
          <div className="ml-1 mt-10.5 flex">
            <label className="ml-3 text-sm text-black">{notCompleteNum}</label>
          </div>
          <div className="ml-1 mt-2 flex">
            <label className="ml-3 text-sm  text-black">{completedNum}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelOKRCard2;
