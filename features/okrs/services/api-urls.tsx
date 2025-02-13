import { DateTime } from "next-auth/providers/kakao";
import { apiUrl } from "../../../lib/request/fetch";

const objectives = () => "/objectives";
const objectivesByHd = (
  okrPeriodByYearId: string,
  createOn: DateTime,
  limit: number,
) =>
  `/objectives-hd?okrPeriodByYearId=${okrPeriodByYearId}&createon=${createOn}&limit=${limit}`;
const objectivesInTrack = (
  okrPeriodByYearId: string,
  companyId: string,
  createOn: DateTime,
  limit: number,
) =>
  `/track-objectives?okrPeriodByYearId=${okrPeriodByYearId}&companyid=${companyId}&createon=${createOn}&limit=${limit}`;

const objective = (objectiveId: string) => `/objectives/${objectiveId}`;
const objectiveInUpdate = () => "/objective/";
const okr = (objectiveId: string) =>
  `/objective-and-key-results/${objectiveId}`;
const undoOKR = (objectiveId: string) =>
  `/objective-and-key-results/${objectiveId}/undo`;

const keyResult = (krId: string) => `/key-results/${krId}`;
//暂时如此
const keyResultsByOIds = () => `/key-results/`
// const keyResultsByOIds = (objectiveIds:string) => `/key-results?${objectiveIds}`

const keyResults = (objectiveId: string) =>
  `/objectives/${objectiveId}/key-results`;

const auditRecordsO = () => "/audit-records-o/";
const auditRecordsOByCategory = (
  category: string,
  createOn: DateTime,
  limit: number,
) =>
  `/audit-o-records/category?category=${category}&createon=${createOn}&limit=${limit}`;
const auditRecordsKR = () => "/audit-records-kr/";
const auditRejectResponse = (managementId: string) =>
  `/audit-record/reject-reasonse?managementId=${managementId}`;
const auditRecordsO_Current = () => `/audit-records-o/submitted`;
const auditRecordsKR_Current = () => `/audit-records-kr/submitted`;
const approverStatus = (id: string) => `/audit-records/${id}/approver-status`;
const multiApproverStatus = () => `/audit-records/approve-status`;
const auditStepDetail = (
  managementId: string,
  isObjective: boolean,
  id: string,
) => `/audit-records/${managementId}?isObjective=${isObjective}&id=${id}`;

const feedback = (krId: string) => `/key-results/${krId}/feedbacks`;
const submitFeedbacks = (krId: string) =>
  `/key-results/${krId}/feedbacks/submit-status`;
const secondSubmitFeedback = (fbId: string) =>
  `/feedbacks/${fbId}/second-submit`;
const feedbacks = (objectiveId: string) => `/okrs/${objectiveId}/feedbacks`;
const undoFeedbacks = (fbId: string) => `/key-results/${fbId}/undo/`;

const feedbackResponses = (
  category: string,
  periodbyseasonid: string,
  okrPeriodByYearId: string,
  createOn: DateTime,
  limit: number,
) =>
  `/audit/feedbacks/?category=${category}&periodbyseasonid=${periodbyseasonid}&okrPeriodByYearId=${okrPeriodByYearId}&createon=${createOn}&limit=${limit}`;
const feedbackResponsesByFirstStage = (periodByYearId: string) =>
  `/audit/feedbacks/first-stage/${periodByYearId}`;

const highscore = (fbId: string) => `/feedbacks/${fbId}`;
const ratings = () => `/rating-records/`;
const downloadRatingReports = (
  year: string,
  companyId: string,
  season: string,
) => `/report/download?Year=${year}&CompanyId=${companyId}&Season=${season}`;

const reportData = () => "/report-data/";
const reports = () => `/reports`;
export function objectiveInUpdateLink() {
  return new URL(objectiveInUpdate(), apiUrl);
}

export function objectivesLink() {
  return new URL(objectives(), apiUrl);
}

export function objectivesByHdLink(
  okrPeriodByYearId: string,
  createOn: DateTime,
  limit: number,
) {
  return new URL(objectivesByHd(okrPeriodByYearId, createOn, limit), apiUrl);
}

