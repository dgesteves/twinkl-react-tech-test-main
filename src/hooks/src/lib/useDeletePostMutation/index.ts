import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@twinkl-react-tech-test-main/services';
import { POSTS_QUERY_KEY } from '@twinkl-react-tech-test-main/constants';
import { Page, PaginatedPosts, Post } from '@twinkl-react-tech-test-main/types';

export function useDeletePostMutation(searchTerm: string) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    retry: false,
    onMutate: async (postId) => {
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

  return { mutate };
}
