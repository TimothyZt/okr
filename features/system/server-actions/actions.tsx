"use server";
import { packActionResponse } from "../../../lib/server-actions/action-response";
import { OrgChartRequest } from "../../baseInfo/dtos/baseinfo-dtos";
import { EmployeeRequest, PeriodDto } from "../dtos/system-dtos";
import {
  deleteEmployee,
  deletePeriod,
  deleteUserCompanyAssignment,
  getPeriods,
  getUserCompanyAssignments,
  postEmployee,
  postEmployeeFile,
  postPeriod,
  postUserCompanyAssignmentsFile,
  putEmployee,
  putPeriodIsActive,
} from "../services/system";

export async function postEmployeeFileAction(formData: FormData) {
  return await packActionResponse(postEmployeeFile(formData));
}

export async function postEmployeeAction(request: EmployeeRequest) {
  return await packActionResponse(postEmployee(request));
}

export async function putEmployeeAction(id: string, request: OrgChartRequest) {
  return await packActionResponse(putEmployee(id, request));
}

export async function deleteEmployeeAction(id: string) {
  return await packActionResponse(deleteEmployee(id));
}

export async function postUserCompanyAssignmentsFileAction(formData: FormData) {
  return await packActionResponse(postUserCompanyAssignmentsFile(formData));
}

export async function deleteUserCompanyAssignmentAction(id: string) {
  return await packActionResponse(deleteUserCompanyAssignment(id));
}

export async function getUserCompanyAssignmentsAction() {
  return await packActionResponse(getUserCompanyAssignments());
}

export async function postPeriodAction(request :PeriodDto) {
  return await packActionResponse(postPeriod(request));
}

export async function getPeriodAction() {
  return await packActionResponse(getPeriods());
}

export async function putPeriodIsActiveAction(id:string,isActive:number) {
  return await packActionResponse(putPeriodIsActive(id,isActive));
}

export async function deletePeriodAction(id:string) {
  return await packActionResponse(deletePeriod(id));
}
