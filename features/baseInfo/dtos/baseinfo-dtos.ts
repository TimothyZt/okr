import { RoleDto } from "../../users/dtos/users-dto";

export interface StrategicObjective {
  id: string;
  parentId: string;
  objectiveName: string;
  companyCode: string;
  okrPeriodId:string;
}

export interface StrategicTheme {
  id: string;
  themeName: string;
  objectives: StrategicObjective[];
  okrPeriodId:string;
}

export interface Indicator {
  id: string;
  indicatorName: string;
}

export interface OrgChart {
  //response
  id: string;
  emplNum: string;
  emplId: string;
  companyName: string;
  sex: string;
  emplName: string;
  departmentName: string;
  emailAddress: string;
  position: string;
  isActive : number;
  roles: RoleDto[];
}

export interface OrgChartRequest {
  //update
  orgId: string;
  emplId: string;
  emplNum: string;
  emplName: string;
  companyId: string;
  companyName: string;
  deptId: string;
  roles: RoleDto[];
}
export interface Department {
  id: string;
  level: string;
  parentId: string;
  parentCode: string;
  code: string;
  fullCode: string;
  name: string;
  fullName: string;
  isHide: boolean;
  isActive : number;
  roles?:string[];
}

export interface TreeNode {
  parentCode: string;
  selfCode: string;
  children: TreeNode[];
  department: Department;
}

export interface DepartmentDto {
  treeNodes: TreeNode[];
  departments: Department[];
}

export interface FilterCompaniesResponse {
  companyId: string;
  companyName: string;
  sortId: number;
}

export interface FilterDepartmentsResponse {
  departmentId: string;
  departmentName: string;
  sortId: number;
}

export interface FilterCompaniesDtos {
  filterCompanies: FilterCompaniesResponse[];
  filterDepartments: FilterDepartmentsResponse[];
}

export interface KRType {
  id: string;
  krTypeName: string;
}

export interface Period {
  id: string;
  periodName: string;
  startTime: string;
  endTime: string;
}

export function strategicThemesCacheTag() {
  return `strategicThemes`;
}

export function indicatorSourceCacheTag() {
  return `indicatorSource`;
}

export function krTypeCacheTag() {
  return `krType`;
}

export function orgChartCacheTag() {
  return `orgChart`;
}

export function oneOrgChartCacheTag(id: string) {
  return `orgChart/${id}`;
}

export function orgChartInEmplNumCacheTag(emplNum: string) {
  return `orgChart/${emplNum}`;
}

export function orgChartInDeptCodeCacheTag(deptCode: string) {
  return `orgChart/${deptCode}`;
}

export function departmentsCacheTag() {
  return `departments`;
}

export function departmentsInCompanyCodeCacheTag(code: string) {
  return `${code}/departments`;
}

export function filterDepartmentsCacheTag() {
  return `filter/departments`;
}

export function periodCacheTag() {
  return `period`;
}

export function currentPeriodCacheTag() {
  return `current-period`;
}
