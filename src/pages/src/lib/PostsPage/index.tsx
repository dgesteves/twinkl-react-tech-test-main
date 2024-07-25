import React, { useState, useCallback, useEffect } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';
import {
  ERROR_MESSAGE,
  INITIAL_PAGE,
  INTERSECTION_OBSERVER_THRESHOLD,
  LOAD_NEXT_PAGE_TEXT,
  NO_POSTS_FOUND_TEXT,
  POSTS_DEBOUNCE_DELAY,
  POSTS_PER_PAGE,
  POSTS_QUERY_KEY,
  REMOVE_BUTTON_TEXT,
  SEARCH_PLACEHOLDER,
} from '@twinkl-react-tech-test-main/constants';
import {
  deletePost,
  getPaginatedFilteredPosts,
} from '@twinkl-react-tech-test-main/services';
import { Page, PaginatedPosts, Post } from '@twinkl-react-tech-test-main/types';

export function PostsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, POSTS_DEBOUNCE_DELAY),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') return;

    debouncedSearchTerm(e.target.value.trim());
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEY, searchTerm],
    queryFn: ({ pageParam, queryKey }) =>
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

  // Use Intersection Observer to trigger loading more posts
  const { ref, inView } = useInView({
    threshold: INTERSECTION_OBSERVER_THRESHOLD,
    initialInView: false,
    skip: isLoading || isFetchingNextPage,
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    retry: false,
    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({
        queryKey: [POSTS_QUERY_KEY, searchTerm],
      });
      const previousData = queryClient.getQueryData([
        POSTS_QUERY_KEY,
        searchTerm,
      ]);
      queryClient.setQueryData(
        [POSTS_QUERY_KEY, searchTerm],
        (oldPaginatedPosts: PaginatedPosts) => {
          return {
            ...oldPaginatedPosts,
            pages: oldPaginatedPosts.pages.map((page: Page) => ({
              ...page,
              data: page.data.filter((post: Post) => post.id !== postId),
            })),
          };
        }
      );
      return { previousData };
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#ff4d4d',
          color: 'white',
        }}
      >
        {ERROR_MESSAGE}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Posts Management</h1>
      <input
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        onChange={handleInputChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.data.map((post: Post) => (
              <li
                key={post.id}
                style={{
                  marginBottom: '20px',
                  padding: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    backgroundColor: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {REMOVE_BUTTON_TEXT}
                </button>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {hasNextPage && (
        <div
          ref={ref}
          style={{
            height: '50px',
            margin: '20px 0',
            backgroundColor: '#f0f0f0',
          }}
        >
          {isFetchingNextPage && LOAD_NEXT_PAGE_TEXT}
        </div>
      )}
      {!data?.pages.at(0)?.data.length && (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
          }}
        >
          {NO_POSTS_FOUND_TEXT}
        </div>
      )}
    </div>
  );
}
