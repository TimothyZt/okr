import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Draggable from "react-draggable";
import { KeyResult } from "../../../dtos/okr-dtos";

interface Props {
  btnName: string;
  kr: KeyResult;
}
export default function KRDetail({ btnName,kr }: Props) {
  let departs = "";
  if(kr.belongToDepartment1Name !== undefined)
  {
    departs = kr.belongToDepartment1Name;    
  }
  if(kr.belongToDepartment2Name !== undefined || kr.belongToDepartment2Name !== "")
  {
    departs = kr.belongToDepartment1Name+","+kr.belongToDepartment2Name;
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="btn btn-ghost btn-xs inline-block rounded-none text-green-500"
      >
        詳情
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // className="bg-white w-230 h-150  shadow-2xl rounded-md"
        className="z-999999 h-125 w-150  rounded-md border-2 border-slate-400 bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <ModalHeader className="mb-15  flex gap-1 border-b-2 border-slate-400">
                  <h1 className="ml-2">KR詳情</h1>
                  <div className="block"></div>
                </ModalHeader>
                <ModalBody className="flex  justify-center" aria-disabled>
                  <div className="rounded--2xl absolute right-0 h-full w-150 rounded-l-none bg-white ">
                    <div className="mt-3">
                      <div className="ml-6 mt-5 w-11/12">
                        <label className="block pb-3 text-sm font-medium  text-black dark:text-white">
                          關鍵結果(KR)描述
                        </label>
                        <textarea
                          rows={6}
                          placeholder={kr.description}
                          disabled
                          className="w-full h-27 rounded-lg border-[1.5px] border-stroke bg-transparent  p-3  text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                        ></textarea>
                      </div>
                      <div className="ml-6 mt-2 flex w-11/12">
                        <div className=" mr-3 w-8/12">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            指派部門
                          </label>

                          <input
                            type="text"
                            placeholder={departs}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div>

                        <div className="ml-3 w-4/12">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            KR類型
                          </label>

                          <input
                            type="text"
                            placeholder={kr.krType}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div>
                      </div>
                      <div className="ml-6 mt-2 flex w-11/12">
                      {/* <div className="mt-3 w-4/12 mr-6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            KR负责人
                          </label>

                          <input
                            type="text"
                            placeholder={}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div> */}
                        <div className="mt-3 w-4/12 mr-3">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            权重(%)
                          </label>

                          <input
                            type="text"
                            placeholder={kr.weight?.toString()}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
                        </div>
                      <div className="mt-3 ml-3 w-4/12">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            完成度(%)
                          </label>

                          <input
                            type="text"
                            placeholder={kr.progress}
                            disabled
                            className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                          />
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
