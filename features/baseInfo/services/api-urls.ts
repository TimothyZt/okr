import exp from "constants";
import { apiUrl } from "../../../lib/request/fetch";

const strategicThemes = (okrPeriodId:string
) => `/base-info/strategic-themes-objectives?okrperiodid=${okrPeriodId}`;
const indicatorSource = () => "/base-info/indicator-source";
const krType = () => "/base-info/kr-type";

const orgChart = () => "/org-chart/";
const oneOrgChart = (id: string) => `/org-charts/${id}`;
const orgChartInEmplNum = (emplnum: string) =>
  `/org-chart/employees/${emplnum}`;
const orgChartInDept = (deptCode: string) => `/org-chart/employees/${deptCode}`;

const departments = () => "/companies/departments/";
const departmentsInCompanyCode = (code: string) =>
  `/companies/${code}/departments/`;
const filterDepartments = () => "/companies/departments/filter";

const period = () => "/base-info/period";
const currentPeriod = () => "/base-info/current-period";
export function strategicThemesLink(okrPeriodId: string) {
  return new URL(strategicThemes(okrPeriodId), apiUrl);
}

export function indicatorSourceLink() {
  return new URL(indicatorSource(), apiUrl);
}

export function krTypeLink() {
  return new URL(krType(), apiUrl);
}

export function orgChartLink() {
  return new URL(orgChart(), apiUrl);
}

export function oneOrgChartLink(id: string) {
  return new URL(oneOrgChart(id), apiUrl);
}

export function orgChartInEmplNumLink(emplnum: string) {
  return new URL(orgChartInEmplNum(emplnum), apiUrl);
}

export function orgChartInDeptLink(deptCode: string) {
  return new URL(orgChartInDept(deptCode), apiUrl);
}

export function departmentsLink() {
  return new URL(departments(), apiUrl);
}

export function departmentsInCompanyCodeLink(code: string) {
  return new URL(departmentsInCompanyCode(code), apiUrl);
}

export function filterDepartmentsLink() {
  return new URL(filterDepartments(), apiUrl);
}

export function periodLink() {
  return new URL(period(), apiUrl);
}

export function currentPeriodLink() {
  return new URL(currentPeriod(), apiUrl);
}
