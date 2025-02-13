import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Selection,
} from "@nextui-org/react";
import Draggable from "react-draggable";
import { Department, TreeNode } from "../../dtos/baseinfo-dtos";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getDepartmentsAction } from "../../server-actions/baseinfo";
import TreeNodeComponent from "./departInCharge-tree";

interface Props {
  btnCss: string;
  deptInCharge: Department[];
  setDeptInCharge: (dept: Department[]) => void;
  btnDesc: string; //區分new-kr 和 指派的
}
export default function DeptInCharge({
  setDeptInCharge,
  btnCss,
  btnDesc,
  deptInCharge,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [department, setDepartment] = useState<Department[]>();
  const [treeNode, setTreeNode] = useState<TreeNode[]>();
  const handleCancel = () => {
    setIsOpen(false);
  };
  const [isSaved, setIsSaved] = useState(false);
  const [isSelectDept, setIsSelectDept] = useState<string[]>([]);
  const handleCreateClick = async () => {
    var departmentsList = unpackActionResponse(await getDepartmentsAction());
    setDepartment(departmentsList.departments);
    setTreeNode(departmentsList.treeNodes);
    setIsSelectDept([]);
    setIsOpen(true);
  };
  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    const selectDept = department!.filter((x) => isSelectDept.includes(x.id));
    setDeptInCharge(selectDept!);
    setIsOpen(false);
  };
  const content = (
    <PopoverContent>
      <Draggable>
        <div className="h-125  w-125 columns-1 border-2 bg-white shadow-2xl ">
          <div className="h-10 w-full border-b-2 border-slate-300 bg-slate-50 shadow-14">
            <div className="relative left-7 top-1.5 text-black">選擇部門</div>
          </div>

          <div className="h-auto w-full bg-white">
      
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
                      <TreeNodeComponent
                        node={node}
                        isSelectDept={isSelectDept}
                        setIsSelectDept={setIsSelectDept}
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
           {
            btnDesc
           }

          </Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
}
