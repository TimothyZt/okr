import { revalidateTag } from "next/cache";
import { appFetch } from "../../../lib/request/fetch";
import {
  CreateKRRequest,
  CreateORequest,
  KeyResult,
  keyResultCacheTag,
  keyResultsByOIdCacheTag,
  keyResultsCacheTag,
  Objective,
  objectiveCacheTag,
  objectivesByHdCacheTag,
  objectivesCacheTag,
  objectivesInTrackCacheTag,
  QueryObjectiveByTrackDto,
  QueryObjectivesDto,
  reportDataCacheTag,
  ReportDataResponse,
  ReportRecordResponse,
  reportsCacheTag,
  ReportsRequest,
  UpdateKR,
  UpdateObjective,
} from "../dtos/okr-dtos";
import {
  approverStatusLink,
  auditKRSubmittedLink,
  auditOSubmittedLink,
  auditRecordsKRLink,
  auditRecordsOByCategoryLink,
  auditRecordsOLink,
  auditRejectResponseLink,
  auditStepDetailLink,
  downloadRatingReportsLink,
  feedbackLink,
  feedbackResponsesByFirstStageLink,
  feedbackResponsesLink,
  feedbacksLink,
  highscoreLink,
  keyResultLink,
  keyResultPostLink,
  keyResultsByOIdsLink,
  keyResultsLink,
  multiApproverStatusLink,
  objectiveLink,
  objectivesByHdLink,
  objectivesInTrackLink,
  objectivesLink,
  okrLink,
  ratingsLink,
  reportDataLink,
  reportsLink,
  secondSubmitFeedbackLink,
  submitFeedbacksLink,
  undoFeedbacksLink,
  undoOKRLink,
} from "./api-urls";
import {
  ApproverStatusRequest,
  Audit_KRResponse,
  Audit_OResponse,
  auditKRSubimittedCacheTag,
  auditOByCategoryCacheTag,
  auditOSubimittedCacheTag,
  auditRecordRejectResponseCacheTag,
  AuditRejectResponse,
  auditsKRCacheTag,
  auditsOCacheTag,
  AuditStepDetailResponse,
  auditStepDetailsCacheTag,
  FeedbackAuditResponsesCacheTag,
  FeedbackResponsesByFirtStageCacheTag,
  feedbacksCacheTag,
  MultiApproverStatusRequest,
  QueryMyAuditORecordsRequest,
  ratingRecordsCacheTag,
} from "../dtos/audit-dtos";
import { cookies } from "next/headers";
import {
  FeedbackAuditRequest,
  FeedbackAuditResponse,
  FeedbackAuditResponseByDetail,
  FeedbackRequest,
  FeedbackResponse,
  RatingRecordResponse,
  RatingRequest,
} from "../dtos/feedback-dtos";
import { json } from "stream/consumers";
import { DateTime } from "next-auth/providers/kakao";

//#region  CREATE PAGE

//#region Objective
export async function postObjective(request: CreateORequest): Promise<void> {
  await appFetch(objectivesLink(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(objectivesCacheTag());
}
export async function getObjectives(): Promise<Objective[]> {
  const response = await appFetch(objectivesLink(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    // cache:'no-cache',
    next: { tags: [objectivesCacheTag()] },
  });
  const objectives: Objective[] = await response.json();
  return objectives;
}
export async function getObjectivesByHd(
  query: QueryObjectivesDto,
): Promise<Objective[]> {
  const response = await appFetch(
    objectivesByHdLink(query.okrPeriodByYearId, query.createOn, query.limit),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
      // cache:'no-cache',
      next: {
        tags: [
          objectivesByHdCacheTag(
            query.okrPeriodByYearId,
            query.createOn,
            query.limit,
          ),
        ],
      },
    },
  );
  const objectives: Objective[] = await response.json();
  return objectives;
}
export async function getobjectivesInTrack(
  query: QueryObjectiveByTrackDto,
): Promise<Objective[]> {
  const response = await appFetch(
    objectivesInTrackLink(
      query.okrPeriodByYearId!,
      query.companyId!,
      query.createOn,
      query.limit,
    ),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
      // cache:'no-cache',

      next: { tags: [objectivesInTrackCacheTag()] },
    },
  );
  const objectives: Objective[] = await response.json();
  return objectives;
}

export async function getObjective(objectiveId: string): Promise<Objective> {
  const response = await appFetch(objectiveLink(objectiveId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [objectiveCacheTag(objectiveId)] },
  });
  const objective: Objective = await response.json();

  return objective;
}

export async function submmitObjective(objectiveId: string): Promise<void> {
  try {
    var response = await appFetch(objectiveLink(objectiveId) + "/submmit", {
      method: "Put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
    });
    revalidateTag(objectivesCacheTag());
    revalidateTag(auditsOCacheTag());
  } catch (error) {
    console.log(error);
  }
}
export async function putOKRToUndo(objectiveId: string): Promise<void> {
  try {
    var response = await appFetch(undoOKRLink(objectiveId), {
      method: "Put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
    });
    revalidateTag(objectivesCacheTag());
    revalidateTag(auditsOCacheTag());
  } catch (error) {
    console.log(error);
  }
}

