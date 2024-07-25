import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import {
  ERROR_MESSAGE,
  INTERSECTION_OBSERVER_THRESHOLD,
  LOAD_NEXT_PAGE_TEXT,
  NO_POSTS_FOUND_TEXT,
  POSTS_DEBOUNCE_DELAY,
  REMOVE_BUTTON_TEXT,
  SEARCH_PLACEHOLDER,
} from '@twinkl-react-tech-test-main/constants';
import {
  useCustomInView,
  useDeletePostMutation,
  usePaginatedPosts,
} from '@twinkl-react-tech-test-main/hooks';
import {
  LoadingIndicator,
  NoPostsFound,
  SearchInput,
  PostList,
  ErrorMessage,
} from '@twinkl-react-tech-test-main/components';
import { PaginatedPosts } from '@twinkl-react-tech-test-main/types';

export function PostsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedPosts(searchTerm);

  const { mutate } = useDeletePostMutation(searchTerm);

  const { ref, inView } = useCustomInView(
    INTERSECTION_OBSERVER_THRESHOLD,
    isLoading || isFetchingNextPage
  );

  const debouncedSearchTerm = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, POSTS_DEBOUNCE_DELAY),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') return;

    debouncedSearchTerm(e.target.value.trim());
  };

  const handleDelete = (id: number) => {
    mutate(id);
  };

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) return <ErrorMessage message={ERROR_MESSAGE} />;

  return (
    <main
      className={
        'flex flex-col justify-center items-center h-full min-h-screen p-5 max-w-[600px] mx-auto'
      }
    >
      <SearchInput
        placeholder={SEARCH_PLACEHOLDER}
        onChange={handleInputChange}
      />
      <PostList
        data={data as PaginatedPosts}
        handleDelete={handleDelete}
        removeButtonText={REMOVE_BUTTON_TEXT}
      />
      {hasNextPage && (
        <LoadingIndicator
          ref={ref}
          isFetching={isFetchingNextPage}
          loadText={LOAD_NEXT_PAGE_TEXT}
        />
      )}
      {!data?.pages.at(0)?.data.length && !isLoading && (
        <NoPostsFound message={NO_POSTS_FOUND_TEXT} />
      )}
    </main>
  );
}
