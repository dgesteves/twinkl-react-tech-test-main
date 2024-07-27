import { PaginatedPosts } from '@twinkl-react-tech-test-main/types';
import { PostGroup } from '../PostGroup';
import { useEffect } from 'react';
import { useCustomInView } from '@twinkl-react-tech-test-main/hooks';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@twinkl-react-tech-test-main/constants';
import { LoadingIndicator } from '../LoadingIndicator';

type PostListProps = {
  data: PaginatedPosts;
  searchTerm: string;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export function PostList({
  data,
  searchTerm,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: PostListProps) {
  const { ref, inView } = useCustomInView(
    INTERSECTION_OBSERVER_THRESHOLD,
    isLoading || isFetchingNextPage
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <ul className="flex flex-col gap-2 overflow-y-auto">
      {data?.pages.map((page, pageIndex) => (
        <PostGroup key={pageIndex} page={page} searchTerm={searchTerm} />
      ))}
      {hasNextPage && (
        <LoadingIndicator ref={ref} isFetching={isFetchingNextPage} />
      )}
    </ul>
  );
}
