"use client";
import React from "react";
import { Feedback } from "../../../../../dtos/feedback-dtos";
import { KeyResult } from "../../../../../dtos/okr-dtos";

interface Props {
    feedback: Feedback;
    keyResult:KeyResult;
  isSubmitted:boolean;
}

export default function RatingTagColor({
  isSubmitted,
  feedback,
  keyResult
}: Props) {
    const sS = parseFloat(feedback.selfScore);
    let hS = 0.2;
    if(!isSubmitted && feedback.highScore !="")  {
        hS = parseFloat(feedback.highScore);
    } 
  return (
    <>
      {isSubmitted && sS === 0.0 && (
        <button className="btn bg-rose-600 btn-xs w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
        {isSubmitted && sS === 0.3 && (
        <button className="btn btn-xs bg-orange-400 w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
        {isSubmitted && sS === 0.7  && (
        <button className="btn btn-xs bg-yellow-400 w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
        {isSubmitted && sS === 1.0 && (
        <button className="btn btn-xs bg-green-500 w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}

{!isSubmitted && hS === 0.2 && (
        <button className="btn btn-xs bg-slate-600 w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
{!isSubmitted && hS === 0.0 && (
        <button className="btn bg-rose-600 btn-xs w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
        {!isSubmitted && hS === 0.3 && (
        <button className="btn btn-xs bg-orange-400 w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
        {!isSubmitted && hS === 0.7  && (
        <button className="btn btn-xs bg-yellow-400 w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
        {!isSubmitted && hS === 1.0 && (
        <button className="btn btn-xs bg-green-500 w-14 rounded-full text-white">
          KR{keyResult.sortId}
        </button>
      )}
    </>
  );
}
