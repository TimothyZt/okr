"use server";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { getMeAction } from "../../../../features/users/server-actions/user";
import { notFound } from "next/navigation";
import ReportPanel from "../../../../features/okrs/components/report/report-panel";
import {
  getReportDataAction,
  getReportsAction,
} from "../../../../features/okrs/server-actions/actions";
import {
  ReportDataResponse,
  ReportRecordResponse,
} from "../../../../features/okrs/dtos/okr-dtos";
import { Me } from "../../../../features/users/dtos/users-dto";

export default async function PanelPage() {
  let me: Me;
  let data: ReportDataResponse;
  let OProgressAnalysis1: ReportRecordResponse[];
  let OProgressAnalysis2: ReportRecordResponse[];
  let OProgressAnalysis3: ReportRecordResponse[];
  let KRProgressAnalysis1: ReportRecordResponse[];
  let KRProgressAnalysis2: ReportRecordResponse[];
  let KRProgressAnalysis3: ReportRecordResponse[];
  let KRProgressAnalysis4: ReportRecordResponse[];
  try {
    const me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    data = unpackActionResponse(await getReportDataAction());
    OProgressAnalysis1 = unpackActionResponse(
      await getReportsAction("OProgressAnalysis1"),
    );
    OProgressAnalysis2 = unpackActionResponse(
      await getReportsAction("OProgressAnalysis2"),
    );
    OProgressAnalysis3 = unpackActionResponse(
      await getReportsAction("OProgressAnalysis3"),
    );
    KRProgressAnalysis1 = unpackActionResponse(
      await getReportsAction("KRProgressAnalysis1"),
    );
    KRProgressAnalysis2 = unpackActionResponse(
      await getReportsAction("KRProgressAnalysis2"),
    );
    KRProgressAnalysis3 = unpackActionResponse(
      await getReportsAction("KRProgressAnalysis3"),
    );
    KRProgressAnalysis4 = unpackActionResponse(
      await getReportsAction("KRProgressAnalysis4"),
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }

  return (
    <DefaultLayout me={me!}>
      <ReportPanel
        data={data}
        OProgressAnalysis1={OProgressAnalysis1}
        OProgressAnalysis2={OProgressAnalysis2}
        OProgressAnalysis3={OProgressAnalysis3}
        KRProgressAnalysis1={KRProgressAnalysis1}
        KRProgressAnalysis2={KRProgressAnalysis2}
        KRProgressAnalysis3={KRProgressAnalysis3}
        KRProgressAnalysis4={KRProgressAnalysis4}
      ></ReportPanel>
    </DefaultLayout>
  );
}
