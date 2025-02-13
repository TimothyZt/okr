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
import { deleteUserCompanyAssignmentAction } from "../../server-actions/actions";
import { UserCompanyAssignmentReponse } from "../../dtos/system-dtos";

interface Props {
    userCompanyAssignments: UserCompanyAssignmentReponse[];
}
export default function SystemUserCompanyAssignmentContent({ userCompanyAssignments}: Props) {
  const handleRemoveClick = async (name: string, id: string) => {
    const isConfirmed = confirm("確定要刪除名爲" + name + "的員工信息嗎?");
    if (isConfirmed) {
      unpackActionResponse(await deleteUserCompanyAssignmentAction(id));
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
                    員工編號
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    姓名
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    角色分配
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14">
                    創建時間
                  </TableColumn>
                  <TableColumn className="overflow-hidden border-b-2 border-slate-200 bg-slate-50 text-center text-sm shadow-14 ">
                    操作
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {userCompanyAssignments.map((userCompanyAssignment, key) => (
                    <TableRow key={key}>
                      <TableCell className="max-w-42.5 border-b-2 border-slate-200 text-center text-sm">
                        {userCompanyAssignment! && userCompanyAssignment.companyName} 
                      </TableCell>
                   
                      <TableCell className="max-w-15 border-b-2 border-slate-200 text-center text-sm">
                        {userCompanyAssignment! && userCompanyAssignment.userEmplNum}
                      </TableCell>
                      <TableCell className="max-w-18 border-b-2 border-slate-200 text-center text-sm">
                        {userCompanyAssignment! && userCompanyAssignment.userName}
                      </TableCell>
                      <TableCell className="max-w-18 border-b-2 border-slate-200 text-center text-sm">
                        {userCompanyAssignment! && userCompanyAssignment.roleName}
                      </TableCell>
                      <TableCell className="max-w-18 border-b-2 border-slate-200 text-center text-sm">
                        {userCompanyAssignment! && userCompanyAssignment.createOn}
                      </TableCell>
            
                      <TableCell className="max-w-15 overflow-hidden border-b-2 border-slate-200 text-center text-sm">
                        <div className="flex">
                          {/* <UpdateEmployee userCompanyAssignments={userCompanyAssignments}/> */}
                          <button
                            onClick={()=>handleRemoveClick(
                              userCompanyAssignment.companyName,
                              userCompanyAssignment.id,
                            )}
                            className="btn btn-ghost btn-xs inline-block w-full rounded-none text-green-500"
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
