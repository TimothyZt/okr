
import { PeriodDto } from "../../../../system/dtos/system-dtos";
import { Me } from "../../../../users/dtos/users-dto";
import { FeedbackResponse } from "../../../dtos/feedback-dtos";
import { Objective, KeyResult } from "../../../dtos/okr-dtos";
import OKRCard from "../../create/create-card";


interface IProps {
  me: Me;
  objective: Objective;
  krs: KeyResult[];
  fbs: FeedbackResponse[];
  systemPeriods: PeriodDto[];
  currentSystemPeriod: PeriodDto;
  season: string;
}

export async function SingleObjective({
  me,
  objective,
  krs,
  fbs,
  systemPeriods,
  currentSystemPeriod,
  season,
}: IProps) {
  return (
    <OKRCard
      objective={objective}
      keyResults={krs.filter((x) => x.belongOid === objective.id)}
      isAllPage={true}
      feedbacks={fbs.filter((x) => x.keyResult.belongOid === objective.id)}
      me={me}
      myRespCompany={me.departmentDto!}
      systemPeriods={systemPeriods}
      currentSystemPeriod={currentSystemPeriod}
      selectSeasonName={season}
    />
  );
}
