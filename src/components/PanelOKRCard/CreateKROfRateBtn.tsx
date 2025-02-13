import { Card, CardBody } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import { getReportsAction } from "../../../features/okrs/server-actions/actions";
import { ReportRecordResponse } from "../../../features/okrs/dtos/okr-dtos";
import { CircularProgress } from "@nextui-org/progress";
interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  krCompletedValue:number;
}
const CreateKROfRateBtn = (props: Props) => {
  const [records, setRecord] = useState<ReportRecordResponse[]>([]);
  const handleDataClick = async () => {
    props.onOpenChange();
    setRecord(unpackActionResponse(await getReportsAction("AverageKRProgress")));
  };
  return (
    <>
      <button className="w-3/12" onClick={handleDataClick}>
        <Card className="w-12/12 ml-1 mt-5 h-40 bg-white shadow-14">
          <CardBody className="overflow-visible p-0">
            <div className=" mt-6 justify-center">
              <CircularProgress
                classNames={{
                  svg: "w-24 h-24 drop-shadow-sm ",
                  indicator: "stroke-primary",
                  track: "stroke-black/10",
                  // value: "text-xs  font-semibold text-black",
                }}
                className="ml-30"
                value={props.krCompletedValue}
                strokeWidth={2}
                showValueLabel={true}
              />
              <div className="ml-27 flex">
                <label className="">關鍵結果完成度</label>
                <div className="ml-1 mt-1">
                  <svg
                    width="15px"
                    height="15px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.83834 14.1056 10.6796 13.3353 11.1354C13.1385 11.2518 12.9761 11.3789 12.8703 11.5036C12.7675 11.6246 12.75 11.7036 12.75 11.75V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V11.75C11.25 11.2441 11.4715 10.8336 11.7266 10.533C11.9786 10.236 12.2929 10.0092 12.5715 9.84439C12.9044 9.64739 13.125 9.28655 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                        fill="#1C274C"
                      />{" "}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </button>
      <div>
        <Modal
          isOpen={props.isOpen}
          onOpenChange={props.onOpenChange}
          // className="bg-white w-230 h-150  shadow-2xl rounded-md"
          className="h-125 w-230 rounded-md  border-2 border-slate-400  bg-slate-100 shadow-2xl"
        >
          <Draggable>
            <ModalContent className="">
              {(onClose) => (
                <>
                  <ModalHeader className="mb-1  flex gap-1 border-b-2 border-slate-400">
                    <h1 className="ml-2">{props.title}</h1>
                    <div className="block">
                      {/* <Button className="btn btn-outline h-4  ml-3 absolute right-10 text-green-500 w-20  btn-xs" onPress={onClose}>
                    關閉
                  </Button> */}
                    </div>
                  </ModalHeader>
                  <ModalBody className="flex overflow-y-auto">
                    <Card className="">
                      <CardBody className="border-2 border-stroke bg-white">
                        <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                              序號
                            </TableColumn>
                            <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                              公司名稱
                            </TableColumn>
                            <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                              負責人工號
                            </TableColumn>
                            <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                              負責人姓名
                            </TableColumn>
                            <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                              O目標
                            </TableColumn>
                            <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                              KR關鍵結果
                            </TableColumn>
                          </TableHeader>
                          <TableBody>
                          {records.map((value, key) => (
                               <TableRow key="1">
                               <TableCell className="border-b-2 border-slate-200 text-sm">
                                 {value.sortId}
                               </TableCell>
                               <TableCell className="border-b-2 border-slate-200 text-sm">
                                {value.companyName}
                               </TableCell>
                               <TableCell className="border-b-2 border-slate-200 text-sm">
                                 {value.emplNum}
                               </TableCell>
                               <TableCell className="border-b-2 border-slate-200 text-sm">
                                 {value.emplName}
                               </TableCell>
 
                               <TableCell className="border-b-2 border-slate-200 text-sm">
                                 {value.krDesc}
                               </TableCell>
                               <TableCell className="border-b-2 border-slate-200 text-sm">
                                 {value.krProgress}
                               </TableCell>
                             </TableRow>
                          ))}
                         
                          </TableBody>
                        </Table>
                      </CardBody>
                    </Card>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Draggable>
        </Modal>
      </div>
    </>
  );
};

export default CreateKROfRateBtn;
