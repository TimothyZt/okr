import React from "react";
import { Button, useDisclosure, Link } from "@nextui-org/react";

interface feedbackProps {
  objectiveId: string;
}

export default function RatingLink({ objectiveId }: feedbackProps) {
  const handleRatingClick=()=>{
    window.open("/rating/"+objectiveId,"_blank")
  }
  return (
    <>
      <Button onClick={handleRatingClick} className="btn inline-block btn-xs btn-ghost text-green-500 rounded-none">
        {/* <Link className="text-green-500" href={"/rating/" + objectiveId} target="_blank">
          評分
        </Link> */}
        评分
      </Button>
    </>
  );
}
