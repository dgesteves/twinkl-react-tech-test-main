import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { PostList } from '.';
import { PostGroup } from '../PostGroup';
import { PaginatedPosts } from '@twinkl-react-tech-test-main/types';

vi.mock('../PostGroup');

const mockData: PaginatedPosts = {
  pages: [
    {
      data: [
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
        },
      ],
      nextPage: 2,
      totalPages: 2,
    },
    {
      data: [
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
        },
        {
          userId: 4,
          id: 4,
          title: 'title 4',
          body: 'body 4',
        },
      ],
      nextPage: undefined,
      totalPages: 2,
    },
  ],
  pageParams: [1, 2],
};

describe('PostList', () => {
  it('renders a list of groups of posts', async () => {
    render(
      <PostList
        data={mockData}
        searchTerm=""
        isLoading={false}
        isFetchingNextPage={false}
        hasNextPage={false}
        fetchNextPage={vi.fn()}
      />
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(PostGroup).toHaveBeenCalledTimes(2);
  });
});
