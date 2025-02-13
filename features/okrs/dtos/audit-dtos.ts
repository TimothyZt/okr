import { DateTime } from "next-auth/providers/kakao";
import { KeyResult, Objective } from "./okr-dtos";

export interface Audit_ORequest {
  objectiveId?: string;
  refuseReason?: string;
  approverId?: string;
  approverStatus?: string;
  auditStatus?: string;
  auditStepId?: string;
}

export interface Audit_OResponse {
  objective: Objective;
  auditId?: string;
  objectiveId?: string;
  refuseReason?: string;
  // approverId?: string;
  step: number;
  approverStatus?: string;
  auditStatus?: string;
  auditStepId?: string;
  managementId?: string;
  submitterId?: string;
  submitterOn?: string;
  belongToEmplId?: string;
  belongToEmplN?: string;
  strategicOId?: string;
  strategicThemeId?: string;
  departmentId?: string;
  description?: string;
  companyName?: string;
  weight: number;
  strategicThemeName?: string;
  strategicOName?: string;
  indicatorsName?: string;
  okrPeriodId: string;
  okrPeriod: string;
}

export interface Audit_KRResponse {
  keyResult: KeyResult;
  auditId?: string;
  objectiveId?: string;
  refuseReason?: string;
  approverId?: string;
  approverStatus?: string;
  auditStatus?: string;
  step: number;
  managementId?: string;
  weight: number;
  description?: string;
  belongToDepartment1Id?: string;
  belongToDepartment1Name?: string;
  belongToDepartment2Id?: string;
  belongToDepartment2Name?: string;
  krType?: string;
}

export interface ApproverStatusRequest {
  id: string;
  type: boolean;
  reason?: string;
  status: number;
}

export interface QueryMyAuditORecordsRequest {
  category?: string;
  createOn?: string;
  limit: number;
}

export interface AuditRejectKRResponse {
  keyResultDescription: string;
  audidKeyResultRejectReason: string;
}

export interface AuditRejectResponse {
  objectiveDescription: string;
  auditObjectiveRejectReason: string;
  auditKeyResultRejectReasons: AuditRejectKRResponse[];
}

export interface MultiApproverStatusRequest {
  ids: string[];
  type: boolean;
  reason?: string;
  status: number;
}

export interface AuditStepDetailResponse {
  step: number;
  managementId: string;
  approverId: string;
  approverName: string;
  approverStatus: string;
  isCompleted: number;
  auditStatus: string;
}

export function auditCacheTag(krId: string) {
  return `/audit-record/${krId}`;
}

export function auditsOCacheTag() {
  return `/audit-records-o/`;
}
export function auditOByCategoryCacheTag() {
  return `/audit-o-records/category`;
}
export function auditsKRCacheTag() {
  return `/audit-records-kr/`;
}
export function auditRecordRejectResponseCacheTag(managementId: string) {
  return `/audit-record/reject-reasonse?=${managementId}`;
}
export function auditStepDetailsCacheTag(managementId: string) {
  return `/audit-records/${managementId}`;
}

export function auditOSubimittedCacheTag() {
  return `/audit-records-o/submitted`;
}

export function auditKRSubimittedCacheTag() {
  return `/audit-records-kr/submitted`;
}

export function feedbacksCacheTag(objectiveId: string) {
  return `/feedbacks?=${objectiveId}`;
}

export function FeedbackAuditResponsesCacheTag(
  category: string,
  periodbyseasonid: string,
  createOn: DateTime,
  limit: number,
) {
  return `/audit/feedbacks/?category=${category}&periodbyseasonid=${periodbyseasonid}&createon=${createOn}&limit=${limit}`;
}

export function FeedbackResponsesByFirtStageCacheTag() {
  return `/audit/feedbacks/first-stage`;
}

export function ratingRecordsCacheTag() {
  return `/rating-records/`;
}
