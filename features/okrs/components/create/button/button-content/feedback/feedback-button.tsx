import React from "react";
import { Button } from "@nextui-org/react";

interface feedbackProps {
  objectiveId: string;
  isSaved: boolean;
  isAllPage?: boolean;
}

export default function TrackFeedbackLink({
  objectiveId,
  isSaved,
  isAllPage,
}: feedbackProps) {
  const handleClick = () => {
    window.open("/feedback/" + objectiveId, '_blank');
  };
  return (
    <>
      {isSaved && (
        <Button
          onClick={handleClick}
          className="ml-5 btn h-8 btn-sm relative top-0 z-1 flex w-30 rounded-lg  border-2 border-b-2 border-green-600 bg-green-600 text-center  align-middle text-xs text-white hover:border-2  hover:border-black  hover:bg-green-700 "
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M8.24999 18L5.24999 20.25V15.75H2.25C1.85217 15.75 1.47064 15.5919 1.18934 15.3106C0.908034 15.0293 0.749999 14.6478 0.749999 14.25V2.25C0.749999 1.85217 0.908034 1.47064 1.18934 1.18934C1.47064 0.908034 1.85217 0.749999 2.25 0.749999H18.75C19.1478 0.749999 19.5293 0.908034 19.8106 1.18934C20.0919 1.47064 20.25 1.85217 20.25 2.25V6.71484"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M5.24999 5.24999H15.75"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M5.24999 9.74999H8.24999"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M23.25 18.75H20.25V23.25L15.75 18.75H11.25V9.74999H23.25V18.75Z"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M19.5 15H15"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
            </g>
          </svg>
          {!isAllPage ? "開始反饋" : "查看反饋"}
          {/* <link  className="text-stroke-400" href={"/feedback/" + objectiveId}>
        
      </link> */}
        </Button>
      )}
      {isSaved === false && (
        <Button
          onClick={handleClick}
          className="ml-5 btn h-8 btn-sm relative top-0 z-1 flex w-30 rounded-lg  border-2 border-b-2 border-rose-600 bg-rose-500 text-center  align-middle text-xs text-white hover:border-2  hover:border-black  hover:bg-rose-600 "
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M8.24999 18L5.24999 20.25V15.75H2.25C1.85217 15.75 1.47064 15.5919 1.18934 15.3106C0.908034 15.0293 0.749999 14.6478 0.749999 14.25V2.25C0.749999 1.85217 0.908034 1.47064 1.18934 1.18934C1.47064 0.908034 1.85217 0.749999 2.25 0.749999H18.75C19.1478 0.749999 19.5293 0.908034 19.8106 1.18934C20.0919 1.47064 20.25 1.85217 20.25 2.25V6.71484"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M5.24999 5.24999H15.75"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M5.24999 9.74999H8.24999"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M23.25 18.75H20.25V23.25L15.75 18.75H11.25V9.74999H23.25V18.75Z"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M19.5 15H15"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
            </g>
          </svg>
          {!isAllPage ? "開始反饋" : "查看反饋"}
          {/* <link  className="text-stroke-400" href={"/feedback/" + objectiveId}>
          
        </link> */}
        </Button>
      )}
    </>
  );
}
