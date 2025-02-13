import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Selection,
} from "@nextui-org/react";
import Draggable from "react-draggable";
import { unpackActionResponse } from "../../../../../../lib/server-actions/action-response";
import { OrgChart } from "../../../../../baseInfo/dtos/baseinfo-dtos";
import { getOrgChartAction } from "../../../../../baseInfo/server-actions/baseinfo";
import OPersonInChargeListBox from "./o-personInCharge-data";

interface Props {
  defaultPersonInCharge: string;
  setPersonInCharge: (coor: OrgChart) => void;
}

export default function CreateOPersonInCharge({
  defaultPersonInCharge,
  setPersonInCharge,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };
  const [orgChart, setOrgChart] = useState<OrgChart[]>([]);
  const [values, setValues] = React.useState<Selection>(new Set(["1"]));
  const [isSaved, setIsSaved] = useState(false);
  const [isSelectPerson, setIsSelectPerson] = useState(defaultPersonInCharge);
  
  const handleCreateClick = async () => {
    var orgChartList = unpackActionResponse(await getOrgChartAction());
    setOrgChart(orgChartList);
    setIsOpen(true);
  };
  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    const selectCoor = orgChart.find(
      (x) => x.id === Array.from(values).toString(),
    );
    setPersonInCharge(selectCoor!);
    setIsSelectPerson(selectCoor!.emplName);
    setIsOpen(false);
    handleCancel();
  };

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
    var orgChartList = unpackActionResponse(await getOrgChartAction());
    var orgCharts = orgChartList.filter(
      (x) =>
        x.emplName.includes(event.target.value) ||
        x.emplNum.includes(event.target.value) ||
        x.companyName.includes(event.target.value),
    );
    setOrgChart(orgCharts);
  };

  const content = (
    <PopoverContent>
      <Draggable>
        <div className="h-125  w-125 columns-1 border-2 bg-white shadow-2xl ">
          <div className="h-10 w-full border-b-2 border-slate-300 bg-slate-50 shadow-14">
            <div className="relative left-7 top-1.5 text-black">選擇負責人</div>
          </div>

          <div className="h-auto w-full bg-white">
            <div>
              <label className="input input-bordered ml-4 mt-3 flex  h-8 w-11/12 items-center gap-2 border-slate-400 ">
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  type="text"
                  className="grow"
                  placeholder="搜索人員"
                />
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </label>
            </div>
            <div className="mt-3 w-full border-r-2 border-t-2 border-slate-300 bg-white  shadow-md">
              <OPersonInChargeListBox
                users={orgChart}
                values={values}
                setValues={setValues}
              />
            </div>

            <Button
              className="btn btn-outline btn-sm absolute bottom-3 right-25 h-4 w-16"
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button
              className="btn btn-outline btn-sm absolute bottom-3 right-5 h-4 w-16 bg-slate-300"
              onClick={handleSaveClick}
            >
              保存
            </Button>
          </div>
        </div>
      </Draggable>
    </PopoverContent>
  );

  return (
    <div className="mt-3 flex h-12 flex-wrap gap-4 border-2 border-stroke">
      <Popover placement="top" color="default" isOpen={isOpen}>
        <PopoverTrigger>
          <Button
            color="default"
            className="w-full capitalize"
            onClick={handleCreateClick}
          >
            {isSelectPerson}
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
}
