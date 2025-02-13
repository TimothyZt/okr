"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { KeyResult, UpdateKR } from "../../../dtos/okr-dtos";
import { Department, KRType } from "../../../../baseInfo/dtos/baseinfo-dtos";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import { getKRTypeAction } from "../../../../baseInfo/server-actions/baseinfo";
import { putKeyResultAction } from "../../../server-actions/actions";
import Draggable from "react-draggable";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import DeptInCharge from "../../../../baseInfo/components/department/departInCharge";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import ensurePeriodIsHavePermission from "../../../../system/extension/system-extension";
import { toast, Bounce } from "react-toastify";

interface Props {
  oId: string;
  kr: KeyResult;
  krNum: number;
  systemPeriods: PeriodDto[];
  okrPeriodId:string;
}
export default function AlertKRContent({
  oId,
  kr,
  krNum,
  systemPeriods,
  okrPeriodId
}: Props) {
  // const krDefaultWeight = parseFloat(
  //   (100 / (krNum === 0 ? 1 : krNum)).toFixed(1),
  // );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [krType, setKrType] = useState<KRType[]>([]);
  const [selectKRType, setselectKRType] = useState<string>(kr.krTypeId!); //select-krType
  const de1: Department = {
    id: kr.belongToDepartment1Id!,
    name: kr.belongToDepartment1Name!,
    fullName: kr.belongToDepartment1Name!,
    level: "",
    parentId: "",
    parentCode: "",
    code: "",
    fullCode: "",
    isHide: false,
    isActive: 1,
  };

  const de2: Department = {
    id: "",
    name: "",
    fullName: "",
    level: "",
    parentId: "",
    parentCode: "",
    code: "",
    fullCode: "",
    isHide: false,
    isActive: 1,
  };

  if (kr.belongToDepartment2Name !== "") {
    de2.id = kr.belongToDepartment2Id!;
    de2.name = kr.belongToDepartment2Name!;
    de2.fullName = kr.belongToDepartment2Name!;
  }
  const [departmentInCharge, setDepartmentInCharge] = useState<Department[]>(
    de2.name === "" ? [de1] : [de1, de2],
  );

  const [description, setDescription] = useState(kr.description);
  // 处理文本区域输入变化的事件处理器
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const [weight, setWeight] = useState(kr.weight);
  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(event.target.value)); // 更新
  };
  const handleCreateOBtn = async () => {
    const periodByO = systemPeriods.find(x=>x.id === okrPeriodId)

    if (ensurePeriodIsHavePermission(periodByO?.okrYear!,systemPeriods)) {
      var krTypeList = unpackActionResponse(await getKRTypeAction());
      setKrType(krTypeList);
      onOpen();
    }
  };
  const krTypeResult: Record<string, string> = {};
  krType.forEach((item) => {
    krTypeResult[item.id] = item.krTypeName;
  });

  const departmentIds = departmentInCharge
    ?.filter((x) => x.parentId !== "00000000-0000-0000-0000-000000000000")
    .map((x) => x.id);
  const update: UpdateKR = {
    id: kr.id,
    description: description,
    krType: selectKRType,
    department: departmentIds,
    weight: weight,
  };
  function toastError(name: string) {
    toast.error("修改KR失敗: " + name + "爲空", {
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
    const periodByO = systemPeriods.find(x=>x.id === okrPeriodId)
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!,systemPeriods)) {
      if (update.description === "") {
        toastError("關鍵結果(KR)描述");
      } else if (update.krType === "") {
        toastError("KR類型");
      } else if (update.department!.length === 0) {
        toastError("指派部門");
      } else {
        await putKeyResultAction(oId, kr.id, update);
        toast.success("關鍵結果(KR)修改成功!", {
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
        onOpenChange();
      }
    }
  };
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <button
        onClick={handleCreateOBtn}
        className="btn  btn-ghost btn-xs inline-block rounded-none text-green-500"
      >
        <label>编辑</label>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // className="bg-white w-230 h-150  shadow-2xl rounded-md"
        className="h-125 w-150 rounded-md  border-2 border-slate-400 bg-white shadow-2xl"
      >
        <Draggable>
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="mb-24  flex gap-1 border-b-2 border-slate-400">
                <h1 className="ml-2">{"修改關鍵結果(KR)"}</h1>
                <div className="block">
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
                          selectedKRType={selectKRType!}
                          setSelectedKRType={setselectKRType}
                        />
                      </div>
                      <div className="ml-8 w-2/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          权重
                        </label>
                        <input
                          type="text"
                          onChange={handleWeightChange}
                          placeholder={kr.weight?.toString()}
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
                          departmentInCharge === undefined
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
