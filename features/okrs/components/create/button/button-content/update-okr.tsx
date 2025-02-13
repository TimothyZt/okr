import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import Draggable from "react-draggable";

export default function UpdateOKR() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="btn btn-ghost btn-success btn-sm relative left-5  top-0 flex w-30 rounded-md border-r  align-middle text-slate-400"
        onPress={onOpen}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="-3.12 -3.12 30.24 30.24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
              d="M1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22Z"
              fill="#525151"
            />{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.3056 1.87868C17.1341 0.707107 15.2346 0.707107 14.063 1.87868L3.38904 12.5526C2.9856 12.9561 2.70557 13.4662 2.5818 14.0232L2.04903 16.4206C1.73147 17.8496 3.00627 19.1244 4.43526 18.8069L6.83272 18.2741C7.38969 18.1503 7.89981 17.8703 8.30325 17.4669L18.9772 6.79289C20.1488 5.62132 20.1488 3.72183 18.9772 2.55025L18.3056 1.87868ZM15.4772 3.29289C15.8677 2.90237 16.5009 2.90237 16.8914 3.29289L17.563 3.96447C17.9535 4.35499 17.9535 4.98816 17.563 5.37868L15.6414 7.30026L13.5556 5.21448L15.4772 3.29289ZM12.1414 6.62869L4.80325 13.9669C4.66877 14.1013 4.57543 14.2714 4.53417 14.457L4.0014 16.8545L6.39886 16.3217C6.58452 16.2805 6.75456 16.1871 6.88904 16.0526L14.2272 8.71448L12.1414 6.62869Z"
              fill="#525151"
            />{" "}
          </g>
        </svg>
        修改OKR
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-90 w-150 rounded-md  border-2 border-slate-400 bg-white shadow-2xl"
      >
        <Draggable>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex h-13 flex-col gap-1 border-b-2 border-neutral-200  bg-slate-50">
                  KR完成度
                </ModalHeader>
                <ModalBody>
                  <div className="rounded--2xl absolute  right-0 h-full w-150 rounded-l-none bg-white">
                    <div className="ml-9 mt-3 flex">
                      <label className=" ml-5 mr-5 mt-2.5">當前進度 (%)</label>
                      <label className="input input-bordered flex w-100 items-center gap-2">
                        <input type="text" className="grow" placeholder="" />
                      </label>
                    </div>

                    <div className="ml-9 mt-5 flex">
                      <label className=" ml-5 mr-5 mt-5">更新説明</label>
                      <textarea
                        className="textarea textarea-bordered  w-8/12 border-2 border-stroke"
                        placeholder=""
                      ></textarea>
                    </div>
                    <div className="ml-9 mt-5 flex">
                      <label className=" ml-5 mr-5 mt-3">上傳附件</label>
                      <input
                        type="file"
                        className="file-input file-input-bordered w-100"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  {/* <Button className="btn btn-success absolute btn-ghost text-green-500 bottom-0 mb-4 left-6 w-25 btn-sm " onPress={onClose}>
                  更新记录
                </Button> */}
                  <Button
                    className="btn btn-success btn-sm absolute bottom-0 right-6 mb-4 w-25 text-white "
                    onPress={onClose}
                  >
                    取消
                  </Button>
                  <Button
                    className="btn btn-outline btn-success btn-sm absolute bottom-0 right-36 mb-4 w-25 bg-white "
                    onPress={onClose}
                  >
                    確認更新
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
