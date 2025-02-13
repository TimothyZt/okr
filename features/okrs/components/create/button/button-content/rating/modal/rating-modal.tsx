import { Button } from "@nextui-org/button";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useState } from "react";
import Draggable from "react-draggable";
import { unpackActionResponse } from "../../../../../../../../lib/server-actions/action-response";
import { PeriodDto } from "../../../../../../../system/dtos/system-dtos";
import { getCurrentSystemPeriod } from "../../../../../../../system/extension/system-extension";
import { FeedbackResponse, RatingRecordResponse } from "../../../../../../dtos/feedback-dtos";
import { Objective } from "../../../../../../dtos/okr-dtos";
import {
  getFeedbackResponsesAction,
  getObjectiveAction,

} from "../../../../../../server-actions/actions";
import RatingModalContainer from "./rating-container-modal";

interface Props {
  systemPeriods: PeriodDto[];
  objectiveId: string;
  setRatingRecordss: (rs:RatingRecordResponse[]) => void;
}

export default function RatingModal({
  systemPeriods,
  objectiveId,
  setRatingRecordss
}: Props) {
  const currentPeriod = getCurrentSystemPeriod(systemPeriods)!;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [os, SetOs] = useState<Objective>();
  const [data1, SetData1] = useState<FeedbackResponse[]>([]);
  const [data2, SetData2] = useState<FeedbackResponse[]>([]);
  const [data3, SetData3] = useState<FeedbackResponse[]>([]);
  const [data4, SetData4] = useState<FeedbackResponse[]>([]);
  const handleTextareaMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  const handlePreDataClick = async () => {
    const fbResponses = unpackActionResponse(
      await getFeedbackResponsesAction(objectiveId),
    );
    const feedbacks = fbResponses.filter(
      (x) =>
        x.feedback &&
        x.feedback.isSubmitted === 1 &&
        x.feedback.isSecondSubmitted === 1,
    );
    const objectives = unpackActionResponse(
      await getObjectiveAction(objectiveId)
    )
    SetOs(objectives);
    let data11 = feedbacks.filter((x) => x.period === "FirstSeason");
    let data22 = feedbacks.filter((x) => x.period === "SecondSeason");
    let data33 = feedbacks.filter((x) => x.period === "ThirdSeason");
    let data44 = feedbacks.filter((x) => x.period === "ForthSeason");
    SetData1(data11);
    SetData2(data22);
    SetData3(data33);
    SetData4(data44);
    onOpen();
  };

  return (
    <>
      <Button
        onClick={handlePreDataClick}
        className="btn btn-ghost btn-xs inline-block rounded-none text-green-500"
      >
        评分
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-h-[860px] w-[1200px]
         border-2 border-slate-400 bg-slate-50 shadow-2xl mt-10"
      >
        <Draggable>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col h-12 gap-1 border-b-2 border-slate-400">
                上级评分
                </ModalHeader>
                <ModalBody className=" overflow-auto">
                  <RatingModalContainer
                    objective={os!}
                    currentPeriod={currentPeriod}
                    systemPeriods={systemPeriods}
                    data1={data1}
                    data2={data2}
                    data3={data3}
                    data4={data4}
                    setRatingRecordss={setRatingRecordss}
                  />
                </ModalBody>
                {/* <ModalFooter className="h-12">
                  <Button  color="danger" variant="light" onPress={ onClose}>
                    取消
                  </Button>
                </ModalFooter> */}
              </>
            )}
          </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
