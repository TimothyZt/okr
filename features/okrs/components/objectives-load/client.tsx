"use client";


import { useEffect } from "react";
import { QueryObjectiveByTrackDto } from "../../dtos/okr-dtos";
import { IInfiniteScrollInitials, useInfiniteScroll } from "../../../system/components/loading/useInfinite-scroll";
import { loadMoreObjectivesAction } from "./loading-action";
import LoadMoreIndicator from "./load-more-indicator";


interface IProps {
  initials: IInfiniteScrollInitials<QueryObjectiveByTrackDto, JSX.Element>;
}

export function ObjectiveListClient(props: IProps) {
  const { listData, loading, hasMore, sentinelRef } = useInfiniteScroll(
    props.initials,
    (query) => query.limit,
    (initialQuery, lastItemId) => ({
      ...initialQuery,
      cursorId: lastItemId,
    }),
    loadMoreObjectivesAction,
  );
 

  return (
    <section>
      <ul>
        {listData.nodes.map((node, index) => (
          <li
            key={index}
            ref={index == listData.nodes.length - 1 ? sentinelRef : undefined}
          >
            {node}
          </li>
        ))}
      </ul>
      <LoadMoreIndicator
        loading={loading}
        hasMore={hasMore}
        i18n={{
          loading: "loadMore.loading",
          noMore: "loadMore.noMore",
        }}
      />
    </section>
  );
}