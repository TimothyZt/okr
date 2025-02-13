import { cookies } from "next/headers";
import { appFetch } from "../../../lib/request/fetch";
import {
  employeeFileLink,
  employeeLink,
  employeePostLink,
  periodByIdLink,
  periodLink,
  userCompanyAssignmentLink,
  userCompanyAssignmentsLink,
} from "./api-urls";
import {
  EmployeeRequest,
  periodCacheTag,
  PeriodDto,
  UserCompanyAssignmentReponse,
  userCompanyAssignmentsCacheTag,
} from "../dtos/system-dtos";
import {
  orgChartCacheTag,
  OrgChartRequest,
} from "../../baseInfo/dtos/baseinfo-dtos";
import { revalidateTag } from "next/cache";
import { CalendarDate } from "@nextui-org/react";
import { Bounce, toast } from "react-toastify";
import {
  getAuditO_RecordsAction,
  getAuditOSubmittedResponsesAction,
} from "../../okrs/server-actions/actions";
import { unpackActionResponse } from "../../../lib/server-actions/action-response";
import { getPeriodAction } from "../server-actions/actions";
import {
  auditingFilter,
  completedListFilter,
} from "../../okrs/components/audit/audit-extension/audit-extension";
import { Me } from "../../users/dtos/users-dto";
import { Audit_OResponse } from "../../okrs/dtos/audit-dtos";

export async function postEmployeeFile(formData: FormData): Promise<string[]> {
  const response = await appFetch(employeeFileLink(), {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: formData,
  });
  revalidateTag(orgChartCacheTag());
  return response.json();
}

export async function postEmployee(request: EmployeeRequest): Promise<void> {
  await appFetch(employeePostLink(), {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(orgChartCacheTag());
}

export async function putEmployee(
  id: string,
  request: OrgChartRequest,
): Promise<void> {
  await appFetch(employeeLink(id), {
    method: "PUT",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(orgChartCacheTag());
}

export async function deleteEmployee(id: string): Promise<void> {
  await appFetch(employeeLink(id), {
    method: "delete",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(id),
  });
  revalidateTag(orgChartCacheTag());
}

export async function postUserCompanyAssignmentsFile(
  formData: FormData,
): Promise<string[]> {
  const response = await appFetch(userCompanyAssignmentsLink(), {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: formData,
  });
  revalidateTag(userCompanyAssignmentsCacheTag());
  return response.json();
}

export async function deleteUserCompanyAssignment(id: string): Promise<void> {
  await appFetch(userCompanyAssignmentLink(id), {
    method: "DELETE",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(id),
  });
  revalidateTag(userCompanyAssignmentsCacheTag());
}

export async function getUserCompanyAssignments(): Promise<
  UserCompanyAssignmentReponse[]
> {
  const response = await appFetch(userCompanyAssignmentsLink(), {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
    next: { tags: [userCompanyAssignmentsCacheTag()] },
  });
  return response.json();
}

export async function postPeriod(request: PeriodDto): Promise<void> {
  const response = await appFetch(periodLink(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(periodCacheTag());
}

export async function getPeriods(): Promise<PeriodDto[]> {
  const response = await appFetch(periodLink(), {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Cookie: cookies().toString(),
    },
    next: { tags: [periodCacheTag()] },
  });
  return response.json();
}

export async function putPeriodIsActive(
  id: string,
  isActive: number,
): Promise<void> {
  const response = await appFetch(periodByIdLink(id), {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(isActive),
  });
  revalidateTag(periodCacheTag());
}

export async function deletePeriod(id: string): Promise<void> {
  const response = await appFetch(periodByIdLink(id), {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  revalidateTag(periodCacheTag());
}

