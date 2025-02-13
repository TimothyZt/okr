"use client";
import React, { useState } from "react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { RatingRecordResponse } from "../../../../../dtos/feedback-dtos";
import RatingTableItem from "./rating-table-item";
import RatingLink from "./rating-link";
import RatingModal from "./modal/rating-modal";
import { PeriodDto } from "../../../../../../system/dtos/system-dtos";

interface RatingRecordsProps {
  ratingRecords: RatingRecordResponse[];
  currentPeriod: PeriodDto;
  systemPeriods: PeriodDto[];
  setRatingRecords: (rcs: RatingRecordResponse[]) => void;
}

export default function RatingTable({
  ratingRecords,
  currentPeriod,
  systemPeriods, setRatingRecords
}: RatingRecordsProps) {
  // const [ratingRecordss, setRatingRecordss] =
  //   useState<RatingRecordResponse[]>(ratingRecords); 
  return (
    <>
      <Tabs aria-label="Options">
        <Tab key="selfRating" title=" ">
          <Card>
            <CardBody className="max-h-500 w-full bg-white">
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black shadow-14">
                    目標(O)
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black  shadow-14">
                    OKR所属公司
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black  shadow-14">
                    目標責任人
                  </TableColumn>

                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black shadow-14">
                    第一季度評分
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black shadow-14">
                    第二季度評分
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black shadow-14">
                    第三季度評分
                  </TableColumn>
                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black shadow-14">
                    第四季度評分
                  </TableColumn>

                  <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-base text-black shadow-14 ">
                    操作
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {ratingRecords.map((rating, key) => (
                    <TableRow key={key}>
                      <TableCell className="border-b-2 border-slate-200 text-base">
                        {rating.oDescription}
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-base">
                        {rating.companyName}
                      </TableCell>
                      <TableCell className="border-b-2 border-slate-200 text-base">
                        {rating.belongToEmplName}
                      </TableCell>

                      <TableCell
                        className={
                          rating.springScore === "rating"
                            ? "border-b-2 border-slate-200 text-base text-rose-500"
                            : "border-b-2 border-slate-200 text-base text-green-500"
                        }
                      >
                        {rating.springScore === "rating"
                          ? "未评"
                          : rating.springScore}
                      </TableCell>

                      <TableCell
                        className={
                          rating.summerScore === "rating"
                            ? "border-b-2 border-slate-200 text-base text-rose-500"
                            : "border-b-2 border-slate-200 text-base text-green-500"
                        }
                      >
                        {rating.summerScore === "rating"
                          ? "未评"
                          : rating.summerScore}
                      </TableCell>

                      <TableCell
                        className={
                          rating.autumnScore === "rating"
                            ? "text-red-500 border-b-2 border-slate-200 text-base text-rose-500"
                            : "border-b-2 border-slate-200 text-base text-green-600"
                        }
                      >
                        {rating.autumnScore === "rating"
                          ? "未评"
                          : rating.autumnScore}
                      </TableCell>
                      <TableCell
                        className={
                          rating.winterScore === "rating"
                            ? "border-b-2 border-slate-200 text-base text-rose-500"
                            : "border-b-2 border-slate-200 text-base text-green-500"
                        }
                      >
                        {rating.winterScore === "rating"
                          ? "未评"
                          : rating.winterScore}
                      </TableCell>

                      <TableCell className="border-b-2 border-slate-200 text-base">
                        <div>
                          {/* <RatingLink
                            objectiveId={rating.objectiveId}
                          ></RatingLink> */}
                          <RatingModal
                            systemPeriods={systemPeriods}
                            objectiveId={rating.objectiveId}
                            setRatingRecordss={ setRatingRecords}
                            ></RatingModal>
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
    </>
  );
}
