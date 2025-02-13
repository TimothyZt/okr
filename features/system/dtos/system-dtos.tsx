import { DateTime } from "next-auth/providers/kakao";
import { RoleDto } from "../../users/dtos/users-dto";
import { CalendarDate } from "@nextui-org/react";

export interface EmployeeRequest {
  departmentId: string;
  companyId: string;
  deptId: string;
  emplNum: string;
  emplName: string;
  roles: RoleDto[];
}

export interface UserCompanyAssignmentReponse {
  id: string;
  userId: string;
  userName: string;
  userEmplNum: string;
  companyName: string;
  companyId: string;
  createOn: string;
  roleName: string;
  roleId: string;
}

export interface PeriodDto {
  id:string,
  oKRPeriodType: string;
  sysCode: string;
  sysCodeValue: string;
  sysCodeValueName:string;
  okrYear: string;
  startTime: string;
  endTime: string;
  isDeleted: number;
  isActive: number;
}

export function userCompanyAssignmentsCacheTag() {
  return `/user-company-relations/`;
}

export function periodCacheTag() {
  return `/period-settings/`;
}