export async function deleteObjective(objectiveId: string): Promise<void> {
  await appFetch(okrLink(objectiveId), {
    method: "Delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
  });
  revalidateTag(objectivesCacheTag());
}
//#endregion

//#region KeyResult
export async function postKeyResult(
  objectiveId: string,
  request: CreateKRRequest,
): Promise<void> {
  await appFetch(keyResultPostLink(objectiveId), {
    method: "Post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(keyResultsCacheTag(objectiveId));
}

//无法使用  太长了  
// export async function getkeyResultsByOIds(objectiveIds: string[]): Promise<KeyResult[]> {
//   const params = new URLSearchParams();
//   objectiveIds.forEach((id) => {
//       params.append('objectiveIds', id);
//   });
//   const response = await appFetch(keyResultsByOIdsLink( params.toString()), {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//       Cookie: cookies().toString(),
//       // cache: 'no-cache'
//     },
//     next: { tags: [keyResultsByOIdCacheTag(objectiveIds)] },
//   });
//   console.log(keyResultsByOIdsLink( params.toString()))
//   const keyResults: KeyResult[] = await response.json();
//   return keyResults;
// }
// 暂时如此
export async function getkeyResultsByOIds(objectiveIds: string[]): Promise<KeyResult[]> {

  const response = await appFetch(keyResultsByOIdsLink(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
      // cache: 'no-cache'
    },
    body:JSON.stringify(objectiveIds),
    // next: { tags: [keyResultsByOIdCacheTag(objectiveIds)] },
  });
  const keyResults: KeyResult[] = await response.json();
  return keyResults;
}

export async function getKeyResults(objectiveId: string): Promise<KeyResult[]> {
  const response = await appFetch(keyResultsLink(objectiveId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
      // cache: 'no-cache'
    },
    next: { tags: [keyResultsCacheTag(objectiveId)] },
  });
  const keyResults: KeyResult[] = await response.json();
  return keyResults;
}

export async function deleteKeyResult(
  objectiveId: string,
  krId: string,
): Promise<void> {
  await appFetch(keyResultLink(krId), {
    method: "Delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
  });
  revalidateTag(keyResultsCacheTag(objectiveId));
}

export async function getKeyResult(krId: string): Promise<KeyResult> {
  const response = await appFetch(keyResultLink(krId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
      // cache: 'no-cache'
    },
    next: { tags: [keyResultsCacheTag(krId)] },
  });
  const keyResults: KeyResult = await response.json();
  return keyResults;
}

export async function putObjective(
  objectiveId: string,
  update: UpdateObjective,
): Promise<void> {
  await appFetch(objectiveLink(objectiveId), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(update),
  });

  revalidateTag(objectiveCacheTag(objectiveId));
  revalidateTag(objectivesCacheTag());
}

export async function putKeyResult(
  objectiveId: string,
  krId: string,
  update: UpdateKR,
): Promise<void> {
  await appFetch(keyResultLink(krId), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(update),
  });
  revalidateTag(keyResultCacheTag(krId));
  revalidateTag(keyResultsCacheTag(objectiveId));
}
//#endregion

//#endregion

//#region  AUDIT PAGE

// export async function postAuditRecord(
//   record:Audit_ORequest
// ): Promise<void> {
//   await appFetch(keyResultInUpdateLink(),{
//     method: "Put",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify(record),
//   });
// }

export async function getAuditO_Records(): Promise<Audit_OResponse[]> {
  const response = await appFetch(auditRecordsOLink(), {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [auditsOCacheTag()] },
  });
  const results: Audit_OResponse[] = await response.json();
  return results;
}
export async function getAuditRecordsOByCategory(
  query: QueryMyAuditORecordsRequest,
): Promise<Audit_OResponse[]> {
  const response = await appFetch(
    auditRecordsOByCategoryLink(query.category!, query.createOn!, query.limit),
    {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
      next: { tags: [auditOByCategoryCacheTag()] },
    },
  );
  const results: Audit_OResponse[] = await response.json();
  return results;
}
export async function getAuditKR_Records(): Promise<Audit_KRResponse[]> {
  const response = await appFetch(auditRecordsKRLink(), {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [auditsKRCacheTag()] },
  });
  const results: Audit_KRResponse[] = await response.json();
  return results;
}

export async function getAuditRejectResponse(
  managementId: string,
): Promise<AuditRejectResponse> {
  const response = await appFetch(auditRejectResponseLink(managementId), {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [auditRecordRejectResponseCacheTag(managementId)] },
  });
  const results: AuditRejectResponse = await response.json();
  return results;
}

export async function putApproverStatus(
  request: ApproverStatusRequest,
): Promise<void> {
  const response = await appFetch(approverStatusLink(request.id), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  // revalidateTag(auditsOCacheTag())
  // revalidateTag(auditsKRCacheTag());
  revalidateTag(auditOSubimittedCacheTag());
  revalidateTag(auditKRSubimittedCacheTag());
}

export async function putMultiApproverStatus(
  request: MultiApproverStatusRequest,
): Promise<void> {
  const response = await appFetch(multiApproverStatusLink(), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });

  // revalidateTag(auditsOCacheTag());
  // revalidateTag(auditsKRCacheTag());
  revalidateTag(auditOSubimittedCacheTag());
  revalidateTag(auditKRSubimittedCacheTag());
}

