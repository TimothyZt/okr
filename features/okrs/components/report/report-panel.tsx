"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/progress";
import PanelOKRCard from "@/components/PanelOKRCard/PanelOKRCard";
import ChartThree from "@/components/Charts/ChartThree";
import { ApexOptions } from "apexcharts";
import CompleteChartThree from "@/components/Charts/CompleteChartThree";
import CreateOfRateBtn from "@/components/PanelOKRCard/CreateOfRateBtn";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PanelOKRCard2 from "@/components/PanelOKRCard/PanelOKRCard2";
import CreateKROfRateBtn from "@/components/PanelOKRCard/CreateKROfRateBtn";
import { ReportDataResponse, ReportRecordResponse } from "../../dtos/okr-dtos";

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#fb923c"],
  labels: ["Desktop"],
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
interface ChartThreeState {
  series: number[];
}

interface Props {
  data: ReportDataResponse;
  OProgressAnalysis1: ReportRecordResponse[];
  OProgressAnalysis2: ReportRecordResponse[];
  OProgressAnalysis3: ReportRecordResponse[];
  KRProgressAnalysis1: ReportRecordResponse[];
  KRProgressAnalysis2: ReportRecordResponse[];
  KRProgressAnalysis3: ReportRecordResponse[];
  KRProgressAnalysis4: ReportRecordResponse[];
}
export default function ReportPanel({
  data,
  OProgressAnalysis1,
  OProgressAnalysis2,
  OProgressAnalysis3,
  KRProgressAnalysis1,
  KRProgressAnalysis2,
  KRProgressAnalysis3,
  KRProgressAnalysis4,
}: Props) {
  const [state, setState] = useState<ChartThreeState>({
    series: [100],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [100],
    }));
  };
  handleReset;
  const [showModal1, setShowModal1] = useState(false);
  const handleClose1 = async () => {
    setShowModal1(!showModal1);
  };
  const [showModal2, setShowModal2] = useState(false);
  const handleClose2 = () => {
    if (!showModal2) setShowModal2(true);
    else {
      setShowModal2(false);
    }
  };
  return (
    <>
      <div className="flex">
        <div className="relative left-2 top-0 flex">
          <Breadcrumb pageName="OKR數據看板" />
          <div className="dropdown dropdown-hover ml-3 h-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm w-20 rounded-md bg-slate-300"
            >
              公司級
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-20 bg-base-100 p-2 text-center shadow"
            >
              <li>
                <Link href="#">部門級</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="dropdown dropdown-hover absolute right-6 h-10">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm w-32 rounded-md bg-white"
          >
            2024年
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-32 bg-base-100 p-2 text-center shadow"
          >
            <li>
              <Link href="#">2025年</Link>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-hover absolute right-44 h-10 ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm  w-32 rounded-md bg-white "
          >
            中華商務聯合
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-32 bg-base-100 p-2  text-center shadow"
          >
            <li>
              <Link href="#">其他</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-6/12">
          <Card className="ml-0 mt-5 h-40 w-full bg-white shadow-14">
            <CardBody className=" overflow-auto">
              <div className="flex">
                <div className="ml-25 mt-6">
                  <svg
                    width="110px"
                    height="100px"
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M510.007782 893.310506c-8.765759 0-15.937743-7.171984-15.937743-15.937743V749.07393c0-8.765759 7.171984-15.937743 15.937743-15.937743s15.937743 7.171984 15.937743 15.937743v128.298833c0 8.765759-7.171984 15.937743-15.937743 15.937743zM452.631907 1024H337.083268c-8.765759 0-15.937743-7.171984-15.937743-15.937743s7.171984-15.937743 15.937743-15.937743h115.548639c8.765759 0 15.937743 7.171984 15.937743 15.937743s-7.171984 15.937743-15.937743 15.937743zM680.541634 1024H564.992996c-8.765759 0-15.937743-7.171984-15.937743-15.937743s7.171984-15.937743 15.937743-15.937743H680.541634c8.765759 0 15.937743 7.171984 15.937743 15.937743s-7.171984 15.937743-15.937743 15.937743z"
                        fill="#131313"
                      />
                      <path
                        d="M378.521401 1020.812451c-3.984436 0-7.968872-1.593774-11.15642-4.781323-6.375097-6.375097-6.375097-15.937743 0-22.31284l131.486381-131.486381c6.375097-6.375097 15.937743-6.375097 22.31284 0l131.486382 131.486381c6.375097 6.375097 6.375097 15.937743 0 22.31284-6.375097 6.375097-15.937743 6.375097-22.312841 0l-120.329961-120.329961-120.329961 120.329961c-3.187549 3.187549-7.171984 4.781323-11.15642 4.781323z"
                        fill="#131313"
                      />
                      <path
                        d="M41.438132 15.937743h940.326849c12.750195 0 22.31284 10.359533 22.31284 22.312841v687.713618c0 12.750195-10.359533 22.31284-22.31284 22.312841H41.438132C29.484825 749.07393 19.125292 738.714397 19.125292 726.761089V38.250584C19.125292 26.297276 29.484825 15.937743 41.438132 15.937743z"
                        fill="#82f2cd"
                      />
                      <path
                        d="M981.764981 765.011673H41.438132C20.719066 765.011673 3.187549 747.480156 3.187549 726.761089V38.250584C3.187549 17.531518 20.719066 0 41.438132 0h940.326849c21.515953 0 38.250584 17.531518 38.250583 38.250584v687.713618c0.796887 21.515953-16.73463 39.047471-38.250583 39.047471zM41.438132 31.875486c-3.187549 0-6.375097 3.187549-6.375097 6.375098v687.713618c0 3.984436 3.187549 7.171984 6.375097 7.171985h940.326849c3.984436 0 6.375097-3.187549 6.375097-6.375098V38.250584c0-3.984436-3.187549-6.375097-6.375097-6.375098H41.438132z"
                        fill="#131313"
                      />
                      <path
                        d="M77.298054 77.298054H943.514397v611.212452H77.298054z"
                        fill="#ebffed"
                      />
                      <path
                        d="M943.514397 703.651362H77.298054c-8.765759 0-15.937743-7.171984-15.937743-15.937743V77.298054c0-8.765759 7.171984-15.937743 15.937743-15.937743H943.514397c8.765759 0 15.937743 7.171984 15.937743 15.937743v611.212452c0 7.968872-7.171984 15.140856-15.937743 15.140856z m-850.278599-31.875487H927.576654V93.235798H93.235798v578.540077z"
                        fill="#131313"
                      />
                      <path
                        d="M879.763424 575.352529H718.792218c-8.765759 0-15.937743-7.171984-15.937743-15.937743s7.171984-15.937743 15.937743-15.937743H879.763424c8.765759 0 15.937743 7.171984 15.937743 15.937743s-7.171984 15.937743-15.937743 15.937743zM778.558755 643.884825h-59.766537c-8.765759 0-15.937743-7.171984-15.937743-15.937743s7.171984-15.937743 15.937743-15.937743h59.766537c8.765759 0 15.937743 7.171984 15.937743 15.937743s-7.171984 15.937743-15.937743 15.937743zM474.944747 540.289494c-3.984436 0-7.968872-1.593774-11.15642-4.781323L249.425681 321.942412c-6.375097-6.375097-6.375097-15.937743 0-22.31284 6.375097-6.375097 15.937743-6.375097 22.31284 0l213.565759 213.565759c6.375097 6.375097 6.375097 15.937743 0 22.31284-2.390661 3.984436-6.375097 4.781323-10.359533 4.781323zM510.007782 537.898833c-2.390661 0-5.57821-0.796887-7.968871-2.390662-7.968872-3.984436-10.359533-14.343969-6.375098-21.515953L656.635019 228.706615c3.984436-7.968872 14.343969-10.359533 21.515954-6.375097 7.968872 3.984436 10.359533 14.343969 6.375097 21.515953L524.351751 529.929961c-3.187549 4.781323-8.765759 7.968872-14.343969 7.968872z"
                        fill="#131313"
                      />
                      <path
                        d="M286.879377 568.977432c-3.984436 0-7.968872-1.593774-11.15642-4.781323-6.375097-6.375097-6.375097-16.73463 0-22.312841l202.409339-197.628015c6.375097-6.375097 16.73463-6.375097 22.31284 0 6.375097 6.375097 6.375097 16.73463 0 22.31284L298.035798 564.196109c-3.187549 3.187549-7.171984 4.781323-11.156421 4.781323zM750.667704 351.427237H539.492607c-8.765759 0-15.937743-7.171984-15.937743-15.937743s7.171984-15.937743 15.937743-15.937743h210.37821c8.765759 0 15.937743 7.171984 15.937743 15.937743s-6.375097 15.937743-15.140856 15.937743z"
                        fill="#131313"
                      />
                      <path
                        d="M239.066148 290.863813m-29.484825 0a29.484825 29.484825 0 1 0 58.96965 0 29.484825 29.484825 0 1 0-58.96965 0Z"
                        fill="#ebffed"
                      />
                      <path
                        d="M239.066148 336.286381c-24.703502 0-45.422568-19.922179-45.422568-45.422568 0-24.703502 19.922179-45.422568 45.422568-45.422568 24.703502 0 45.422568 19.922179 45.422568 45.422568s-19.922179 45.422568-45.422568 45.422568z m0-58.172762c-7.171984 0-13.547082 5.57821-13.547082 13.547081 0 7.171984 5.57821 13.547082 13.547082 13.547082 7.171984 0 13.547082-5.57821 13.547082-13.547082s-5.57821-13.547082-13.547082-13.547081z"
                        fill="#131313"
                      />
                      <path
                        d="M494.070039 545.867704m-29.484825 0a29.484825 29.484825 0 1 0 58.96965 0 29.484825 29.484825 0 1 0-58.96965 0Z"
                        fill="#ebffed"
                      />
                      <path
                        d="M494.070039 591.290272c-24.703502 0-45.422568-19.922179-45.422568-45.422568s19.922179-45.422568 45.422568-45.422568c24.703502 0 45.422568 19.922179 45.422568 45.422568s-19.922179 45.422568-45.422568 45.422568z m0-58.172762c-7.171984 0-13.547082 5.57821-13.547082 13.547081s5.57821 13.547082 13.547082 13.547082c7.171984 0 13.547082-5.57821 13.547082-13.547082s-5.57821-13.547082-13.547082-13.547081z"
                        fill="#131313"
                      />
                      <path
                        d="M510.804669 334.692607m-29.484825 0a29.484825 29.484825 0 1 0 58.96965 0 29.484825 29.484825 0 1 0-58.96965 0Z"
                        fill="#ebffed"
                      />
                      <path
                        d="M510.804669 380.115175c-24.703502 0-45.422568-19.922179-45.422568-45.422568 0-24.703502 19.922179-45.422568 45.422568-45.422568s45.422568 19.922179 45.422568 45.422568c-0.796887 25.500389-20.719066 45.422568-45.422568 45.422568z m0-58.172763c-7.171984 0-13.547082 5.57821-13.547081 13.547082 0 7.171984 5.57821 13.547082 13.547081 13.547082s13.547082-5.57821 13.547082-13.547082c-0.796887-7.968872-6.375097-13.547082-13.547082-13.547082z"
                        fill="#131313"
                      />
                      <path
                        d="M778.558755 334.692607m-29.484825 0a29.484825 29.484825 0 1 0 58.96965 0 29.484825 29.484825 0 1 0-58.96965 0Z"
                        fill="#ebffed"
                      />
                      <path
                        d="M778.558755 380.115175c-24.703502 0-45.422568-19.922179-45.422568-45.422568 0-24.703502 19.922179-45.422568 45.422568-45.422568s45.422568 19.922179 45.422568 45.422568-19.922179 45.422568-45.422568 45.422568z m0-58.172763c-7.171984 0-13.547082 5.57821-13.547082 13.547082 0 7.171984 5.57821 13.547082 13.547082 13.547082S792.105837 342.661479 792.105837 335.489494c0-7.968872-6.375097-13.547082-13.547082-13.547082z"
                        fill="#131313"
                      />
                      <path
                        d="M682.932296 207.190661m-29.484825 0a29.484825 29.484825 0 1 0 58.96965 0 29.484825 29.484825 0 1 0-58.96965 0Z"
                        fill="#ebffed"
                      />
                      <path
                        d="M682.932296 252.61323c-24.703502 0-45.422568-19.922179-45.422568-45.422569s19.922179-45.422568 45.422568-45.422568S728.354864 182.48716 728.354864 207.190661s-19.922179 45.422568-45.422568 45.422569z m0-58.172763c-7.171984 0-13.547082 5.57821-13.547082 13.547082s5.57821 13.547082 13.547082 13.547081S696.479377 215.159533 696.479377 207.190661s-5.57821-12.750195-13.547081-12.750194z"
                        fill="#131313"
                      />
                      <path
                        d="M268.550973 575.352529m-29.484825 0a29.484825 29.484825 0 1 0 58.96965 0 29.484825 29.484825 0 1 0-58.96965 0Z"
                        fill="#ebffed"
                      />
                      <path
                        d="M268.550973 620.775097c-24.703502 0-45.422568-19.922179-45.422568-45.422568 0-24.703502 19.922179-45.422568 45.422568-45.422568S313.973541 549.85214 313.973541 575.352529c0 24.703502-20.719066 45.422568-45.422568 45.422568z m0-58.172762c-7.171984 0-13.547082 5.57821-13.547082 13.547081s5.57821 13.547082 13.547082 13.547082 13.547082-5.57821 13.547081-13.547082-6.375097-13.547082-13.547081-13.547081z"
                        fill="#131313"
                      />
                    </g>
                  </svg>
                </div>

                <div className="ml-14 block">
                  <div className="ml-10 mt-8">
                    <label>O目標數</label>
                  </div>
                  <div className="ml-13 mt-1">
                    <label className="text-6xl text-black">{data.osNum}</label>
                  </div>
                </div>

                <div className="ml-16 block">
                  <div className="ml-3 mt-8">
                    <label>KR关键結果總數</label>
                  </div>
                  <div className="ml-13 mt-1">
                    <label className="text-6xl text-black">{data.krsNum}</label>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <CreateOfRateBtn
          isOpen={showModal1}
          onOpenChange={handleClose1}
          title={"目標平均進度"}
          averageOProgress={data.averageOProgress}
        ></CreateOfRateBtn>

        <CreateKROfRateBtn
          isOpen={showModal2}
          onOpenChange={handleClose2}
          title={"關鍵結果完成度"}
          krCompletedValue={data.krProgress}
        ></CreateKROfRateBtn>
      </div>
      <div className="ml-2 mt-5 flex w-full">
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
        <div className="w-full ">OKR階段</div>
      </div>

      <div className="flex max-w-full">
        <PanelOKRCard
          type="create"
          number={data.okRsInCreateStage}
          oNum={data.osNum}
        ></PanelOKRCard>
        <PanelOKRCard
          type="audit"
          number={data.okRsInAuditStage}
          oNum={data.osNum}
        ></PanelOKRCard>
        <PanelOKRCard
          type="track"
          number={data.okRsInTrackStage}
          oNum={data.osNum}
        ></PanelOKRCard>
        <PanelOKRCard
          type="end"
          number={data.okRsInEndStage}
          oNum={data.osNum}
        ></PanelOKRCard>
      </div>

      <div className="ml-2 mt-5 flex w-full">
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
        <div className="w-full ">指標類型完成情況</div>
      </div>

      <div className="flex max-w-full">
        <PanelOKRCard2
          title="營銷類"
          colors={["#96eedf", "#32e2c4"]}
          type="marketing"
          completedNum={data.krTypeInSaleCompletedNum}
          notCompleteNum={data.krTypeInSaleNotCompletNum}
        />
        <PanelOKRCard2
          title="成本控制類"
          colors={["#f0b2b2", "#f96c6c"]}
          type="cost"
          completedNum={data.krTypeInCostControlCompletedNum}
          notCompleteNum={data.krTypeInCostControlNotCompleteNum}
        ></PanelOKRCard2>
        <PanelOKRCard2
          title="項目類"
          colors={["#eca2e9", "#d44eef"]}
          type="project"
          completedNum={data.krTypeInProjectCompletedNum}
          notCompleteNum={data.krTypeInProjectNotCompleteNum}
        ></PanelOKRCard2>
        <PanelOKRCard2
          title="其他類"
          colors={["#fbd798", "#f1af3b"]}
          type="other"
          completedNum={data.krTypeInOtherCompletedNum}
          notCompleteNum={data.krTypeInOtherNotCompleteNum}
        ></PanelOKRCard2>
      </div>

      <div className="mt-5 flex">
        <CompleteChartThree
          analysis1={data.oProgressAnalysis1}
          analysis2={data.oProgressAnalysis2}
          analysis3={data.oProgressAnalysis3}
          OProgressAnalysis1={OProgressAnalysis1}
          OProgressAnalysis2={OProgressAnalysis2}
          OProgressAnalysis3={OProgressAnalysis3}
        />
        <ChartThree
          analysis1={data.krProgressAnalysis1}
          analysis2={data.krProgressAnalysis2}
          analysis3={data.krProgressAnalysis3}
          analysis4={data.krProgressAnalysis4}
          KRProgressAnalysis1={KRProgressAnalysis1}
          KRProgressAnalysis2={KRProgressAnalysis2}
          KRProgressAnalysis3={KRProgressAnalysis3}
          KRProgressAnalysis4={KRProgressAnalysis4}
        />
      </div>
    </>
  );
}
