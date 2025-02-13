"use client";

import { Card, CardBody } from "@nextui-org/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tab, Tabs } from "@nextui-org/tabs";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import {
  deletePeriodAction,
  deleteUserCompanyAssignmentAction,
  putPeriodIsActiveAction,
} from "../../server-actions/actions";
import { PeriodDto } from "../../dtos/system-dtos";
import { useState } from "react";
import { Objective } from "../../../okrs/dtos/okr-dtos";
import { FeedbackResponse } from "../../../okrs/dtos/feedback-dtos";
import { Bounce, toast } from "react-toastify";

interface Props {
  periods: PeriodDto[];
  objectives: Objective[];
  fbs: FeedbackResponse[];
}
export default function SystemPeriodContent({
  periods,
  objectives,
  fbs,
}: Props) {
  const handleRemoveClick = async (id: string) => {
    const isConfirmed = confirm("確定要刪除這條時間設定嗎");
    const p = periods.find((x) => x.id === id);

    if (p?.sysCode === "年度") {
      if (objectives.find((x) => x.okrperiodId === id)) {
        toast.error("该時間設置涉及多條數據不允許刪除,若需要,請禁用它.", {
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
      } else {
        if (isConfirmed) {
          unpackActionResponse(await deletePeriodAction(id));
        }
      }
    }
    if (p?.sysCode === "季度: ") {
      let fbsInNotEmpty :FeedbackResponse[]=[];
      for (const fb of fbs) {
        if(fb.feedback === null || fb.feedback === undefined)
          {
            fbsInNotEmpty = fbs.concat(fb);
          }
      }
      const fb = fbsInNotEmpty.find((x) =>
        x.feedback !== null ? x.feedback?.okrPeriodId === id : "",
      );
      if (fb) {
        toast.error("该時間設置涉及多條數據不允許刪除,若需要,請禁用它.", {
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
      } else {
        if (isConfirmed) {
          unpackActionResponse(await deletePeriodAction(id));
        }
      }
    }
  };
  const [isActiv, setIsActive] = useState<boolean>(true);
  const handleSetIsActiveClick = async (id: string) => {
    if (isActiv) {
      unpackActionResponse(await putPeriodIsActiveAction(id, 0));
    } else {
      unpackActionResponse(await putPeriodIsActiveAction(id, 1));
    }
    setIsActive(!isActiv);
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="selfRating" title=" ">
          <Card>
            <CardBody className="h-150 w-full bg-white">
              <Table aria-label="Example static collection table" className="">
                <TableHeader>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50  text-center text-sm shadow-14">
                    所屬年度
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    時間類型
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    開始時間
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    截止時間
                  </TableColumn>
                  <TableColumn className="overflow-hidden border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14 ">
                    操作
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {periods.map((period, key) => (
                    <TableRow key={key}>
                      <TableCell className="max-w-42.5 border-b-2 border-slate-200 text-center text-sm">
                        {period! && period.okrYear}
                      </TableCell>
                      <TableCell className="max-w-15 border-b-2 border-slate-200 text-center text-sm">
                        {period! && period.sysCode}{" "}
                        {period.sysCode !== "year" ? period.sysCodeValue : ""}
                      </TableCell>
                      <TableCell className="max-w-18 border-b-2 border-slate-200 text-center text-sm">
                        {period! && period.startTime}
                      </TableCell>
                      <TableCell className="max-w-18 border-b-2 border-slate-200 text-center text-sm">
                        {period! && period.endTime}
                      </TableCell>
                      <TableCell className="max-w-15 overflow-hidden border-b-2 border-slate-200 text-center text-sm">
                        <div className="flex">
                          <button
                            onClick={() => handleRemoveClick(period.id)}
                            className="btn btn-ghost btn-xs inline-block w-6/12 rounded-none text-green-500"
                          >
                            刪除
                          </button>

                          <button
                            onClick={() => handleSetIsActiveClick(period.id)}
                            className={
                              period.isActive === 1
                                ? "btn btn-ghost btn-xs inline-block w-6/12 rounded-none text-green-500"
                                : "btn btn-ghost btn-xs inline-block w-6/12 rounded-none text-rose-700"
                            }
                          >
                            {period.isActive === 1 ? "激活" : "暫停"}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
