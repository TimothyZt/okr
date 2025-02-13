import { cookies } from "next/headers";
import { appFetch, forwardSetCookies } from "../../../lib/request/fetch";
import { Me, UserRequest } from "../dtos/users-dto";
import { loginLink, meLink } from "./api-urls";
import { meCacheTag } from "../server-actions/user";

export async function postLogin(
  user:UserRequest
): Promise<void> {
  const response = await appFetch(process.env.BACKEND_URL+'auth/login?useCookies=true', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  await forwardSetCookies(response);
  
}

export async function getMe(): Promise<Me> {
  const response = await appFetch(meLink(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: cookies().toString(),
    },
    next: { tags: [meCacheTag()] },
  });
  const result : Me = await response.json();
  return result; 
}

