"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Selection,
} from "@nextui-org/react";
import Draggable from "react-draggable";
import {
  Department,
  DepartmentDto,
  TreeNode,
} from "../../../../../baseInfo/dtos/baseinfo-dtos";
import { getDepartmentsAction } from "../../../../../baseInfo/server-actions/baseinfo";
import { unpackActionResponse } from "../../../../../../lib/server-actions/action-response";
import BelongToCompanyData from "./belong-company-data";

interface Props {
  btnCss: string;
  setCompanyInCharge: (dept: Department) => void;
  btsDesc:string;
  isCustomData:boolean;
  customData?:DepartmentDto;
}
export default function OBelongToCompany({
  setCompanyInCharge,
  btnCss,
  btsDesc,
  isCustomData,
  customData,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState<Department[]>();
  const [treeNode, setTreeNode] = useState<TreeNode[]>();
  const handleCancel = () => {
    setIsOpen(false);
  };
  const [isSaved, setIsSaved] = useState(false);
  const [isSelectCompany, setIsSelectCompany] = useState<string[]>();
  const handleCreateClick = async () => {
    let treeNodes1 :TreeNode[] = [];
    let treeNodes2 :TreeNode[] = [];
    if(isCustomData && customData !== null)
      {
        const firstTreeNode = customData?.treeNodes?.[0];
        treeNodes1.push(firstTreeNode!)
          setCompany(customData?.departments);
          setTreeNode(treeNodes1);

        setIsSelectCompany([]);   
      }else
      {
        var departmentsList = unpackActionResponse(await getDepartmentsAction());
        const firstTreeNode = departmentsList?.treeNodes?.[0];
        treeNodes2.push(firstTreeNode!)
        setCompany(departmentsList.departments);
        setTreeNode(treeNodes2);
        setIsSelectCompany([]);        
      }
 
    setIsOpen(true);
  };
  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    const selectCompany = company!.find((x) => isSelectCompany?.includes(x.id));
    setCompanyInCharge(selectCompany!);
    setIsOpen(false);
  };

  const content = (
    <PopoverContent >
      <Draggable>
        <div className="h-125  w-125 columns-1 border-2 bg-white shadow-2xl ">
          <div className="h-10 w-full border-b-2 border-slate-300 bg-slate-50 shadow-14">
            <div className="relative left-7 top-1.5 text-black">選擇部門</div>
          </div>

          <div className="h-auto w-full  bg-white">
            {/* <div>
              <label className="input input-bordered ml-4 mt-3 flex  h-8 w-11/12 items-center gap-2 border-slate-400 ">
                <input type="text" className="grow" placeholder="搜索部門" />
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
              </label>
            </div> */}
            <div className="mt-3 w-full  border-slate-300 bg-white  shadow-md">
              {/* <DeptInChargeListBox
                departments={department}
                values={values}
                setValues={setValues}
              /> */}
              {treeNode && treeNode.length > 0 && (
                <ul style={{ maxHeight: "350px", overflowY: "auto" }}>
                  {treeNode.map((node, index) => (
                    <li
                      key={index}
                      className="border-b-2 border-stroke"
                      //
                    >
                      <BelongToCompanyData
                        node={node}
                        isSelectCompany={isSelectCompany!}
                        setIsSelectCompany={setIsSelectCompany}
                      />
                    </li>
                  ))}
                </ul>
              )}
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
    <div className="flex justify-center">
      <Popover placement="top" color="default" isOpen={isOpen}>
        <PopoverTrigger>
          <Button
            color="default"
            onClick={handleCreateClick}
            className={btnCss}
          >
            {btsDesc}
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
}
