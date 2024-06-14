import { useCallback, useEffect } from "react";

interface UseInfiniteWindowScrollParams {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function useInfiniteWindowScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteWindowScrollParams) {
  const fetchMoreOnBottomReached = useCallback(() => {
    if (document.body) {
      const { scrollHeight } = window.document.body;
      // Once the user has scrolled within 400px of the bottom of the window, fetch more data if possible
      if (
        scrollHeight - window.scrollY - window.innerHeight < 400 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        void fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // TODO @YohanTz: Replace with framer-motion
  // A check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached();

    window.addEventListener("scroll", fetchMoreOnBottomReached);
    return () => {
      window.removeEventListener("scroll", fetchMoreOnBottomReached);
    };
  }, [fetchMoreOnBottomReached]);
}
