import { cookies } from "next/headers";
import { appFetch } from "../../../lib/request/fetch";
import {
  currentPeriodCacheTag,
  Department,
  DepartmentDto,
  departmentsCacheTag,
  departmentsInCompanyCodeCacheTag,
  FilterCompaniesDtos,
  filterDepartmentsCacheTag,
  Indicator,
  indicatorSourceCacheTag,
  KRType,
  krTypeCacheTag,
  oneOrgChartCacheTag,
  OrgChart,
  orgChartCacheTag,
  orgChartInDeptCodeCacheTag,
  orgChartInEmplNumCacheTag,
  OrgChartRequest,
  Period,
  periodCacheTag,
  StrategicTheme,
  strategicThemesCacheTag,
} from "../dtos/baseinfo-dtos";
import {
  currentPeriodLink,
  departmentsInCompanyCodeLink,
  departmentsLink,
  filterDepartmentsLink,
  indicatorSourceLink,
  krTypeLink,
  oneOrgChartLink,
  orgChartInDeptLink,
  orgChartInEmplNumLink,
  orgChartLink,
  periodLink,
  strategicThemesLink,
} from "./api-urls";

export async function getStrategicThemes(okrPeriodId:string): Promise<StrategicTheme[]> {
  const response = await appFetch(strategicThemesLink(okrPeriodId), {
    method: "GET",
    next: { tags: [strategicThemesCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getIndicatorSource(): Promise<Indicator[]> {
  const response = await appFetch(indicatorSourceLink(), {
    method: "GET",
    next: { tags: [indicatorSourceCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getKRType(): Promise<KRType[]> {
  const response = await appFetch(krTypeLink(), {
    method: "GET",
    next: { tags: [krTypeCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getOrgChart(): Promise<OrgChart[]> {
  const response = await appFetch(orgChartLink(), {
    method: "GET",
    next: { tags: [orgChartCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getOneOrgChart(id: string): Promise<OrgChart> {
  const response = await appFetch(oneOrgChartLink(id), {
    method: "GET",
    next: { tags: [oneOrgChartCacheTag(id)] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getOrgChartInEmplNum(
  emplNum: string,
): Promise<OrgChart[]> {
  const response = await appFetch(orgChartInEmplNumLink(emplNum), {
    method: "GET",
    next: { tags: [orgChartInEmplNumCacheTag(emplNum)] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getOrgChartInDept(deptCode: string): Promise<OrgChart[]> {
  const response = await appFetch(orgChartInDeptLink(deptCode), {
    method: "GET",
    next: { tags: [orgChartInDeptCodeCacheTag(deptCode)] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getDepartments(): Promise<DepartmentDto> {
  const response = await appFetch(departmentsLink(), {
    method: "GET",
    next: { tags: [departmentsCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getDepartmentsInCompanyCode(
  code: string,
): Promise<Department[]> {
  const response = await appFetch(departmentsInCompanyCodeLink(code), {
    method: "GET",
    next: { tags: [departmentsInCompanyCodeCacheTag(code)] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getFilterDepartments(): Promise<FilterCompaniesDtos> {
  const response = await appFetch(filterDepartmentsLink(), {
    method: "GET",
    next: { tags: [filterDepartmentsCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getPeriod(): Promise<Period[]> {
  const response = await appFetch(periodLink(), {
    method: "GET",
    next: { tags: [periodCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}

export async function getCurrentPeriod(): Promise<Period> {
  const response = await appFetch(currentPeriodLink(), {
    method: "GET",
    next: { tags: [currentPeriodCacheTag()] },
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return await response.json();
}
