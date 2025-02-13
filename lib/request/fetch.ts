import "server-only";

import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { AppError, AppErrorType, ConnectionAppError } from "../error/app-error";
/**
 * Fetch data and throw {@link AppError} if status code does not indicate success.
 * @param url
 * @param options
 * @returns
 */
export async function appFetch(
  url: string | URL | Request,
  options: RequestInit,
): Promise<Response> {
  let response;
  try {
    response = await fetch(url, options);
  } catch (e) {
    console.log(
      `Connection error in appFetch: ${e instanceof Error ? e.message : e}`,
    );
    throw new ConnectionAppError();
  }

  console.log(`appFetch: ${url} ${response.status}`);

  if (response.ok) return response;

  const errorData = await readContent(response);
  console.log(
    `Error in appFetch: ${response.status} data: ${errorData ? JSON.stringify(errorData) : "none"}`,
  );
  if (response.status in AppErrorType)
    throw new AppError({
      code: response.status as AppErrorType,
      message: response.statusText,
      data: errorData,
    });
  else {
    throw new AppError({
      code: AppErrorType.unknown,
      message: "Unknown error",
      data: errorData,
    });
  }
}

async function readContent(response: Response) {
  let content: any = await response.text();
  try {
    if (content !== "") content = JSON.parse(content);
  } catch (ex) {
    console.error(
      `cannot read content from response: ${ex}\nText content: \n${content}`,
    );
  }

  return content;
}

/**
 * Forward set-cookie headers to the client response.
 * @param response
 */
export async function forwardSetCookies(response: Response) {
  for (let cookie of response.headers.getSetCookie()) {
    const c = parseSetCookie(cookie);
    if (c) cookies().set(c);
  }
}

function createApiUrl(url?: string) {
  //http://jp-erpdev:8097/
  if (!url) url = process.env.BACKEND_URL!;
  
  if (!url.endsWith("/")) url += "/";
  return url;
}

export const apiUrl = createApiUrl(process.env.NEXT_PUBLIC_API_PREFIX);
