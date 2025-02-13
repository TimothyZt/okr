"use server";
import { packActionResponse } from "../../../lib/server-actions/action-response";
import { OrgChartRequest } from "../dtos/baseinfo-dtos";
import {
  getCurrentPeriod,
  getDepartments,
  getDepartmentsInCompanyCode,
  getFilterDepartments,
  getIndicatorSource,
  getKRType,
  getOneOrgChart,
  getOrgChart,
  getOrgChartInDept,
  getOrgChartInEmplNum,
  getPeriod,
  getStrategicThemes,
} from "../services/baseinfo";

export async function getStrategicThemesAction(okrPeriodId:string) {
  return await packActionResponse(getStrategicThemes(okrPeriodId));
}

export async function getIndicatorSourceAction() {
  return await packActionResponse(getIndicatorSource());
}

export async function getKRTypeAction() {
  return await packActionResponse(getKRType());
}

export async function getOrgChartAction() {
  return await packActionResponse(getOrgChart());
}

export async function getOrgChartInDeptAction(deptCode:string) {
  return await packActionResponse(getOrgChartInDept(deptCode));
}

export async function getOrgChartInEmplNumAction(emplNum:string) {
  return await packActionResponse(getOrgChartInEmplNum(emplNum));
}

export async function getOneOrgChartAction(id:string) {
  return await packActionResponse(getOneOrgChart(id));
}

export async function getDepartmentsAction() {
  return await packActionResponse(getDepartments());
}

export async function getFilterDepartmentsAction() {
  return await packActionResponse(getFilterDepartments());
}

export async function getDepartmentsInCompanyCodeAction(code:string) {
  return await packActionResponse(getDepartmentsInCompanyCode(code));
}

export async function getPeriodAction() {
  return await packActionResponse(getPeriod());
}

export async function getCurrentPeriodAction() {
  return await packActionResponse(getCurrentPeriod());
}


