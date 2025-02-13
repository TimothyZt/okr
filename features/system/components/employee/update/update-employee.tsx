import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Draggable from "react-draggable";
import { Department, OrgChart } from "../../../../baseInfo/dtos/baseinfo-dtos";
import { input } from "@nextui-org/react";
import DeptInCharge from "../../../../baseInfo/components/department/departInCharge";

interface Props {
    orgChart :OrgChart 
}

export default function UpdateEmployee({ orgChart }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [org,setOrg] = useState<OrgChart>(orgChart);
  const [personInCharge, setPersonInCharge] = useState<OrgChart>(); //PersonInCharge
  const [departmentInCharge, setDepartmentInCharge] = useState<Department[]>();

  return (
    <>
      <button onClick={onOpenChange} className="btn inline-block btn-xs btn-ghost text-green-500 rounded-none">
        修改
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
                  <h1 className="ml-2">修改人員信息</h1>
                </ModalHeader>
                <ModalBody className="flex  justify-center">
                  <div className="rounded--2xl absolute right-0 h-full w-150 overflow-y-auto rounded-l-none bg-white ">
                  <div className="mt-3">
                      <div className="flex">
                        <div className="ml-8 mt-5 w-4/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            公司名
                          </label>
                          <input
                            type="text"
                            value={orgChart.companyName}
                            className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                          />
                          </div>
                          <div className="ml-8 mt-5 w-4/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            姓名
                          </label>
                          <input
                            type="text"
                            value={orgChart.emplName}
                            className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white   dark:disabled:bg-black"
                          />
                          </div>
                      </div>

                      <div className="flex">
                 
                      <div className="ml-6 mt-5 w-5/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          指派
                        </label>
                        <DeptInCharge
                            deptInCharge={departmentInCharge!}
                            setDeptInCharge={setDepartmentInCharge}
                            btnCss={
                              "btn h-10 btn-xs w-full border-lg border-stroke bg-white"
                            }
                            btnDesc={departmentInCharge === undefined ?"指派":departmentInCharge.map((x) => x.name).join("、")}
                          ></DeptInCharge>
                      </div>
                          <div className="ml-8 mt-5 w-4/12">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            姓名
                          </label>
                          <input
                            type="text"
                            value={orgChart.emplName}
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
