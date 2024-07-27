import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useGetPaginatedPosts } from '.';
import { getPaginatedFilteredPosts } from '@twinkl-react-tech-test-main/services';
import { vi, describe, it, expect, Mock } from 'vitest';

vi.mock('@twinkl-react-tech-test-main/services');

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetPaginatedPosts', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should return initial loading state', async () => {
    (getPaginatedFilteredPosts as Mock).mockResolvedValue({
      data: [],
      nextPage: undefined,
      totalPages: 0,
    });

    const { result } = renderHook(() => useGetPaginatedPosts('post'), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should fetch and return data correctly', async () => {
    (getPaginatedFilteredPosts as Mock).mockResolvedValue({
      data: ['post1', 'post2'],
      nextPage: 2,
      totalPages: 3,
    });

    const { result } = renderHook(() => useGetPaginatedPosts('post'), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.pages[0].data).toEqual(['post1', 'post2']);
  });

  it('should handle errors correctly', async () => {
    (getPaginatedFilteredPosts as Mock).mockRejectedValue(
      new Error('Error fetching posts')
    );

    const { result } = renderHook(() => useGetPaginatedPosts('post'), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('should fetch next page correctly', async () => {
    (getPaginatedFilteredPosts as Mock)
      .mockResolvedValueOnce({
        data: ['post1', 'post2'],
        nextPage: 2,
        totalPages: 3,
      })
      .mockResolvedValueOnce({
        data: ['post3', 'post4'],
        nextPage: 3,
        totalPages: 3,
      });

    const { result } = renderHook(() => useGetPaginatedPosts('post'), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    result.current.fetchNextPage();

    await waitFor(() => expect(result.current.isFetchingNextPage).toBe(false));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.pages[1].data).toEqual(['post3', 'post4']);
  });
});
