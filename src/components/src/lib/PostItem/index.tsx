import { Page, Post } from '@twinkl-react-tech-test-main/types';
import { DeleteButton } from '../DeleteButton';

type PostItemProps = {
  page: Page;
  handleDelete: (id: number) => void;
  removeButtonText: string;
};

export function PostItem({
  page,
  handleDelete,
  removeButtonText,
}: PostItemProps) {
  return page.data.map((post: Post) => (
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
      <DeleteButton postId={post.id} handleDelete={handleDelete}>
        {removeButtonText}
      </DeleteButton>
    </li>
  ));
}
