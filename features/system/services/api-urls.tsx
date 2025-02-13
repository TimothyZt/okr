import { apiUrl } from "../../../lib/request/fetch";

const employeeFile = () => "/employees-file/import";
const employeePost = ()=>`/employees/`
const employee = (id:string) =>`/employees/${id}`;

const userCompanyAssignments = () => `/user-company-relations/`;
const userCompanyAssignment = (id:string) => `/user-company-relations/${id}`;


const period = ()=> `/period-settings/`;
const periodById = (id:string)=>`/period-settings/${id}`

export function employeeFileLink() {
  return new URL(employeeFile(), apiUrl);
}

export function employeePostLink() {
  return new URL(employeePost(), apiUrl);
}

export function employeeLink(id:string) {
  return new URL(employee(id), apiUrl);
}

export function userCompanyAssignmentsLink() {
  return new URL(userCompanyAssignments(), apiUrl);
}

export function userCompanyAssignmentLink(id:string) {
  return new URL(userCompanyAssignment(id), apiUrl);
}

export function periodLink() {
  return new URL(period(), apiUrl);
}

export function periodByIdLink(id:string) {
  return new URL(periodById(id), apiUrl);
}


