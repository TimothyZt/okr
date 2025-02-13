import { DateTime } from "next-auth/providers/kakao";
import {
  Indicator,
  OrgChart,
  StrategicObjective,
} from "../../baseInfo/dtos/baseinfo-dtos";

export interface Objective {
  id: string;
  belongToEmplId?: string;
  belongToEmplN?: string;
  departmentId?: string;
  okrperiodId?: string;
  objType?: string;
  strategicThemeId?: string;
  strategicThemeName?: string;
  strategicOId?: string;
  strategicOName?: string;
  indicators?: Indicator[];
  desc?: string;
  progress?: number;
  weight?: number;
  remark?: string;
  alignType?: string;
  alignId?: string;
  selfScoreId?: string;
  supervisorScoreId?: string;
  auditBy?: string;
  auditByN?: string;
  auditTime?: Date;
  auditLevel?: number;
  auditRemarks?: string;
  statusCode?: string;
  createOn?: Date;
  createBy?: string;
  submittedBy?: string;
  submittedOn?: Date;
  okrLevel?: string;
  okrStatus?: string;
  departmentName?: string;
  auditBackStatus: string;
  auditBackManagementId?: string;
  isSpringSecondSubmitted: number;
  isSummerSecondSubmitted: number;
  isAutumnSecondSubmitted: number;
  isWinterSecondSubmitted: number;
}

export interface KeyResult {
  sortId: number;
  id: string;
  belongOid?: string;
  description?: string;
  progress?: string;
  weight?: number;
  selfScoreId?: string;
  supervisorScoreId?: string;
  statusCode?: string;
  belongToDepartment2Id?: string;
  belongToDepartment1Id?: string;
  belongToDepartment1Name?: string;
  belongToDepartment2Name?: string;
  krType?: string;
  krTypeId?: string;
  auditBackStatus: string;
  auditBackManagementId: string;
}

export interface QueryObjectivesDto{
  okrPeriodByYearId: string;
  createOn: DateTime;
  limit: number;
}

export interface CreateORequest {
  theme: { id: any; themeName: any } | undefined;
  objective: StrategicObjective | undefined;
  indicators: Indicator[];
  personInCharge: OrgChart | undefined;
  desc: string;
  okrLevel: string;
  okrBelongToDepartment: string | undefined;
}

export interface CreateKRRequest {
  desc: string;
  krType: string;
  departments: string[] | undefined;
  weight: number;
}

export interface UpdateKR {
  sortId?: number;
  id: string;
  belongOid?: string;
  description?: string;
  progress?: string;
  weight?: number;
  selfScoreId?: string;
  supervisorScoreId?: string;
  statusCode?: string;
  department?: string[];
  krType?: string;
}

export interface UpdateObjective {
  indicators: Indicator[];
  id: string;
  belongToEmplId?: string;
  belongToEmplN?: string;
  departmentId?: string;
  strategicThemeId?: string;
  strategicOId?: string;
  desc?: string;
  okrLevel?: string;
}

export interface ReportDataResponse {
  osNum: number;
  krsNum: number;
  averageOProgress: number;
  krProgress: number;
  okRsInCreateStage: number;
  okRsInAuditStage: number;
  okRsInTrackStage: number;
  okRsInEndStage: number;
  krTypeInSaleCompletedNum: number;
  krTypeInSaleNotCompletNum: number;
  krTypeInCostControlCompletedNum: number;
  krTypeInCostControlNotCompleteNum: number;
  krTypeInProjectCompletedNum: number;
  krTypeInProjectNotCompleteNum: number;
  krTypeInOtherCompletedNum: number;
  krTypeInOtherNotCompleteNum: number;
  oProgressAnalysis1: number;
  oProgressAnalysis2: number;
  oProgressAnalysis3: number;
  krProgressAnalysis1: number;
  krProgressAnalysis2: number;
  krProgressAnalysis3: number;
  krProgressAnalysis4: number;
}

export interface QueryObjectiveByTrackDto{
  okrPeriodByYearId?: string;
  companyId?:string;
  createOn: DateTime;
  limit: number;
}

export interface ReportRecordResponse {
  sortId: number;
  companyName: string;
  emplNum: string;
  emplName: string;
  oDesc: string;
  krDesc: string;
  krProgress: number;
  oProgress: number;
  krScore: number;
}
export interface ReportsRequest {
  status: number;
}

export function objectivesCacheTag() {
  return "objectives";
}
export function objectivesByHdCacheTag(
  okrPeriodByYearId: string,
  createOn: DateTime,
  limit: number,
) {
  return `/objectives-hd?okrPeriodByYearId=${okrPeriodByYearId}createon=${createOn}&limit=${limit}`;
}
export function objectivesInTrackCacheTag() {
  return "track-objectives";
}

export function objectiveCacheTag(objectiveId: string) {
  return `objectives/${objectiveId}`;
}

export function tobjectiveCacheTag(objectiveId: string) {
  return `tender-${objectiveId}`;
}

export function keyResultsCacheTag(objectiveId: string) {
  return `${objectiveId}/keyResults`;
}
export function keyResultsByOIdCacheTag(objectiveIds: string[]) {
  return `/key-results?objectiveids=${objectiveIds}`;
}
export function keyResultCacheTag(krId: string) {
  return `keyResults/${krId}`;
}

export function reportDataCacheTag() {
  return `report-data`;
}

export function reportsCacheTag() {
  return `reports`;
}
