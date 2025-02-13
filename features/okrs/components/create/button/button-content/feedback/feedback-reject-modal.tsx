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
import { putFeedbackToUndoAction } from "../../../../../server-actions/actions";
import { unpackActionResponse } from "../../../../../../../lib/server-actions/action-response";
import { Bounce, toast } from "react-toastify";

interface Props {
  fbId: string;
  oId: string;
  role: string;
}

export default function FeedbackRejectModal({ fbId, oId, role }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rejectReason, setRejectReason] = useState("");
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRejectReason(event.target.value);
  };

  const handleUndoOKRClick = async () => {
    unpackActionResponse(
      await putFeedbackToUndoAction(oId, fbId, role+": "+rejectReason),
    );
    toast.success("反饋駁回成功", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    onOpen;
  };
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <button
        className="btn btn-sm absolute bottom-0 right-34 mb-4 w-25 border-2 border-green-400 bg-white text-green-600 "
        onClick={onOpen}
      >
        駁回
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
                        placeholder="請填寫駁回原因"
                        className="h-30 w-full rounded-lg border-[1.5px] border-slate-400  bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                        value={rejectReason}
                        onChange={handleTextareaChange}
                        onMouseDown={handleTextareaMouseDown}
                      ></textarea>
                    </div>
                  </ModalBody>
                  <ModalFooter className="p-0">
                    <Button className="mr-5" onPress={handleUndoOKRClick}>
                      確認
                    </Button>
                  </ModalFooter>
                </div>
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
