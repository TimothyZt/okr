import { TableCell, TableRow } from "@nextui-org/table";
import { Audit_OResponse } from "../../../../dtos/audit-dtos";
import { Objective } from "../../../../dtos/okr-dtos";
interface auditProgressProps {
  auditO?:Audit_OResponse
  objective?:Objective;
  isSubWriter:boolean;
}

export default function AuditProgressTableItem({
  auditO,isSubWriter, objective
}: auditProgressProps) {
  return (
    <>
      <TableRow key="1">
        <TableCell className="border-b-2 border-slate-200 text-sm">
          {isSubWriter ?  objective?.desc :auditO?.description}
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">
          {isSubWriter ?  objective?.departmentName :auditO?.companyName}
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">
          {isSubWriter ?  objective?.belongToEmplN :auditO?.belongToEmplN}
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">
          {isSubWriter ? "未提交至审核" :auditO?.submitterOn}
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">

          <div>
            催交
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
