import { axiosInstance } from '../../axiosInstance.ts';
import { Page } from '@twinkl-react-tech-test-main/types';
import {
  ErrorLogMessages,
  ErrorMessages,
  INITIAL_PAGE,
  POSTS,
  POSTS_PER_PAGE,
  TOTAL_COUNT_HEADER,
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
  const [_, searchTerm] = queryKey;
  try {
    const response = await axiosInstance.get(POSTS, {
      params: {
        _page: pageParam,
        _limit: postsPerPage,
        q: searchTerm || undefined,
      },
    });

    const totalCount = Number(response.headers[TOTAL_COUNT_HEADER]);
    const totalPages = Math.ceil(totalCount / postsPerPage);
    const nextPage = pageParam < totalPages ? pageParam + 1 : undefined;

    return {
      data: response.data,
      nextPage,
      totalPages,
    };
  } catch (error) {
    console.error(ErrorLogMessages.FETCH_POSTS, error);
    throw new Error(ErrorMessages.FETCH_POSTS_ERROR);
  }
}
