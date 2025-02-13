import { apiUrl } from "../../../lib/request/fetch";

const login = () => "/auth/login";
const register = () => "/auth/register";
const logout = () => "/auth/logout";
const me = ()=>"/me"

export function loginLink() {
  return new URL(login(), apiUrl);
}

export function registerLink() {
  return new URL(register(), apiUrl);
}

export function logoutLink() {
  return new URL(logout(), apiUrl);
}

export function meLink() {
  return new URL(me(), apiUrl);
}
