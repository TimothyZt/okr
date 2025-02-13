import { Button } from "@nextui-org/button";
import React from "react";

interface Props {
  approvorStatus: string;
  onOpen: () => void;
  isSubmitter: boolean;
}

export default function AuditButton({
  approvorStatus,
  onOpen,
  isSubmitter,
}: Props) {
  return (
    <div>
      {approvorStatus === "Completed" && (
        <Button
          className="btn  btn-xs h-6 w-18 rounded-none bg-green-500 text-center text-white"
          onPress={onOpen}
        >
          已通过
        </Button>
      )}

      {(approvorStatus === "Auditing"&& !isSubmitter ) && (
        <Button
          className="btn  btn-xs h-6 w-18 rounded-none bg-yellow-500  text-center text-white"
          onPress={onOpen}
        >
          待審核
        </Button>
      )}

      
      {(approvorStatus === "Auditing" && isSubmitter ) && (
        <Button
          className="btn  btn-xs h-6 w-18 rounded-none bg-blue-600  text-center text-white"
          onPress={onOpen}
        >
          審核中
        </Button>
      )}
   {(approvorStatus === "Undo"  ) && (
        <Button
          className="btn  btn-xs h-6 w-18 rounded-none bg-slate-500  text-center text-white"
          onPress={onOpen}
        >
          已撤销
        </Button>
      )}
      {(approvorStatus === "Refused" )&& (
        <Button
          className="btn  btn-xs h-6 w-18 rounded-none bg-rose-600  text-center text-white"
          onPress={onOpen}
        >
          已驳回
        </Button>
      )}
          
      {/* {(approvorStatus === "Refused" && isSubmitter ) && (
           <Button
           className="btn  btn-xs h-6 w-18 rounded-none bg-rose-600  text-center text-white"
           onPress={onOpen}
         >
           中斷
         </Button>
      )} */}
    </div>
  );
}
