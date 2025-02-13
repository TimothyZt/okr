"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Objective, UpdateObjective } from "../../../dtos/okr-dtos";
import {
  Department,
  DepartmentDto,
  Indicator,
  OrgChart,
  StrategicTheme,
} from "../../../../baseInfo/dtos/baseinfo-dtos";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import {
  getIndicatorSourceAction,
  getStrategicThemesAction,
} from "../../../../baseInfo/server-actions/baseinfo";
import { putObjectiveAction } from "../../../server-actions/actions";
import Draggable from "react-draggable";
import MultiSelect from "@/components/FormElements/MultiSelect";
import StrategicThemesDropdown from "../../../../baseInfo/components/strategic-themes/strategic-themes";
import OBelongToCompany from "./alter-content/belong-company";
import CreateOPersonInCharge from "./alter-content/o-personInCharge";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import { toast, Bounce } from "react-toastify";
import { Me } from "../../../../users/dtos/users-dto";

interface Props {
  btnCss: string;
  btnName: string;
  objective: Objective;
  myRespCompany: DepartmentDto;
  periodByO: PeriodDto;
  me: Me;
}

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

export default function AlterOContent({
  objective,
  btnCss,
  btnName,
  myRespCompany,
  periodByO,
  me,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<string>("公司級");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [themes, setThemes] = useState<StrategicTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(
    objective.strategicThemeId!,
  );
  const [selectedObjective, setSelectedObjective] = useState<string | null>(
    objective.strategicOId!,
  );
  const [objectiveCompanyCode, setObjectiveCompanyCode] = useState<
    string | null
  >(null);
  const de: Department = {
    id: objective.departmentId!,
    level: "",
    parentId: "",
    parentCode: "",
    code: "",
    fullCode: "",
    name: objective.departmentName!,
    fullName: objective.departmentName!,
    isHide: false,
    isActive: 1,
  };

  const orgchart: OrgChart = {
    id: "",
    emplNum: "",
    emplId: objective.belongToEmplId!,
    companyName: objective.departmentName!,
    sex: "",
    emplName: objective.belongToEmplN!,
    departmentName: "",
    emailAddress: "",
    position: "",
    isActive: 1,
    roles: [],
  };
  const [personInCharge, setPersonInCharge] = useState<OrgChart>(orgchart); //PersonInCharge
  const [companyInCharge, setCompanyInCharge] = useState<Department>(de); //DepartmentInChargeIncode

  const indicatorNames = objective
    .indicators!.map((indicator) => indicator.indicatorName)
    .join(", ");
  const [indicators, setindicators] = useState<Indicator[]>([]); //MultiSelect
  const [selected, setSelected] = useState<number[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const [description, setDescription] = useState(objective.desc); //Description
  // 处理文本区域输入变化的事件处理器
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const themesResult = themes.map((item: { id: any; themeName: any }) => ({
    id: item.id,
    themeName: item.themeName,
  }));
  const objectives = themes.flatMap((item) => {
    return item.objectives;
  });

  const indicatorsResult: Record<string, string> = {};
  indicators.forEach((item) => {
    indicatorsResult[item.id] = item.indicatorName;
  });

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleCreateOBtn = async () => {
    var themeList = unpackActionResponse(
      await getStrategicThemesAction(objective.okrperiodId!),
    );
    setThemes(themeList);
    setindicators(unpackActionResponse(await getIndicatorSourceAction()));
    setSelectedTheme(  objective.strategicThemeId!)
    setSelectedObjective(  objective.strategicOId!)
    setDescription(objective.desc)
  
    onOpen();
  };

  const entriesArray = selected.map((x) => x);

  const indi = Object.entries(indicatorsResult);
  const indiResult = indi.filter((_, index) => entriesArray.includes(index));
  const indicato: Indicator[] = indiResult.map(([id, indicatorName]) => {
    return {
      id: id,
      indicatorName: indicatorName,
    };
  });
  function toastError(name: string) {
    toast.error("創建目標(O)失敗: " + name, {
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
  const update: UpdateObjective = {
    indicators: indicato,
    id: objective?.id,
    belongToEmplId: personInCharge?.emplId,
    belongToEmplN: personInCharge?.emplName,
    departmentId: companyInCharge?.id,
    strategicThemeId: selectedTheme!,
    strategicOId: selectedObjective!,
    desc: description,
    okrLevel: selectedOption,
  };
  const handleCompleteBtn = async () => {
    if (update.desc === "") {
      toastError("目標(O)的描述爲空");
    } else if (indicatorNames === "" && indicato.length === 0) {
      toastError("指標來源爲空");
    } else if (update.strategicThemeId === "") {
      toastError("戰略主題爲空");
    } else if (update.strategicOId === "") {
      toastError("戰略目標爲空");
    } else if (
      me.roles.find((x) => x.roleName === "Secretary") &&
      me.roles.length === 1 &&
      me.id === personInCharge.emplId
    ) {
      toastError("請選擇其他負責人！");
    } else {
      await putObjectiveAction(objective.id, update);
      const oc: OrgChart = {
        id: "",
        emplNum: "",
        emplId: update.belongToEmplId!, 
        companyName: "",
        sex: "",
        emplName: update.belongToEmplN!,
        departmentName: "",
        emailAddress: "",
        position: "",
        isActive: 1,
        roles: [],
      };
      setPersonInCharge(oc);
      toast.success("修改目標(O)成功: ", {
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
  };
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <button onClick={handleCreateOBtn} className={btnCss}>
        {btnName}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // className="bg-white w-230 h-150  shadow-2xl rounded-md"
        className="h-[600px] w-150 rounded-md  border-2 border-slate-400  bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <ModalHeader className="mb-15  flex gap-1 border-b-2 border-slate-400">
                  <h1 className="ml-2">{"修改目標(O)"}</h1>
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
                <ModalBody className="flex  justify-center overflow-y-scroll">
                  <div className="rounded--2xl absolute right-0 h-full w-150 overflow-y-scroll rounded-l-none bg-white">
                    <div className="mt-3">
                      <div className="flex w-full">
                        <div className="ml-8 mt-3 w-4/12">
                          <StrategicThemesDropdown
                            themes={themesResult}
                            objectives={objectives}
                            selectedTheme={selectedTheme!}
                            setSelectedTheme={setSelectedTheme}
                            selectedObjective={selectedObjective}
                            setSelectedObjective={setSelectedObjective}
                            objectiveCompanyCode={objectiveCompanyCode!}
                            setObjectiveCompanyCode={setObjectiveCompanyCode}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="ml-8 mt-5 w-6/12">
                          <MultiSelect
                            id="multiSelect"
                            title="指標來源"
                            indicatorSource={indicatorsResult}
                            selected={selected}
                            setSelected={setSelected}
                            options={options}
                            setOptions={setOptions}
                            selectString={indicatorNames}
                          ></MultiSelect>
                        </div>
                        <div className="ml-4 mt-4 w-4/12 ">
                          <label className="text-sm  font-medium text-black dark:text-white">
                            歸屬公司
                          </label>
                          <OBelongToCompany
                            setCompanyInCharge={setCompanyInCharge}
                            btnCss={
                              "h-12 w-full mt-3  border-[1.5px] border-stroke bg-transparent px-4  py-1 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                            }
                            btsDesc={
                              companyInCharge !== undefined
                                ? companyInCharge.name
                                : "請選擇"
                            }
                            isCustomData={true}
                            customData={myRespCompany}
                          />
                        </div>
                      </div>
                      <div className="ml-8 mt-5 w-11/12">
                        <label className="block pb-3 text-sm font-medium  text-black dark:text-white">
                          目標(O)描述
                        </label>
                        <textarea
                          rows={6}
                          placeholder="請填寫目標(O)的詳細描述"
                          className="h-30 w-full  rounded-lg border-[1.5px] border-stroke bg-transparent px-4  py-1 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                          value={description}
                          onChange={handleInputChange}
                          onMouseDown={handleTextareaMouseDown}
                        ></textarea>
                      </div>
                      <div className="mb-20 flex w-full">
                        <div className="ml-8  w-4/12">
                          <label className="mb-3 mt-3  block text-sm font-medium text-black dark:text-white">
                            時間類型
                          </label>
                          <input
                            type="text"
                            placeholder={
                              "           " + periodByO.okrYear + "年 年度"
                            }
                            disabled
                            className="adisabled:cursor-default w-full rounded-none border-stroke bg-transparent py-3 text-black outline-none transition disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                          />
                        </div>

                        <div className="ml-6 mt-2 w-3/12 ">
                          <label className="text-sm  font-medium text-black dark:text-white">
                            选择負責人
                          </label>
                          <CreateOPersonInCharge
                            defaultPersonInCharge={objective.belongToEmplN!}
                            setPersonInCharge={setPersonInCharge}
                          ></CreateOPersonInCharge>
                        </div>

                        <div className="ml-6 w-3/12">
                          <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                            OKR級別
                          </label>
                          <div className="relative z-20 mt-1 bg-white dark:bg-form-input">
                            <select
                              value={selectedOption}
                              onChange={(e) => {
                                setSelectedOption(e.target.value);
                                changeTextColor();
                              }}
                              className={`relative z-20 h-12 w-full appearance-none border border-slate-300 bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                                isOptionSelected
                                  ? "text-black dark:text-white"
                                  : ""
                              }`}
                            >
                              <option
                                disabled
                                className="text-body dark:text-bodydark"
                              >
                                請選擇
                              </option>
                              <option
                                value="公司級"
                                className="text-body dark:text-bodydark"
                              >
                                公司級
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-white"></div>
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
