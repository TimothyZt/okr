import { KeyResult } from "./okr-dtos";

export interface FeedbackRequest {
  planDescription?: string;
  progressDescription?: string;
  progressValue?: string;
  defectProblem?: string;
  solution?: string;
  requiredResources?: string;
  selfScore?: string;
  period?: string;
  highScore?: string;
  nextPlanDescription?: string;
  isSubmitted: number;
  okrPeriodId: string;
}

export interface Feedback {
  id: string;
  krId: string;
  planDescription: string;
  progressDescription: string;
  progressValue: number;
  defectProblem: string;
  solution: string;
  selfScore: string;
  requiredResources?: string;
  highScore: string;
  period: string;
  nextPlanDescription: string;
  createOn: string;
  createBy: string;
  updateOn: string;
  updateBy: string;
  deleteOn: string;
  deleteBy: string;
  submitOn: string;
  submitBy: string;
  isDeleted: number;
  isSubmitted: number;
  isSecondSubmitted: number;
  isThirdSubmitted: number;
  stage: string;
  okrPeriodId: string;
  rejectReason: string;
  companyId: string;
  okrPeriodByYearId: string;
}

export interface FeedbackResponse {
  feedback?: Feedback;
  keyResult: KeyResult;
  period: string;
  status: string;
}

export interface FeedbackAuditRequest {
  category?: string;
  periodBySeasonId?: string;
  okrPeriodByYearId?: string;
  createOn?: string;
  limit?: number;
}

export interface FeedbackAuditResponse {
  
  objectiveId: string;
  objectiveDescription: string;
  departmentId: string;
  departmentName: string;
  objectivePersonInCharge: string;
  objectivePersonInChargeId: string;
  keyResultId: string;
  keyResultDescription: string;
  feedback?: Feedback;
  status?: string;
  okrPeriodByYearId?: string;
}
export interface FeedbackAuditResponseByDetail {
  objectiveId: string;
  objectiveDescription: string;
  departmentId: string;
  departmentName: string;
  objectivePersonInCharge: string;
  objectivePersonInChargeId: string;
  feedbackResponses: FeedbackResponse[];
  okrPeriodByYearId?: string;
}
export interface RatingRequest {
  objectiveId: string;
  keyResultId: string;
  ratingScore: string;
  period: string;
  okrPeriodId: string;
}

export interface RatingRecordResponse {
  objectiveId: string;
  oDescription: string;
  companyName: string;
  belongToEmplName: string;
  springScore: string;
  summerScore: string;
  autumnScore: string;
  winterScore: string;
  timeType: string;
  okrPeriodId: string;
}

export interface OKRProgressReportRequest {
  year: string;
  companyId: string;
  season: string;
}
