
import { QueryObjectiveByTrackDto } from "../../dtos/okr-dtos";
import { loadMoreObjectivesAction } from "./loading-action";
import { formatDate } from "../../../system/extension/system-extension";
import _ from "lodash";
import { ObjectiveListClient } from "./client";

interface IProps {
    okrPeriodByYearId:string;
    companyId:string;
}

export default async function ObjectiveList(props:IProps) {
    const query: QueryObjectiveByTrackDto = {
        okrPeriodByYearId: props.okrPeriodByYearId ?? "",
        companyId:props.companyId ?? "",
        createOn: formatDate(new Date()),
        limit: 2,
    };
    const objectives = await loadMoreObjectivesAction(query);
  
    // const t = await getTranslations("NotificationList");
  
    // const messages = (await getMessages()) as any;
    // const picked = _.pick(messages, "NotificationList");
  
    return (

      <ObjectiveListClient initials={{ initialQuery: query, initialData: objectives }}></ObjectiveListClient>
    );
  }