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
import { Department, KRType } from "../../../../baseInfo/dtos/baseinfo-dtos";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import { getKRTypeAction } from "../../../../baseInfo/server-actions/baseinfo";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import DeptInCharge from "../../../../baseInfo/components/department/departInCharge";
import { postKeyResultAction } from "../../../server-actions/actions";
import { Bounce, toast } from "react-toastify";
import ensurePeriodIsHavePermission from "../../../../system/extension/system-extension";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import Draggable from "react-draggable";

interface Props {
  oId: string;
  krNum: number;
  systemPeriods: PeriodDto[];
  okrYearByO: string;
}

export default function CreateKR({
  oId,
  krNum,
  systemPeriods,
  okrYearByO,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [krType, setKrType] = useState<KRType[]>([]);
  const [selectKRType, setselectKRType] = useState<string>(""); //select-krType
  const [departmentInCharge, setDepartmentInCharge] = useState<Department[]>(
    [],
  );
  const [description, setDescription] = useState(""); //Description
  //处理文本区域输入变化的事件处理器
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const krDefaultWeight = parseFloat(
    (100 / (krNum === 0 ? 1 : krNum)).toFixed(1),
  );
  const [weight, setWeight] = useState(0);
  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(event.target.value)); // 更新
  };
  const krTypeResult: Record<string, string> = {};
  krType.forEach((item) => {
    krTypeResult[item.id] = item.krTypeName;
  });
  const handleCreateKRBtn = async () => {
    const krType = unpackActionResponse(await getKRTypeAction());
    setKrType(krType);
    onOpen();
  };
  const departmentIds = departmentInCharge
    ?.filter((x) => x.parentId !== "00000000-0000-0000-0000-000000000000")
    .map((x) => x.id);

  const CreateKRRequest = {
    desc: description,
    krType: selectKRType,
    departments: departmentIds,
    weight: weight,
  };
  function toastError(name: string) {
    toast.error("創建關鍵結果(KR)失敗: " + name + "爲空", {
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
  }
  const handleCompleteBtn = async () => {
    
    if (ensurePeriodIsHavePermission(okrYearByO,systemPeriods)) {
      if (CreateKRRequest.desc === "") {
        toastError("關鍵結果(KR)描述");
      } else if (CreateKRRequest.krType === "") {
        toastError("KR類型");
      } else if (CreateKRRequest.departments.length === 0) {
        toastError("指派部門");
      } else {
        await postKeyResultAction(oId, CreateKRRequest);
        toast.success("關鍵結果(KR)創建成功!", {
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
        setDepartmentInCharge([]);
        setDescription("");
        setWeight(0);
        setselectKRType("");
        onOpenChange();
      }
    }
  };
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {/* <CreateKROpenBtn onOpen={onOpen} getKRType={setKrType} /> */}
      <Button onPress={handleCreateKRBtn} className="btn btn-ghost w-full">
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          strokeWidth="0.00024000000000000003"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"
              fill="#5a5a5e"
            />{" "}
          </g>
        </svg>
        <label>添加KR</label>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-125 w-150 rounded-md  border-2 border-slate-400 bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <ModalHeader className="mb-24  flex gap-1 border-b-2 border-slate-400">
                  <h1 className="ml-2">創建關鍵結果(KR)</h1>
                  <div className="block">
                    {/* <CreateKRBtn
                      onOpenChange={onOpenChange}
                      request={CreateKRRequest}
                      objectiveId={oId}
                    /> */}

                    <Button
                      className="btn btn-xs absolute right-35 h-4 w-20 bg-green-500 text-white"
                      onPress={handleCompleteBtn}
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
                <ModalBody className="mb-10 flex  justify-center">
                  <div className="rounded--2xl absolute  right-0 h-full w-150 overflow-y-auto rounded-l-none bg-white ">
                    <div className="mt-3">
                      <div className="ml-6 mt-5 w-11/12">
                        <label className="block pb-3 text-sm font-medium  text-black dark:text-white">
                          關鍵結果(KR)描述
                        </label>
                        <textarea
                          rows={6}
                          placeholder="請填寫目標(O)的詳細描述"
                          className="transitiondisabled:cursor-default  w-full border-[1.5px]  border-stroke bg-transparent px-3  py-1 text-black outline-none disabled:bg-whiter dark:bg-form-input dark:text-white"
                          value={description}
                          onChange={handleInputChange}
                          onMouseDown={handleTextareaMouseDown}
                        ></textarea>
                      </div>
                      <div className="ml-6 mt-5 flex w-11/12">
                        <div className="w-9/12">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            KR類型
                          </label>
                          <SelectGroupTwo
                            optionsList={krTypeResult}
                            title={""}
                            selectedKRType={selectKRType}
                            setSelectedKRType={setselectKRType}
                          />
                        </div>
                        <div className="ml-8 w-2/12">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            權重
                          </label>
                          <input
                            type="text"
                            onChange={handleWeightChange}
                            placeholder={"0"}
                            className="input input-bordered h-12 w-15 max-w-xs  rounded-none "
                          />
                          <kbd className="kbd-sm ml-1 mt-1">%</kbd>
                        </div>
                      </div>

                      <div className="ml-6 mt-5 w-11/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          指派
                        </label>
                        <DeptInCharge
                          deptInCharge={departmentInCharge!}
                          setDeptInCharge={setDepartmentInCharge}
                          btnCss={
                            "btn h-10 btn-xs w-full border-lg border-stroke bg-white"
                          }
                          btnDesc={
                            departmentInCharge.length === 0
                              ? "指派"
                              : departmentInCharge.map((x) => x.name).join("、")
                          }
                        ></DeptInCharge>
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
