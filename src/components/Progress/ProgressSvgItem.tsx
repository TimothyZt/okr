import { Button } from "@nextui-org/button";
import React from "react";
import CatchRejectReasons from "../../../features/okrs/components/create/button/create-external/reject-reason-button";
interface Props {
  status: string; // 1. NoStart 2. Doing 3.Complete
  objectiveId?: string;
  auditBackManagementId?: string;
  isAudit: boolean;
}
const ProgressSvgItem = ({
  status,
  objectiveId,
  auditBackManagementId,
  isAudit,
}: Props) => {
  return (
    <>
      {status === "NoStart" && (
        <svg
          width="50px"
          height="50px"
          viewBox="-13.2 -13.2 50.40 50.40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#07cf93"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </g>
        </svg>
      )}

      {status === "Auditing" && (
        <svg
          width="50px"
          height="40px"
          viewBox="-13.2 -13.2 50.40 50.40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#40f276"
          strokeWidth="0.00024000000000000003"
          transform="rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="0.096"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              fill="#05cc80"
            />{" "}
            <circle cx="12" cy="12" r="5.25" fill="#05cc80" />{" "}
          </g>
        </svg>
      )}

      {status === "Completed" && (
        <svg
          width="50px"
          height="40px"
          viewBox="-13.2 -13.2 50.40 50.40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#00c278"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M16.5163 8.93451L11.0597 14.7023L8.0959 11.8984"
              stroke="#00c278"
              strokeWidth="1.7759999999999998"
            />
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke="#00c278"
              strokeWidth="1.7759999999999998"
            />
          </g>
        </svg>
      )}
      {status === "Refused" && isAudit && (
        <svg
          width="29px"
          height="25px"
          viewBox="-80 -50 700 700"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns-xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>error</title>{" "}
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              {" "}
              <g
                id="add"
                fill="#e61919"
                transform="translate(42.666667, 42.666667)"
              >
                {" "}
                <path
                  d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z"
                  id="error"
                >
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      )}
      {status === "Refused" && !isAudit&& (
        <CatchRejectReasons
          oId={objectiveId!}
          managementId={auditBackManagementId!}
          isCreateAudit={true}
        />
      )}
    </>
  );
};

export default ProgressSvgItem;
