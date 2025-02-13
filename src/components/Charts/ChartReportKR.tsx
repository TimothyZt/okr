import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tab, Tabs } from "@nextui-org/tabs";
import React from "react";
import Draggable from "react-draggable";
import { ReportRecordResponse } from "../../../features/okrs/dtos/okr-dtos";
interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  records:ReportRecordResponse[];
}
const ChartReportKR = (props: Props) => {
    props.records.forEach((record, index) => {
    record.sortId = index + 1;
  });
  props.records.sort((a, b) => a.sortId - b.sortId);
  return (
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
                <ModalBody className="flex overflow-auto">
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
                            負責人
                          </TableColumn>
                          <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                            O目標
                          </TableColumn>
                          <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                            KR關鍵結果
                          </TableColumn>
                          <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                            KR進度
                          </TableColumn>
                          <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                            KR評分
                          </TableColumn>
                        </TableHeader>
                        <TableBody>
                          {props.records.map((value, key) => (
                            <TableRow key={key}>
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
                                {value.oDesc}
                              </TableCell>
                              <TableCell className="border-b-2 border-slate-200 text-sm">
                                {value.krDesc}
                              </TableCell>
                              <TableCell className="border-b-2 border-slate-200 text-sm">
                                {value.krProgress}
                              </TableCell>
                              <TableCell className="border-b-2 border-slate-200 text-sm">
                                {value.krScore}
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
  );
};

export default ChartReportKR;
