import { useState, useCallback, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import {
  ERROR_MESSAGE,
  NO_POSTS_FOUND_TEXT,
  POSTS_DEBOUNCE_DELAY,
  SEARCH_PLACEHOLDER,
} from '@twinkl-react-tech-test-main/constants';
import { useGetPaginatedPosts } from '@twinkl-react-tech-test-main/hooks';
import {
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
  } = useGetPaginatedPosts(searchTerm);

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

  if (isError) return <ErrorMessage message={ERROR_MESSAGE} />;

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden">
      <SearchInput
        placeholder={SEARCH_PLACEHOLDER}
        onChange={handleInputChange}
      />
      <PostList
        data={data as PaginatedPosts}
        searchTerm={searchTerm}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
      {!data?.pages.at(0)?.data.length && !isLoading && (
        <NoPostsFound message={NO_POSTS_FOUND_TEXT} />
      )}
    </main>
  );
}
