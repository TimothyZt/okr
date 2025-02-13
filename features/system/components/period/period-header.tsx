"use client";

import { Me } from "../../../users/dtos/users-dto";
import CreatePeriod from "./period-new";

interface Props{
    me: Me;
}

export default function SystemPeriodHeader({me}:Props) {

  return (
    <div className="absolute right-26">
        <CreatePeriod me={me}></CreatePeriod>
    </div>
  );
}