export async function getAuditStepDetailResponses(
  managementId: string,
  isObjective: boolean,
  id: string,
): Promise<AuditStepDetailResponse[]> {
  const response = await appFetch(
    auditStepDetailLink(managementId, isObjective, id),
    {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
      next: { tags: [auditStepDetailsCacheTag(managementId)] },
    },
  );
  const results: AuditStepDetailResponse[] = await response.json();
  return results;
}

export async function getAuditOSubmittedResponses(): Promise<
  Audit_OResponse[]
> {
  const response = await appFetch(auditOSubmittedLink(), {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [auditOSubimittedCacheTag()] },
  });
  const results: Audit_OResponse[] = await response.json();
  return results;
}

export async function getAuditKRSubmittedResponses(): Promise<
  Audit_KRResponse[]
> {
  const response = await appFetch(auditKRSubmittedLink(), {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [auditKRSubimittedCacheTag()] },
  });
  const results: Audit_KRResponse[] = await response.json();
  return results;
}

//#endregion

//#region  Feedback

export async function putFeedbackRequest(
  objectiveId: string,
  krId: string,
  request: FeedbackRequest,
): Promise<void> {
  await appFetch(feedbackLink(krId), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(feedbacksCacheTag(objectiveId));
}

export async function putFeedbackToUndo(
  objectiveId: string,
  fbId: string,
  rejectReason: string,
): Promise<void> {
  await appFetch(undoFeedbacksLink(fbId), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(rejectReason),
  });
  revalidateTag(feedbacksCacheTag(objectiveId));
}

export async function putFeedbackSubmitStatus(
  objectiveId: string,
  krId: string,
  request: FeedbackRequest,
): Promise<void> {
  await appFetch(submitFeedbacksLink(krId), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(feedbacksCacheTag(objectiveId));
}

export async function getFeedbackResponses(
  objectiveId: string,
): Promise<FeedbackResponse[]> {
  const response = await appFetch(feedbacksLink(objectiveId), {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [feedbacksCacheTag(objectiveId)] },
  });
  const results: FeedbackResponse[] = await response.json();
  return results;
}

//這個是新的feedback
export async function getFeedbackAuditResponses(
  request: FeedbackAuditRequest,
): Promise<FeedbackAuditResponse[]> {
  const response = await appFetch(
    feedbackResponsesLink(
      request.category!,
      request.periodBySeasonId!,
      request.okrPeriodByYearId!,
      request.createOn!,
      request.limit!,
    ),
    {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
      next: {
        tags: [
          FeedbackAuditResponsesCacheTag(
            request.category!,
            request.periodBySeasonId!,
            request.createOn!,
            request.limit!,
          ),
        ],
      },
    },
  );
  const results: FeedbackAuditResponse[] = await response.json();
  return results;
}

export async function getFeedbackResponsesByFirstStage(
  periodByYearId: string,
): Promise<FeedbackAuditResponseByDetail[]> {
  const response = await appFetch(
    feedbackResponsesByFirstStageLink(periodByYearId),
    {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie: cookies().toString(),
      },
      next: {
        tags: [FeedbackResponsesByFirtStageCacheTag()],
      },
    },
  );
  const results: FeedbackAuditResponseByDetail[] = await response.json();
  return results;
}

export async function putSecondSubmitFeedback(
  objectiveId: string,
  fbId: string,
  submitType: string,
): Promise<void> {
  await appFetch(secondSubmitFeedbackLink(fbId), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(submitType),
  });
  revalidateTag(feedbacksCacheTag(objectiveId));
}

export async function putHighScore(
  objectiveId: string,
  fbId: string,
  request: RatingRequest,
): Promise<void> {
  await appFetch(highscoreLink(fbId), {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
  });
  revalidateTag(feedbacksCacheTag(objectiveId));
}

export async function getRaingRecordsResponses(): Promise<
  RatingRecordResponse[]
> {
  const response = await appFetch(ratingsLink(), {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [ratingRecordsCacheTag()] },
  });
  const results: RatingRecordResponse[] = await response.json();
  return results;
}

export async function downloadRatingReports(
  year: string,
  companyId: string,
  season: string,
) {
  var response = await appFetch(
    downloadRatingReportsLink(year, companyId, season),
    {
      method: "GET",
      headers: {
        Cookie: cookies().toString(),
      },
    },
  );
  return response.url;
}

//#endregion

//#region Report
export async function getReportData(): Promise<ReportDataResponse> {
  const response = await appFetch(reportDataLink(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    // cache:'no-cache',
    next: { tags: [reportDataCacheTag()] },
  });
  return response.json();
}

export async function getReports(
  request: string,
): Promise<ReportRecordResponse[]> {
  const response = await appFetch(reportsLink(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(request),
    // cache:'no-cache',
    next: { tags: [reportsCacheTag()] },
  });
  return response.json();
}
//endregion