export function objectivesInTrackLink(
  okrPeriodByYearId: string,
  companyId: string,
  createOn: DateTime,
  limit: number,
) {
  return new URL(
    objectivesInTrack(okrPeriodByYearId, companyId, createOn, limit),
    apiUrl,
  );
}

export function objectiveLink(objectiveId: string) {
  return new URL(objective(objectiveId), apiUrl);
}

export function okrLink(objectiveId: string) {
  return new URL(okr(objectiveId), apiUrl);
}

export function undoOKRLink(objectiveId: string) {
  return new URL(undoOKR(objectiveId), apiUrl);
}

export function keyResultPostLink(objectiveId: string) {
  const url = new URL(keyResults(objectiveId), apiUrl);
  return url;
}

export function keyResultLink(krId: string) {
  return new URL(keyResult(krId), apiUrl);
}
//暂时如此
// export function keyResultsByOIdsLink(objectiveIds: string) {
//   return new URL(keyResultsByOIds(objectiveIds), apiUrl);
// }
export function keyResultsByOIdsLink() {
  return new URL(keyResultsByOIds(), apiUrl);
}

export function keyResultsLink(objectiveId: string) {
  return new URL(keyResults(objectiveId), apiUrl);
}

export function auditRecordsOLink() {
  return new URL(auditRecordsO(), apiUrl);
}
export function auditRecordsOByCategoryLink(
  category: string,
  createOn: DateTime,
  limit: number,
) {
  return new URL(auditRecordsOByCategory(category, createOn, limit), apiUrl);
}
export function auditRecordsKRLink() {
  return new URL(auditRecordsKR(), apiUrl);
}
export function auditRejectResponseLink(managementId: string) {
  return new URL(auditRejectResponse(managementId), apiUrl);
}
export function approverStatusLink(id: string) {
  return new URL(approverStatus(id), apiUrl);
}

export function multiApproverStatusLink() {
  return new URL(multiApproverStatus(), apiUrl);
}

export function auditStepDetailLink(
  managementId: string,
  isObjective: boolean,
  id: string,
) {
  return new URL(auditStepDetail(managementId, isObjective, id), apiUrl);
}

export function auditOSubmittedLink() {
  return new URL(auditRecordsO_Current(), apiUrl);
}

export function auditKRSubmittedLink() {
  return new URL(auditRecordsKR_Current(), apiUrl);
}

export function feedbackLink(krId: string) {
  return new URL(feedback(krId), apiUrl);
}
export function submitFeedbacksLink(krId: string) {
  return new URL(submitFeedbacks(krId), apiUrl);
}

export function secondSubmitFeedbackLink(fbId: string) {
  return new URL(secondSubmitFeedback(fbId), apiUrl);
}

export function feedbacksLink(objectiveId: string) {
  return new URL(feedbacks(objectiveId), apiUrl);
}

export function undoFeedbacksLink(fbId: string) {
  return new URL(undoFeedbacks(fbId), apiUrl);
}

export function feedbackResponsesLink(
  category: string,
  periodbyseasonid: string,
  okrPeriodByYearId: string,
  createOn: DateTime,
  limit: number,
) {
  return new URL(
    feedbackResponses(
      category,
      periodbyseasonid,
      okrPeriodByYearId,
      createOn,
      limit,
    ),
    apiUrl,
  );
}

export function feedbackResponsesByFirstStageLink(periodByYearId: string) {
  return new URL(feedbackResponsesByFirstStage(periodByYearId), apiUrl);
}

export function highscoreLink(fbId: string) {
  return new URL(highscore(fbId), apiUrl);
}

export function ratingsLink() {
  return new URL(ratings(), apiUrl);
}

export function downloadRatingReportsLink(
  year: string,
  companyId: string,
  season: string,
) {
  return new URL(downloadRatingReports(year, companyId, season), apiUrl);
}

export function reportDataLink() {
  return new URL(reportData(), apiUrl);
}

export function reportsLink() {
  return new URL(reports(), apiUrl);
}
