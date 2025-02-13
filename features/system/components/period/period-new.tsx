"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Me } from "../../../users/dtos/users-dto";
import Draggable from "react-draggable";
import { DatePicker } from "@nextui-org/date-picker";
import {
  parseDate,
} from "@internationalized/date";
import { PeriodDto } from "../../dtos/system-dtos";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { postPeriodAction } from "../../server-actions/actions";
import { convertToDotNetDateTime } from "../../extension/system-extension";

interface Props {
  me: Me;
}

export default function CreatePeriod({ me }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<string>("Year");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const changeTextColor = () => {
    setIsOptionSelected(true);
    setIsOpenSelect(!isOpenSelect);
  };

  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const [isOptionSelected1, setIsOptionSelected1] = useState<boolean>(false);
  const changeTextColor1 = () => {
    setIsOptionSelected1(true);
  };
  const [value, setValue] = React.useState(parseDate("2024-04-04"));
  const [value1, setValue1] = React.useState(parseDate("2024-04-05"));

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const request:PeriodDto = {
    id :"",
    oKRPeriodType: "",
    sysCode: selectedOption,
    sysCodeValue: selectedOption1,
    sysCodeValueName : "",
    okrYear: inputValue,
    startTime: convertToDotNetDateTime(value),
    endTime: convertToDotNetDateTime(value1),
    isDeleted: 0,
    isActive: 1,
  };
  const handlePostPeriodDtoClick = async () => {
    unpackActionResponse(await postPeriodAction(request))
    onOpen
  };
  return (
    <>
      <button
        onClick={onOpen}
        className="btn btn-success btn-sm mr-2 block rounded-md bg-teal-600 text-white "
      >
        創建時間設定
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // className="bg-white w-230 h-150  shadow-2xl rounded-md"
        className="h-[400px] w-150  rounded-md  border-2 border-slate-400  bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <ModalHeader className="mb-15  flex gap-1 border-b-2 border-slate-400">
                  <h1 className="ml-2">創建時間設定</h1>
                  <div className="block">
                    <Button
                      onClick={handlePostPeriodDtoClick}
                      className="btn btn-xs absolute right-35 h-4 w-20 bg-green-500 text-white"
                    >
                      完成
                    </Button>
                    <Button
                      className="btn btn-outline btn-xs  absolute right-10 ml-3 h-4 w-20  text-green-500"
                      onPress={onClose}
                    >
                      取消
                    </Button>
                  </div>
                </ModalHeader>
                <ModalBody className="flex  justify-center overflow-y-scroll">
                  <div className="rounded--2xl absolute right-0 flex h-full w-150 flex-col overflow-y-scroll rounded-l-none bg-white">
                    <div className="flex">
                      {" "}
                      <div className="ml-4 mt-5 w-[270px]">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          時間類型
                        </label>
                        <div className="relative z-20 mt-2 bg-white dark:bg-form-input">
                          <>
                            <select
                              value={selectedOption}
                              onChange={(e) => {
                                setSelectedOption(e.target.value);
                                changeTextColor();
                              }}
                              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition  dark:border-form-strokedark dark:bg-form-input ${
                                isOptionSelected
                                  ? "text-black dark:text-white"
                                  : ""
                              }`}
                            >
                              <option
                                value=""
                                disabled
                                className="text-body dark:text-bodydark"
                              >
                                請選擇
                              </option>

                              <option
                                value="Year"
                                className="text-body dark:text-bodydark"
                              >
                                年度
                              </option>
                              <option
                                value="Season"
                                className="text-body dark:text-bodydark"
                              >
                                季度
                              </option>
                            </select>
                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.8">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill="#637381"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </>
                        </div>
                      </div>
                      {isOpenSelect && (
                        <div className="ml-5 mt-5 w-[275px]">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            季度選擇( 如果時間類型是季度的話 )
                          </label>
                          <div className="relative z-20 mt-2 bg-white dark:bg-form-input">
                            <>
                              <select
                                value={selectedOption1}
                                onChange={(e) => {
                                  setSelectedOption1(e.target.value);
                                  changeTextColor1();
                                }}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition  dark:border-form-strokedark dark:bg-form-input ${
                                  isOptionSelected1
                                    ? "text-black dark:text-white"
                                    : ""
                                }`}
                              >
                                <option
                                  value=""
                                  disabled
                                  className="text-body dark:text-bodydark"
                                >
                                  請選擇
                                </option>
                                <option
                                  value="AllSeason"
                                  className="text-body dark:text-bodydark"
                                >
                                  全年
                                </option>
                                <option
                                  value="FirstSeason"
                                  className="text-body dark:text-bodydark"
                                >
                                  第一季度
                                </option>
                                <option
                                  value="SecondSeason"
                                  className="text-body dark:text-bodydark"
                                >
                                  第二季度
                                </option>
                                <option
                                  value="ThirdSeason"
                                  className="text-body dark:text-bodydark"
                                >
                                  第三季度
                                </option>
                                <option
                                  value="ForthSeason"
                                  className="text-body dark:text-bodydark"
                                >
                                  第四季度
                                </option>
                              </select>
                              <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g opacity="0.8">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                      fill="#637381"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                            </>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex">
                      <div className="mb-4 ml-4 mt-5 w-[270px]">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          開始時間
                        </label>
                        <DatePicker
                          color="success"
                          className="border-2 border-slate-100  text-lg"
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <div className="mb-4 ml-5 mt-5 w-[275px]">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          開始時間
                        </label>
                        <DatePicker
                          className="border-2 border-slate-100  text-lg"
                          value={value1}
                          onChange={setValue1}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mb-4 ml-4 mt-1 w-[270px]">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          所屬年度
                        </label>
                        <input
                          type="text"
                          placeholder="2024"
                          value={inputValue}
                          onChange={handleChange}
                          className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                        />
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
