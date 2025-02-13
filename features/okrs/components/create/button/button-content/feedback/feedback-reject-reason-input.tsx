import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";
import Draggable from "react-draggable";

interface Props {
  rejectReason: string;
  handleTextareaMouseDown: () => void;
}

export default function FeedbackRejectInput({
  rejectReason,
  handleTextareaMouseDown,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="btn btn-xs w-25 rounded-full bg-rose-500 text-slate-200"
        onMouseDown={handleTextareaMouseDown}
        onClick={onOpen}
      >
        驳回原因
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-65 w-100  border-2 border-slate-400 bg-white shadow-2xl "
      >
        <Draggable>
          <ModalContent className="">
            {(onClose) => (
              <>
                <div className="overflow-y-auto ">
                  <ModalHeader className="flex flex-col gap-1 border-b-2 border-slate-400">
                    <div className="flex-col">
                      <label>駁回原因</label>
                    </div>
                  </ModalHeader>
                  <ModalBody className="">
                    <div className="w-12/12">
                      <textarea
                        rows={6}
                        placeholder=""
                        disabled={true}
                        className="h-30 w-full rounded-lg border-[1.5px] border-slate-400  bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                        value={rejectReason}
                      ></textarea>
                    </div>
                  </ModalBody>
                </div>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
