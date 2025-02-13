import { Me } from "../../../../users/dtos/users-dto";
import { Audit_OResponse } from "../../../dtos/audit-dtos";

export function completedListFilter(me: Me, aOs: Audit_OResponse[]) {
  return aOs.filter((obj) => {
    return obj.auditStatus !== "Auditing" && obj.submitterId !== me.id;
  });
}

export function submittedListFilter(me: Me, aOs: Audit_OResponse[]) {
  return aOs.filter((obj) => {
    return  obj.submitterId === me.id;
  });
}
export function auditingFilter(me: Me, aOs: Audit_OResponse[]) {
  const initC = completedListFilter(me, aOs);
  const initS = submittedListFilter(me, aOs);
  return aOs.filter((x) => !initC.includes(x) && !initS.includes(x));
}
