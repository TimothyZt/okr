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
import { OrgChart } from "../../../baseInfo/dtos/baseinfo-dtos";
import UpdateEmployee from "./update/update-employee";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { deleteEmployeeAction } from "../../server-actions/actions";

interface Props {
  orgCharts: OrgChart[];
}
export default function SystemEmployeeContent({ orgCharts }: Props) {
  const handleRemoveClick = async (name: string, id: string) => {
    const isConfirmed = confirm("確定要刪除名爲" + name + "的員工信息嗎?");
    if (isConfirmed) {
      unpackActionResponse(await deleteEmployeeAction(id));
    }
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
                    公司名稱
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    姓名
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    員工編號
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    部門名稱
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    已分配的角色
                  </TableColumn>
                  <TableColumn className="overflow-hidden border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14 ">
                    操作
                  </TableColumn>
                </TableHeader>
                <TableBody className="">
                  {orgCharts.map((orgChart, key) => (
                    <TableRow key={key}>
                      <TableCell className="max-w-42.5 border-b-2 border-slate-200 text-center text-sm">
                        {orgChart! && orgChart.companyName}
                      </TableCell>
                      <TableCell className="max-w-18 border-b-2 border-slate-200 text-center text-sm">
                        {orgChart! && orgChart.emplName}
                      </TableCell>
                      <TableCell className="max-w-15 border-b-2 border-slate-200 text-center text-sm">
                        {orgChart! && orgChart.emplNum}
                      </TableCell>
                      <TableCell className="max-w-18 border-b-2 border-slate-200 text-center text-sm">
                        {orgChart! && orgChart.departmentName}
                      </TableCell>
                      <TableCell className="max-w-60 border-b-2 border-slate-200 text-center text-sm">
                        {orgChart! && orgChart.roles
                          ? orgChart.roles.map((x) => x.roleName).join("、")
                          : ""}
                      </TableCell>
                      <TableCell className="max-w-15 overflow-hidden border-b-2 border-slate-200 text-center text-sm">
                        <div className="flex  text-center">
                          {/* <UpdateEmployee orgChart={orgChart}/> */}
                          <button
                            onClick={()=>handleRemoveClick(
                              orgChart.emplName,
                              orgChart.emplId,
                            )}
                            className="btn btn-ghost btn-xs  text-center w-full inline-block rounded-none text-green-500"
                          >
                            刪除
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
