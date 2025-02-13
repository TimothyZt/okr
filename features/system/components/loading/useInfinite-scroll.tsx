"use client";

import { useCallback, useRef, useState } from "react";

export interface IInfiniteScrollInitials<TQuery, TNode> {
  initialQuery: TQuery;
  initialData: IInfiniteScrollData<TNode>;
}

export interface IInfiniteScrollData<TNode> {
  lastItemId: string | null;
  nodes: TNode[];
}

export function useInfiniteScroll<TNode, TQuery>(
  initials: IInfiniteScrollInitials<TQuery, TNode>,
  getLimit: (query: TQuery) => number | null | undefined,
  getQuery: (initialQuery: TQuery, lastItemId: string | null) => TQuery,
  getData: (query: TQuery) => Promise<IInfiniteScrollData<TNode>>,
) {
  const { initialQuery } = initials;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const getHasMore = useCallback(
    (
      query: TQuery,
      newData: IInfiniteScrollData<TNode>,
      oldData?: IInfiniteScrollData<TNode>,
    ) => {
      if (oldData && oldData.lastItemId == newData.lastItemId) {
        return false;
      }

      return (
        newData.nodes.length >= (getLimit(query) ?? 1) &&
        newData.lastItemId != null
      );
    },
    [getLimit],
  );

  const [listData, setListData] = useState(initials.initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(getHasMore(initialQuery, listData));

  /**
   * Reference: https://www.youtube.com/watch?v=WIASshZpyCc
   */
  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      observerRef.current = new IntersectionObserver(async ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!listData.lastItemId) return;
        if (!hasMore) return;
        if (loading) return;

        setLoading(true);

        const query = getQuery(initialQuery, listData.lastItemId);
        const data = await getData(query);
        // If no new data
        setHasMore(getHasMore(query, data, listData));

        if (data.nodes.length > 0) {
          setListData({
            lastItemId: data.lastItemId,
            nodes: [...listData.nodes, ...data.nodes],
          });
        }

        setLoading(false);
      });
      if (node) {
        observerRef.current.observe(node);
      }
    },
    [initialQuery, getHasMore, getQuery, getData, listData, loading, hasMore],
  );

  return { listData, loading, hasMore, sentinelRef };

  // function calculateHasMore(
  //   query: TQuery,
  //   newData: IInfiniteScrollData<TNode>,
  //   oldData?: IInfiniteScrollData<TNode>,
  // ) {
  //   if (oldData && oldData.lastItemId == newData.lastItemId) {
  //     return false;
  //   }

  //   return (
  //     newData.nodes.length >= (getLimit(query) ?? 1) &&
  //     newData.lastItemId != null
  //   );
  // }
}