import { useInfiniteQuery } from '@tanstack/react-query';
import {
  INITIAL_PAGE,
  POSTS_PER_PAGE,
  POSTS_QUERY_KEY,
} from '@twinkl-react-tech-test-main/constants';
import { getPaginatedFilteredPosts } from '@twinkl-react-tech-test-main/services';

export function usePaginatedPosts(searchTerm: string) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEY, searchTerm],
    queryFn: ({ pageParam = INITIAL_PAGE, queryKey }) =>
      getPaginatedFilteredPosts({
        pageParam,
        queryKey,
        postsPerPage: POSTS_PER_PAGE,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.nextPage && lastPage.nextPage <= lastPage.totalPages
        ? lastPage.nextPage
        : undefined,
    initialPageParam: INITIAL_PAGE,
    retry: false,
  });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
