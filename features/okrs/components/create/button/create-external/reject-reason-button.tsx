import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Draggable from "react-draggable";
import { AuditRejectResponse } from "../../../../dtos/audit-dtos";
import { unpackActionResponse } from "../../../../../../lib/server-actions/action-response";
import { getAuditRejectResponseAction } from "../../../../server-actions/actions";
import AuditButton from "../../../audit/audit-content/audit-button";
import AuditProgress from "../../../audit/audit-content/audit-step-detail";

interface Props {
  oId: string;
  managementId: string;
  isCreateAudit:boolean;
}
export default function CatchRejectReasons({ oId, managementId,isCreateAudit }: Props) {
  const [auditRejectResponse, setAuditRejectResponse] =
    useState<AuditRejectResponse>();
  const handleCancel = () => {
    onOpen;
  };
  const handleOpenClick = async () => {
    onOpen();
    setAuditRejectResponse(
      unpackActionResponse(await getAuditRejectResponseAction(managementId)),
    );
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    {isCreateAudit&&
      <button onClick={handleOpenClick}>
       <svg width="29px" height="25px" viewBox="-80 -50 700 700" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink" fill="#000000">

       <g id="SVGRepo_bgCarrier" stroke-width="0"/>
       
       <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
       
       <g id="SVGRepo_iconCarrier"> <title>error</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#e61919" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z" id="error"> </path> </g> </g> </g>
       
       </svg></button>
    }
    {
       !isCreateAudit  && <button
       color="default"
       onClick={handleOpenClick}
       className="btn btn-xs w-18 rounded-full bg-rose-600 text-slate-200"
     >
       驳回原因
     </button>
    }
     
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-100 w-203
       border-2 border-slate-400 bg-white shadow-2xl "
      >
        <Draggable>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="h-10 w-full border-b-2 border-slate-300 bg-slate-50 shadow-14">
                  <div className="relative w-full text-black">驳回原因</div>
                </ModalHeader>
                <ModalBody className="mt-2 overflow-y-auto">
                  <div className="w-full overflow-scroll bg-white">
                    <div className="mt-3 w-full border-slate-300 bg-white">
                      <div className="ml-2">
                        目标(O: {auditRejectResponse?.objectiveDescription}
                        )的驳回原因:
                      </div>
                      <textarea
                        value={auditRejectResponse?.auditObjectiveRejectReason}
                        disabled={true}
                        className="ml-3 mt-1 w-11/12 grow border-2 border-stroke p-1"
                      />
                  
                      <div className=" flex-col">
                        {auditRejectResponse?.auditKeyResultRejectReasons.map(
                          (akr) => (
                            <div
                              key={akr.keyResultDescription}
                              className="ml-2 mt-2"
                            >
                              关键结果(KR {akr.keyResultDescription})
                              的驳回原因:
                              <textarea
                                value={akr.audidKeyResultRejectReason}
                                disabled={true}
                                className="ml-1 mt-1 w-11/12 grow border-2 border-stroke p-1"
                              />
                            </div>
                            
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
