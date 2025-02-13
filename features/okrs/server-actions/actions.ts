"use server";

import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
// import { redirect } from "next/navigation";
import { packActionResponse } from "../../../lib/server-actions/action-response";
import {
  ApproverStatusRequest,
  MultiApproverStatusRequest,
  QueryMyAuditORecordsRequest,
} from "../dtos/audit-dtos";
import {
  FeedbackAuditRequest,
  FeedbackRequest,
  OKRProgressReportRequest,
  RatingRequest,
} from "../dtos/feedback-dtos";
import {
  CreateKRRequest,
  CreateORequest,
  QueryObjectiveByTrackDto,
  QueryObjectivesDto,
  ReportsRequest,
  UpdateKR,
  UpdateObjective,
} from "../dtos/okr-dtos";
import {
  deleteKeyResult,
  deleteObjective,
  downloadRatingReports,
  getAuditKR_Records,
  getAuditKRSubmittedResponses,
  getAuditO_Records,
  getAuditOSubmittedResponses,
  getAuditRecordsOByCategory,
  getAuditRejectResponse,
  getAuditStepDetailResponses,
  getFeedbackAuditResponses,
  getFeedbackResponses,
  getFeedbackResponsesByFirstStage,
  getKeyResult,
  getKeyResults,
  getkeyResultsByOIds,
  getObjective,
  getObjectives,
  getObjectivesByHd,
  getobjectivesInTrack,
  getRaingRecordsResponses,
  getReportData,
  getReports,
  // postAuditRecord,
  postKeyResult,
  postObjective,
  putApproverStatus,
  putFeedbackRequest,
  putFeedbackSubmitStatus,
  putFeedbackToUndo,
  putHighScore,
  putKeyResult,
  putMultiApproverStatus,
  putObjective,
  putOKRToUndo,
  putSecondSubmitFeedback,
  submmitObjective,
} from "../services/okr";

//#region  CREATE PAGE
export async function postObjectiveAction(request: CreateORequest) {
  return await packActionResponse(postObjective(request));
}

export async function getObjectivesAction() {
  return await packActionResponse(getObjectives());
}
export async function getObjectiveAction(objectiveId:string) {
  return await packActionResponse(getObjective(objectiveId));
}

export async function getObjectivesByHdAction(query: QueryObjectivesDto) {
  return await packActionResponse(getObjectivesByHd(query));
}

export async function getobjectivesInTrackAction(query: QueryObjectiveByTrackDto) {
  return await packActionResponse(getobjectivesInTrack(query));
}

export async function putOKRToUndoAction(oId: string) {
  return await packActionResponse(putOKRToUndo(oId));
}

export async function deleteObjectiveAction(objectiveId: string) {
  return await packActionResponse(deleteObjective(objectiveId));
}

export async function deleteKeyResultAction(objectiveId: string, krId: string) {
  return await packActionResponse(deleteKeyResult(objectiveId, krId));
}

export async function postKeyResultAction(
  objectiveId: string,
  request: CreateKRRequest,
) {
  return await packActionResponse(postKeyResult(objectiveId, request));
}

export async function getKeyResultsAction(objectiveId: string) {
  return await packActionResponse(getKeyResults(objectiveId));
}

export async function getkeyResultsByOIdsAction(objectiveIds: string[]) {
  return await packActionResponse(getkeyResultsByOIds(objectiveIds));
}

export async function putObjectiveAction(
  objectiveId: string,
  update: UpdateObjective,
) {
  return await packActionResponse(putObjective(objectiveId, update));
}

export async function getKeyResultAction(krId: string) {
  return await packActionResponse(getKeyResult(krId));
}
export async function putKeyResultAction(
  objectiveId: string,
  krId: string,
  update: UpdateKR,
) {
  return await packActionResponse(putKeyResult(objectiveId, krId, update));
}

export async function submmitObjectiveAction(objectiveId: string) {
  return await packActionResponse(submmitObjective(objectiveId));
}
//#endregion

//#region  AUDIT PAGE

// export async function postAuditRecordAction(audit: Audit_ORequest) {
//   return await packActionResponse(postAuditRecord(audit))
// }

export async function getAuditO_RecordsAction() {
  return await packActionResponse(getAuditO_Records());
}

export async function getAuditRecordsOByCategoryAction(
  query: QueryMyAuditORecordsRequest,
) {
  return await packActionResponse(getAuditRecordsOByCategory(query));
}

export async function getAuditKR_RecordsAction() {
  return await packActionResponse(getAuditKR_Records());
}

export async function getAuditRejectResponseAction(managementId: string) {
  return await packActionResponse(getAuditRejectResponse(managementId));
}

export async function putApproverStatusAction(request: ApproverStatusRequest) {
  return await packActionResponse(putApproverStatus(request));
}

export async function putMultiApproverStatusAction(
  request: MultiApproverStatusRequest,
) {
  return await packActionResponse(putMultiApproverStatus(request));
}

export async function getAuditStepDetailResponseAction(
  managementId: string,
  isObjective: boolean,
  id: string,
) {
  return await packActionResponse(
    getAuditStepDetailResponses(managementId, isObjective, id),
  );
}

export async function getAuditOSubmittedResponsesAction() {
  return await packActionResponse(getAuditOSubmittedResponses());
}

export async function getAuditKRSubmittedResponsesAction() {
  return await packActionResponse(getAuditKRSubmittedResponses());
}

export async function downloadRatingReportsAction(
  request: OKRProgressReportRequest,
) {
  return await packActionResponse(
    downloadRatingReports(request.year, request.companyId, request.season),
  );
}

//#endregion

//#region Feedback
export async function getFeedbackAuditResponsesAction(
  request: FeedbackAuditRequest,
) {
  return await packActionResponse(getFeedbackAuditResponses(request));
}

export async function getFeedbackResponsesByFirstStageAction(
  periodByYearId: string,
) {
  return await packActionResponse(
    getFeedbackResponsesByFirstStage(periodByYearId),
  );
}

export async function putFeedbackRequestAction(
  objectiveId: string,
  krId: string,
  request: FeedbackRequest,
) {
  return await packActionResponse(
    putFeedbackRequest(objectiveId, krId, request),
  );
}

export async function putFeedbackToUndoAction(
  objectiveId: string,
  fbId: string,
  rejectReason: string,
) {
  return await packActionResponse(
    putFeedbackToUndo(objectiveId, fbId, rejectReason),
  );
}
("");
export async function putSecondSubmitFeedbackAction(
  objectiveId: string,
  fbId: string,
  submitType: string,
) {
  return await packActionResponse(
    putSecondSubmitFeedback(objectiveId, fbId, submitType),
  );
}

export async function putFeedbackSubmitStatusAction(
  objectiveId: string,
  krId: string,
  request: FeedbackRequest,
) {
  return await packActionResponse(
    putFeedbackSubmitStatus(objectiveId, krId, request),
  );
}

export async function getFeedbackResponsesAction(objectiveId: string) {
  return await packActionResponse(getFeedbackResponses(objectiveId));
}

export async function putHighScoreAction(
  objectiveId: string,
  fbId: string,
  request: RatingRequest,
) {
  return await packActionResponse(putHighScore(objectiveId, fbId, request));
}

export async function getRaingRecordsResponsesAction() {
  return await packActionResponse(getRaingRecordsResponses());
}
//#endregion

//#region Report
export async function getReportDataAction() {
  return await packActionResponse(getReportData());
}

export async function getReportsAction(request: string) {
  return await packActionResponse(getReports(request));
}
//#endregion
