import { getPaginatedFilteredPosts } from './index';
import { axiosInstance } from '../../axiosInstance.ts';
import {
  ErrorMessages,
  TOTAL_COUNT_HEADER,
} from '@twinkl-react-tech-test-main/constants';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../../axiosInstance.ts');

describe('getPaginatedFilteredPosts', () => {
  const mockGet = vi.fn();
  axiosInstance.get = mockGet;

  it('returns paginated posts with next page when there are more pages', async () => {
    mockGet.mockResolvedValueOnce({
      data: [{ id: 1, title: 'Post 1' }],
      headers: { [TOTAL_COUNT_HEADER]: '20' },
    });

    const result = await getPaginatedFilteredPosts({
      queryKey: ['posts', ''],
    });

    expect(result).toEqual({
      data: [{ id: 1, title: 'Post 1' }],
      nextPage: 2,
      totalPages: 2,
    });
  });

  it('returns paginated posts without next page when on the last page', async () => {
    mockGet.mockResolvedValueOnce({
      data: [{ id: 1, title: 'Post 1' }],
      headers: { [TOTAL_COUNT_HEADER]: '10' },
    });

    const result = await getPaginatedFilteredPosts({
      pageParam: 2,
      queryKey: ['posts', ''],
    });

    expect(result).toEqual({
      data: [{ id: 1, title: 'Post 1' }],
      nextPage: undefined,
      totalPages: 1,
    });
  });

  it('returns paginated posts with search term', async () => {
    mockGet.mockResolvedValueOnce({
      data: [{ id: 1, title: 'Filtered Post' }],
      headers: { [TOTAL_COUNT_HEADER]: '1' },
    });

    const result = await getPaginatedFilteredPosts({
      queryKey: ['posts', 'Filtered'],
    });

    expect(result).toEqual({
      data: [{ id: 1, title: 'Filtered Post' }],
      nextPage: undefined,
      totalPages: 1,
    });
  });

  it('throws an error when the request fails', async () => {
    mockGet.mockRejectedValueOnce(new Error('Network Error'));

    await expect(
      getPaginatedFilteredPosts({
        queryKey: ['posts', ''],
      })
    ).rejects.toThrow(ErrorMessages.FETCH_POSTS_ERROR);
  });
});
