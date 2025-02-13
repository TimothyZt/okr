import { TableCell, TableRow } from "@nextui-org/table";
import RatingLink from "./rating-link";
import { RatingRecordResponse } from "../../../../../dtos/feedback-dtos";
interface ratingrecordProps {
  ratingRecord: RatingRecordResponse;
  key:number;
}

export default function RatingTableItem({
  ratingRecord,
  key
}: ratingrecordProps) {
  return (
    <>
      <TableRow key="1">
        <TableCell className="border-b-2 border-slate-200 text-sm">
          O1
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">
          C0000
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">
          Test
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">
          年度
        </TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">0</TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">0</TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">0</TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">0</TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">0</TableCell>
        <TableCell className="border-b-2 border-slate-200 text-sm">
          <div>
            <RatingLink objectiveId={""}></RatingLink>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
