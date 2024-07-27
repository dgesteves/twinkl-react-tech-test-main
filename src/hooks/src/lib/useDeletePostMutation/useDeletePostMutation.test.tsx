import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useDeletePostMutation } from '.';
import { deletePost } from '@twinkl-react-tech-test-main/services';
import { vi, describe, it, expect, Mock } from 'vitest';
import { POSTS_QUERY_KEY } from '@twinkl-react-tech-test-main/constants';
import { PaginatedPosts } from '@twinkl-react-tech-test-main/types';

vi.mock('@twinkl-react-tech-test-main/services');

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useDeletePostMutation', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should delete a post successfully', async () => {
    const previousData: PaginatedPosts = {
      pages: [
        {
          data: [
            { id: 1, title: 'Post 1', userId: 1, body: 'Body 1' },
            { id: 2, title: 'Post 2', userId: 2, body: 'Body 2' },
          ],
          nextPage: undefined,
          totalPages: 1,
        },
      ],
      pageParams: [],
    };
    queryClient.setQueryData([POSTS_QUERY_KEY, 'post'], previousData);

    (deletePost as Mock).mockResolvedValueOnce(1);

    const { result } = renderHook(() => useDeletePostMutation('post'), {
      wrapper,
    });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => expect(result.current.isPending).toBe(false));

    const updatedData = queryClient.getQueryData([
      POSTS_QUERY_KEY,
      'post',
    ]) as PaginatedPosts;

    expect(updatedData.pages[0].data).not.toContainEqual(
      expect.objectContaining({ id: 1 })
    );
  });

  it('should handle errors correctly', async () => {
    (deletePost as Mock).mockRejectedValueOnce(
      new Error('Error deleting post')
    );

    const { result } = renderHook(() => useDeletePostMutation('post'), {
      wrapper,
    });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
