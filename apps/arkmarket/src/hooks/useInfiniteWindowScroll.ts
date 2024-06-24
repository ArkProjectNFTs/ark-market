import { useCallback, useEffect } from "react";

interface UseInfiniteWindowScrollParams {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
}

export default function useInfiniteWindowScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteWindowScrollParams) {
  const fetchMoreOnBottomReached = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!document.body) {
      return;
    }

    const { scrollHeight } = window.document.body;
    // Once the user has scrolled within 400px of the bottom of the window, fetch more data if possible

    if (
      scrollHeight - window.scrollY - window.innerHeight < 400 &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // TODO @YohanTz: Replace with framer-motion
  // A check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    void fetchMoreOnBottomReached();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener("scroll", fetchMoreOnBottomReached);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.removeEventListener("scroll", fetchMoreOnBottomReached);
    };
  }, [fetchMoreOnBottomReached]);
}
