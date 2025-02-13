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
import {
  Department,
  DepartmentDto,
  Indicator,
  OrgChart,
  StrategicTheme,
} from "../../../../baseInfo/dtos/baseinfo-dtos";
import { postObjectiveAction } from "../../../server-actions/actions";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";
import {
  getIndicatorSourceAction,
  getStrategicThemesAction,
} from "../../../../baseInfo/server-actions/baseinfo";
import Draggable from "react-draggable";
import StrategicThemesDropdown from "../../../../baseInfo/components/strategic-themes/strategic-themes";
import MultiSelect from "@/components/FormElements/MultiSelect";
import OBelongToCompany from "../alter/alter-content/belong-company";
import CreateOPersonInCharge from "../alter/alter-content/o-personInCharge";
import { Me } from "../../../../users/dtos/users-dto";
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import ensurePeriodIsHavePermission, {
  formatDate,
} from "../../../../system/extension/system-extension";
import { Bounce, toast } from "react-toastify";
export { ToastContainer } from "react-toastify";

interface Props {
  btnCss: string;
  btnName: string;
  me: Me;
  myRespCompany: DepartmentDto;
  systemPeriods: PeriodDto[];
}

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

export default function CreateO({
  btnCss,
  btnName,
  me,
  myRespCompany,
  systemPeriods
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<string>("公司級");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const currentYear = systemPeriods.find(
    (x) => x.okrYear === new Date().getFullYear().toString(),
  );
  const [selectedOption1, setSelectedOption1] = useState<string>(
    currentYear?.id!
  );
  const [isOptionSelected1, setIsOptionSelected1] = useState<boolean>(false);
  const changeTextColor1 = async (value:string) => {
    setIsOptionSelected1(true);
    var themeList = unpackActionResponse(await getStrategicThemesAction(value));
    setThemes(themeList);
  };

  const [themes, setThemes] = useState<StrategicTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(
    null,
  );
  const [objectiveCompanyCode, setObjectiveCompanyCode] = useState<
    string | null
  >(null);

  const defaultOrgChart: OrgChart = {
    id: me! && me.id,
    emplNum: me! && me.loginId,
    emplId: me! && me.id,
    companyName: "",
    sex: "",
    emplName: me! && me.emplName,
    departmentName: "",
    emailAddress: "",
    position: "",
    isActive: 1,
    roles: [],
  };
  const [personInCharge, setPersonInCharge] =
    useState<OrgChart>(defaultOrgChart); //PersonInCharge
  const myde = myRespCompany.departments.find((x) => x.code.length === 6);
  const [companyInCharge, setCompanyInCharge] = useState<Department>(myde!); //DepartmentInChargeIncode

  const [indicators, setIndicators] = useState<Indicator[]>([]); //MultiSelect
  const [selected, setSelected] = useState<number[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const [description, setDescription] = useState("");
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

  const handleCreateOBtn = async () => {
    var themeList = unpackActionResponse(await getStrategicThemesAction(selectedOption1));
    setThemes(themeList);
    var indicatorList = unpackActionResponse(await getIndicatorSourceAction());
    setIndicators(indicatorList);
    var indicatorList = unpackActionResponse(await getIndicatorSourceAction());
    setIndicators(indicatorList);
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
  const theme = themesResult.find((x) => x.id == selectedTheme);
  const objective = objectives.find((x) => x.id == selectedObjective);
  const createORequest = {
    theme: theme,
    objective: objective,
    indicators: indicato,
    personInCharge: personInCharge,
    desc: description,
    okrLevel: selectedOption,
    okrBelongToDepartment: companyInCharge?.id,
    okrperiodId:selectedOption1,
  };
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
  const handleCompleteBtn = async () => {
    const periodByO = systemPeriods.find(x=>x.id === selectedOption1)
    if (ensurePeriodIsHavePermission(periodByO?.okrYear!,systemPeriods)) {
      if (createORequest.desc === "") {
        toastError("目標(O)的描述爲空");
      } else if (createORequest.indicators.length === 0) {
        toastError("指標來源爲空");
      } else if (createORequest.theme === undefined) {
        toastError("戰略主題爲空");
      } else if (createORequest.objective === undefined) {
        toastError("戰略目標爲空");
      } else if (
        me.departmentDto.departments.find(
          (x) =>
            x.roles?.find(
              (s) => s === "8e7801ab-6bca-4c8b-ad2c-f1c2fac01dd4",
            ) && x.roles.length === 1,
        ) &&
        me.roles.length === 1 &&
        me.id === personInCharge.emplId
      ) {
        toastError("請選擇其他負責人！");
      }
      else {
        await postObjectiveAction(createORequest);
        setDescription("");
        setSelectedObjective("");
        setSelectedTheme("");
        setSelected([]);
        toast.success("目標(O)創建成功!", {
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
      <button onClick={handleCreateOBtn} className={btnCss}>
        {btnName}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // className="bg-white w-230 h-150  shadow-2xl rounded-md"
        className="max-h-screen min-h-150 w-150 rounded-md  border-2 border-slate-400  bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <ModalHeader className="mb-15  flex gap-1 border-b-2 border-slate-400">
                  <h1 className="ml-2">創建目標(O)</h1>
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
                            selectedTheme={selectedTheme}
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
                            selectString={"请选择一个或多个"}
                          />
                        </div>
                        <div className="ml-4 mt-4 w-4/12 ">
                          <label className="text-sm  font-medium text-black dark:text-white">
                            OKR歸屬公司
                          </label>
                          <OBelongToCompany
                            setCompanyInCharge={setCompanyInCharge}
                            btnCss={
                              "h-12 w-full mt-3  border-[1.5px] border-stroke bg-transparent px-4  py-1 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                            }
                            btsDesc={
                              companyInCharge === undefined
                                ? ""
                                : companyInCharge.name
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
                          className="h-30 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-4  py-1 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                          value={description}
                          onChange={handleInputChange}
                          onMouseDown={handleTextareaMouseDown}
                        ></textarea>
                      </div>
                      <div className="mb-5 flex w-full">
                        <div className="ml-8 w-4/12">
                          <label className="mb-3 mt-3  block text-sm font-medium text-black dark:text-white">
                            所屬年度
                          </label>
                          <div className="w-12/12 ml-0 mt-0">
                            <div className="relative z-20 mt-2 bg-white dark:bg-form-input">
                              <>
                                <select
                                  value={selectedOption1}
                                  onChange={(e) => {
                                    setSelectedOption1(e.target.value);
                                    changeTextColor1(e.target.value);
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
                                  {systemPeriods.map((period, key) => (
                                    <option
                                      key={key}
                                      value={period.id}
                                      className="text-body dark:text-bodydark"
                                    >
                                      {period.okrYear}
                                    </option>
                                  ))}
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
                        </div>
                        <div className="ml-6 mt-2.5 w-3/12 ">
                          <label className="text-sm  font-medium text-black dark:text-white">
                            选择負責人
                          </label>
                          <CreateOPersonInCharge
                            defaultPersonInCharge={personInCharge.emplName}
                            setPersonInCharge={setPersonInCharge}
                          ></CreateOPersonInCharge>
                        </div>

                        <div className="ml-6 mt-0.5 w-3/12">
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
