"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const ReportPage = () => {
  return (
    <DefaultLayout>
      <div className="flex h-screen w-full flex-col">
        <button className="btn btn-success btn-sm absolute  right-8 w-27 rounded-md  bg-teal-600 text-white">
          下載報表
        </button>

        <div className="dropdown dropdown-hover absolute right-37.5 h-10">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm w-32 rounded-md bg-white"
          >
            2024年 6月
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-32 bg-base-100 p-2 text-center shadow"
          >
            <li>
              <Link href="#">2024年 7月</Link>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-hover absolute right-73 h-10">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm  w-32 rounded-md bg-white "
          >
            中華商務聯合
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-32 bg-base-100 p-2  text-center shadow"
          >
            <li>
              <Link href="#">其他</Link>
            </li>
          </ul>
        </div>

        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0  border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12 ml-6",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
        >
          <Tab key="company" title="公司">
            <Card>
              <CardBody className="h-screen w-full bg-white">
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      公司名
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      負責人
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      負責人數
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      OKR縂數量
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      未制定人數
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      未對齊人數
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      近7天未更新的人員數量
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      未自評人數
                    </TableColumn>
                    <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                      未上評人數
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        中華商務聯合印刷
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        {" "}
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        0
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        中華商務聯合印刷
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        {" "}
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        0
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-sm">
                        13
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="detail" title="詳情">
            <Card>
              <CardBody>
                <div className="h-16 w-full bg-white">
                  <div className="flex w-full">
                    <label className="ml-10 mt-6 w-60 text-sm ">人員：</label>
                    <input
                      type="text"
                      placeholder="請输入"
                      className="input input-bordered  ml-5 mt-3 h-10 w-full max-w-xs"
                    />

                    <label className="ml-15 mt-6 w-60 text-sm">目標：</label>
                    <input
                      type="text"
                      placeholder="請輸入"
                      className="input input-bordered ml-5 mt-3 h-10 w-full max-w-xs"
                    />
                    <button className="btn btn-outline btn-success btn-sm ml-10 mt-3  w-25 bg-white ">
                      查看
                    </button>
                    <button className="btn btn-success btn-sm ml-10 mr-5 mt-3  w-25 text-white ">
                      重置
                    </button>
                  </div>
                </div>
                <Card>
                  <CardBody className="mt-5 h-screen w-full bg-white">
                    <Table
                      aria-label="Example static collection table"
                      className="overflow-x-auto"
                    >
                      <TableHeader>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          人員
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          所屬部门
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          目標(O)内容
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          {" "}
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          目標(O)進度
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          目標(O)自評分數
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          目標(O)上評分數
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          目標(O)最終得分
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          對齊的(O)目標
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          {" "}
                        </TableColumn>
                        <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
                          關鍵結果(KR)的内容
                        </TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            Test
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            Test
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            O1
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            {" "}
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            0
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            0
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            0
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            0
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            13
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            {" "}
                          </TableCell>
                          <TableCell className="border-b-2 border-slate-200 text-sm">
                            13
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default ReportPage;
