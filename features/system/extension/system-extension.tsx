import { CalendarDate } from "@nextui-org/react";
import { PeriodDto } from "../dtos/system-dtos";
import { toast, Bounce } from "react-toastify";
import { Me } from "../../users/dtos/users-dto";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import { completedListFilter, auditingFilter } from "../../okrs/components/audit/audit-extension/audit-extension";
import { Audit_OResponse } from "../../okrs/dtos/audit-dtos";
import { getAuditO_RecordsAction, getAuditOSubmittedResponsesAction } from "../../okrs/server-actions/actions";
import { getPeriodAction } from "../server-actions/actions";

export default function ensurePeriodIsHavePermission(
  year:string,
  systemPeriods: PeriodDto[],
): boolean {
  var currentSystemPeriodInActive = systemPeriods.find(
    (x) =>
      x.okrYear === year &&
      x.isActive === 1 &&
      new Date(x.endTime) > new Date()&&
      new Date(x.startTime) < new Date(),
  );
    var currentSystemPeriodInActive = systemPeriods.find(
    (x) =>
      x.okrYear === new Date().getFullYear().toString() &&
      x.isActive === 1 
  );
  if (currentSystemPeriodInActive === undefined) {
    toast.error("這個OKR操作時間已過期!", {
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
    return false;
  }
  return true;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份從0開始，所以需要+1
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function convertToDotNetDateTime(date: CalendarDate): string {
  const dateObj = new Date(date.year, date.month - 1, date.day);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00`;
}

export function convertDatetimeInDotNetToNextJSDate(
  dotnetDateTime: string,
): Date {
  const parseDate = (dateStr: string): string => {
    let [datePart, timePart] = dateStr.split(" ");
    let [day, month, year] = datePart.split("/");

    let newDateStr = `${month}/${day}/${year} ${timePart}`;

    return newDateStr;
  };
  const backendTime = parseDate(dotnetDateTime);
  return new Date(backendTime);
}

export function getCurrentSystemPeriod(
  systemPeriods: PeriodDto[],
){
  
  var  currentYear= new Date().getFullYear().toString();
  const systemPeriodsByYearInSeason = systemPeriods.filter(
    (x) => x.okrYear === currentYear,
  );
  
  const currentTime = formatDate(new Date());
  const currentSystemPeriod = systemPeriodsByYearInSeason.find(
    (x) =>
      convertDatetimeInDotNetToNextJSDate(x.startTime) <=
        new Date(currentTime) &&
      new Date(currentTime) <= convertDatetimeInDotNetToNextJSDate(x.endTime) &&
      x.sysCode === "季度: ",
  );

  // const currentSystemPeriod = systemPeriodsByYearInSeason.find(
  //   (x) =>
  //     new Date(x.startTime) <=
  //       new Date(currentTime) &&
  //     new Date(currentTime) <= new Date(x.endTime) &&
  //     x.sysCode === "季度: ",
  // );

  return currentSystemPeriod;
}

export function getCurrentSystemPeriodByOKRPeriodId(
  systemPeriods: PeriodDto[],
  okrperiodId: string,
): PeriodDto | undefined {
  const systemPeriodsByOInYear = systemPeriods.find(
    (x) => x.id === okrperiodId,
  );
  const systemPeriodsByYearInSeason = systemPeriods.filter(
    (x) => x.okrYear === systemPeriodsByOInYear?.okrYear,
  );
  const currentTime = formatDate(new Date());
  const currentSystemPeriod = systemPeriodsByYearInSeason.find(
    (x) =>
      convertDatetimeInDotNetToNextJSDate(x.startTime) <=
        new Date(currentTime) &&
      new Date(currentTime) <= convertDatetimeInDotNetToNextJSDate(x.endTime) &&
      x.sysCode === "季度: ",
  );
  return currentSystemPeriod;
}

// export const convertToDotNetDateTime = (date: CalendarDate): string => {
//   const dateObj = new Date(date.year, date.month - 1, date.day);
//   const year = dateObj.getFullYear();
//   const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
//   const day = String(dateObj.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}T00:00:00`;
// };

export async function reloadAuditOReponses(
  selectSystemPeriodId: string,
  me: Me,
  setCompletedList: (auditOs:Audit_OResponse[]) => void,
  setAuditingList: (auditOs:Audit_OResponse[]) => void,
  setSubmittedAuditOs: (auditOs:Audit_OResponse[]) => void,
) {
  const newAuditObjectives = unpackActionResponse(
    await getAuditO_RecordsAction(),
  ).filter((x) => x.objective.okrperiodId === selectSystemPeriodId);
  const submittedAuditOs = unpackActionResponse(
    await getAuditOSubmittedResponsesAction(),
  );
  
  const systemPeriods = unpackActionResponse(await getPeriodAction());
  const auditObjetivesSubmitted = submittedAuditOs!.filter(
    (x) =>
      x.objective.okrperiodId ===selectSystemPeriodId,
  );
  const auditObsInYear = newAuditObjectives.filter(
    (x) => x.objective.okrperiodId === selectSystemPeriodId,
  );

  setCompletedList(completedListFilter(me, auditObsInYear));
  setAuditingList(auditingFilter(me, auditObsInYear));
  setSubmittedAuditOs(auditObjetivesSubmitted);
}

