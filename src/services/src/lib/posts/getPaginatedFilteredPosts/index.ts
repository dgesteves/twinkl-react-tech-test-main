import { axiosInstance } from '../../axiosInstance.ts';
import { Page } from '@twinkl-react-tech-test-main/types';
import {
  INITIAL_PAGE,
  POSTS,
  POSTS_PER_PAGE,
} from '@twinkl-react-tech-test-main/constants';

type GetPaginatedFilteredPostsParams = {
  pageParam?: number;
  queryKey: string[];
  postsPerPage?: number;
};

export async function getPaginatedFilteredPosts({
  pageParam = INITIAL_PAGE,
  queryKey,
  postsPerPage = POSTS_PER_PAGE,
}: GetPaginatedFilteredPostsParams): Promise<Page> {
  const [_key, searchTerm] = queryKey;
  try {
    const response = await axiosInstance.get(POSTS, {
      params: {
        _page: pageParam,
        _limit: postsPerPage,
        q: searchTerm || undefined,
      },
    });

    const totalPages = Math.ceil(
      Number(response.headers['x-total-count']) / postsPerPage
    );

    const nextPage = pageParam + 1 > totalPages ? undefined : pageParam + 1;

    return {
      data: response.data,
      nextPage,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to fetch paginated posts:', error);
    throw new Error('Error fetching paginated posts');
  }
}
