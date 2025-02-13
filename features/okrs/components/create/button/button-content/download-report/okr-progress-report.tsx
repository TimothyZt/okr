"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import Draggable from "react-draggable";
import { OKRProgressReportRequest } from "../../../../../dtos/feedback-dtos";
import { downloadRatingReportsAction } from "../../../../../server-actions/actions";
import { unpackActionResponse } from "../../../../../../../lib/server-actions/action-response";
import SystemYearSelect from "../../../header/select-system-year";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";
import { Me } from "../../../../../../users/dtos/users-dto";
import CompanySelect from "../../../../../../baseInfo/components/department/company-select";
import { Objective } from "../../../../../dtos/okr-dtos";
import { FilterCompaniesDtos } from "../../../../../../baseInfo/dtos/baseinfo-dtos";
import { Bounce, toast } from "react-toastify";
import { saveAs } from "file-saver";

interface Props {
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  me: Me;
  filterCompanyDtos: FilterCompaniesDtos;
}

export default function DownloadOKRProgressReport({
  systemPeriods,
  currentSystemPeriod,
  me,
  filterCompanyDtos,
}: Props) {
 
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedSeasonValue, setSelectedSeasonValue] =
    useState(currentSystemPeriod?.sysCodeValue);
  const [selectedYear, setSelectedYear] = useState(currentSystemPeriod.okrYear);

  const handleSelectSeasonChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSeasonValue(event.target.value);
  };

  function handleSelectYearClick(value: string) {}
  const [obs, setObs] = useState<Objective[]>();
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const handleDownloadReport = async () => {
    let id = "";
    if (selectedCompany === undefined || selectedCompany === 0) {
      toast.error("下載失敗，暫時不提供全公司下載服務", {
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
    } else {
      id = filterCompanyDtos.filterCompanies[selectedCompany! - 1].companyId;
      const request: OKRProgressReportRequest = {
        year: selectedYear,
        companyId: id,
        season: selectedSeasonValue,
      };
      const response = unpackActionResponse(
        await downloadRatingReportsAction(request),
      );
      window.location.href = response
      
      
      //实在不行   直接fetch
      // await fetch('/api/download', {
      //   credentials: 'include', // 确保 cookies 被包含在请求中
      // });
    }
  };
  return (
    <>
      <button
        className="btn btn-success btn-sm  ml-2 mr-2  w-27 rounded-md  bg-teal-600 text-white"
        onClick={onOpen}
      >
        下载报表
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-60 w-125 rounded-md  border-2 border-slate-400 bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b-2 border-neutral-200  bg-slate-50">
                  報表下載設置
                </ModalHeader>
                <ModalBody>
                  <div className="rounded--2xl  h-full  rounded-l-none bg-white">
                    <div className="ml-0 mt-3 flex">
                      {/* <CompanySelect
                        filterCompanyDtos={filterCompanyDtos}
                        objectives={[]}
                        obs={[]}
                        setObs={setObs}
                        selectedCompany={selectedCompany!}
                        setSelectedCompany={setSelectedCompany}
                      ></CompanySelect> */}
                    </div>
                    <div className="ml-2 mt-5 flex">
                      <div className="flex">
                        <label className="mr-10 mt-1 text-black">年度: </label>
                        <SystemYearSelect
                          me={me}
                          systemPeriods={systemPeriods}
                          currentSystemPeriod={currentSystemPeriod}
                          selectedYear={selectedYear}
                          setSelectedYear={setSelectedYear}
                          handleSelectYearClick={handleSelectYearClick}
                        ></SystemYearSelect>
                      </div>
                      <div className="flex">
                        <label className="ml-6 mr-2 mt-1 text-black">
                          季度 :
                        </label>
                        <select
                          className="w-38 btn btn-sm ml-2 mr-3 rounded-md border-2 border-stroke bg-white"
                          value={selectedSeasonValue}
                          onChange={handleSelectSeasonChange}
                        >
                          <option value="FirstSeason">第一季度</option>
                          <option value="SecondSeason">第二季度</option>
                          <option value="ThirdSeason">第三季度</option>
                          <option value="ForthSeason">第四季度</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  {/* <Button className="btn btn-success absolute btn-ghost text-green-500 bottom-0 mb-4 left-6 w-25 btn-sm " onPress={onClose}>
                  更新记录
                </Button> */}
                  <Button
                    className="btn btn-outline btn-success btn-sm absolute bottom-0 right-36 mb-4 w-25 bg-white "
                    onPress={onClose}
                  >
                    取消
                  </Button>
                  <Button
                    className="btn btn-success btn-sm absolute bottom-0 right-6 mb-4 w-25 text-white "
                    onPress={handleDownloadReport}
                  >
                    下載
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
