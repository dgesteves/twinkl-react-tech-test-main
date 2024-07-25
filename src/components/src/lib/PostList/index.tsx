import { PaginatedPosts } from '@twinkl-react-tech-test-main/types';
import { PostItem } from '../PostItem';

type PostListProps = {
  data: PaginatedPosts;
  handleDelete: (id: number) => void;
  removeButtonText: string;
};

export function PostList({
  data,
  handleDelete,
  removeButtonText,
}: PostListProps) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {data?.pages.map((page, pageIndex) => (
        <PostItem
          key={pageIndex}
          page={page}
          handleDelete={handleDelete}
          removeButtonText={removeButtonText}
        />
      ))}
    </ul>
  );
}
