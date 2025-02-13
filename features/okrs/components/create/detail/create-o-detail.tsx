import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Draggable from "react-draggable";
import { Objective } from "../../../dtos/okr-dtos";
import { PeriodDto } from "../../../../system/dtos/system-dtos";

interface Props {
  btnCss: string;
  btnName: string;
  objective: Objective;
  sysstemPeriods:PeriodDto[];
}

export default function ODetail({ btnCss, btnName, objective ,sysstemPeriods}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const indicatorNames = objective?.indicators
    ? objective.indicators.map((x) => x.indicatorName).join("、")
    : "";

  const handleOpenClicked = () => {
    onOpen();
  };
  const okrYear = sysstemPeriods.find(x=>x.id === objective.okrperiodId)
  return (
    <>
      <button onClick={handleOpenClicked} className={btnCss}>
        {btnName}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // className="bg-white w-230 h-150  shadow-2xl rounded-md"
        className="z-999999 h-115 w-150  rounded-md border-2 border-slate-400 bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <ModalHeader className="mb-15  flex gap-1 border-b-2 border-slate-400">
                  <h1 className="ml-2">創建目標</h1>
                </ModalHeader>
                <ModalBody className="flex  justify-center">
                  <div className="rounded--2xl absolute right-0 h-full w-150 overflow-y-auto rounded-l-none bg-white ">
                    <div className="mt-3">
                      <div className="flex">
                        <div className="ml-8 mt-5 w-4/12">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            戰略主題
                          </label>
                          <input
                            type="text"
                            placeholder={objective?.strategicThemeName}
                            disabled
                            className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                          />
                        </div>
                        <div className="ml-3 mr-4 mt-5 w-7/12">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            戰略目標
                          </label>
                          <input
                            type="text"
                            placeholder={objective?.strategicOName}
                            disabled
                            className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                          />
                        </div>
                      </div>

                      <div className="ml-8 mt-5 w-11/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          指標來源
                        </label>
                        <input
                          type="text"
                          placeholder={indicatorNames}
                          disabled
                          className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3  text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                        />
                      </div>

                      <div className="ml-8 mt-5 w-11/12">
                        <label className="block pb-3 text-sm font-medium  text-black dark:text-white">
                          目標(O)描述
                        </label>
                        <textarea
                          rows={6}
                          disabled
                          placeholder={objective?.desc}
                          className="h-30 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-1 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                        ></textarea>
                      </div>

                      <div className="flex">
                        <div className="ml-8 mt-3 w-4/12">
                          <label className="mb-3 mt-2  block text-sm font-medium text-black dark:text-white">
                            時間類型
                          </label>
                          <input
                            type="text"
                            placeholder={okrYear?.okrYear+"年度"}
                            disabled
                            className="w-full text-center border-[1.5px] border-stroke bg-transparent py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div>

                        <div className="ml-6 mt-5 w-3/12">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            負責人
                          </label>
                          <input
                            type="text"
                            placeholder={objective?.belongToEmplN}
                            disabled
                            className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                          />
                        </div>

                        <div className="ml-6 mt-5 w-3/12">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            OKR級別
                          </label>
                          <input
                            type="text"
                            placeholder={objective?.okrLevel}
                            disabled
                            className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                          />
                        </div>
                      </div>
                      <div className="ml-8 mt-20 w-11/12">
                        <label className="block pb-3 text-sm font-medium  text-black dark:text-white"></label>
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
