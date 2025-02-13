import { packActionResponse } from "../../../lib/server-actions/action-response";
import { UserRequest } from "../dtos/users-dto";
import { getMe, postLogin } from "../services/user";

export async function postLoginAction(user:UserRequest) {
  return await packActionResponse(postLogin(user));
}

export async function getMeAction() {
  return await packActionResponse(getMe());
}

export function meCacheTag() {
  return `me`;
}
