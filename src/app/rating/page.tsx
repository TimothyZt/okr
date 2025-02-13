"use server";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RatingHeader from "../../../features/okrs/components/create/button/button-content/rating/rating-header";
import RatingTable from "../../../features/okrs/components/create/button/button-content/rating/rating-table";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import { getRaingRecordsResponsesAction } from "../../../features/okrs/server-actions/actions";
import { getMeAction } from "../../../features/users/server-actions/user";
import { notFound, redirect } from "next/navigation";
import { Me } from "../../../features/users/dtos/users-dto";
import { RatingRecordResponse } from "../../../features/okrs/dtos/feedback-dtos";
import RatingTableContainer from "../../../features/okrs/components/create/button/button-content/rating/rating-table-container";
import { PeriodDto } from "../../../features/system/dtos/system-dtos";
import { getCurrentSystemPeriod } from "../../../features/system/extension/system-extension";
import { getPeriodAction } from "../../../features/system/server-actions/actions";
import { FilterCompaniesDtos } from "../../../features/baseInfo/dtos/baseinfo-dtos";
import { getFilterDepartmentsAction } from "../../../features/baseInfo/server-actions/baseinfo";

export default async function RatingPage() {
  let me: Me;
  let ratingRecords: RatingRecordResponse[];
  let currentSystemPeriod: PeriodDto;
  let systemPeriods: PeriodDto[] = [];
  let filterCompanyDtos: FilterCompaniesDtos;

  try {
    me = unpackActionResponse(await getMeAction());
    if (me === null) notFound();
    if (!me.roles.find((x) => x.roleName === "HeadCompanyResponsiblePerson")) {
      redirect("/create/myokr");
    }
    ratingRecords = unpackActionResponse(
      await getRaingRecordsResponsesAction(),
    );
    filterCompanyDtos = unpackActionResponse(
          await getFilterDepartmentsAction(),
        );
    systemPeriods = unpackActionResponse(await getPeriodAction());
    currentSystemPeriod = systemPeriods.find(
      (x) =>
        x.okrYear === new Date().getFullYear().toString() &&
        x.sysCode === "年度",
    )!;
  } catch (error) {
    console.log(error);
    return notFound();
  }

  return (
    <RatingTableContainer
      me={me}
      ratingRecords={ratingRecords.filter(
        (x) => x.okrPeriodId === currentSystemPeriod.id,
      )}
      systemPeriods={systemPeriods}
      currentSystemPeriod={currentSystemPeriod}
      filterCompanyDtos={filterCompanyDtos}
    />
  );
}
