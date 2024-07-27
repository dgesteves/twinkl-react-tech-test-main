import { Page, Post } from '@twinkl-react-tech-test-main/types';
import { DeleteButton } from '../DeleteButton';
import { REMOVE_BUTTON_TEXT } from '@twinkl-react-tech-test-main/constants';
import { useDeletePostMutation } from '@twinkl-react-tech-test-main/hooks';

type PostGroupProps = {
  page: Page;
  searchTerm: string;
};

export function PostGroup({ page, searchTerm }: PostGroupProps) {
  const { mutate } = useDeletePostMutation(searchTerm);

  const handleDelete = (id: number) => {
    mutate(id);
  };

  return page.data.map(({ id, title, body }: Post) => (
    <li
      key={id}
      className="flex gap-3 border border-gray-300 rounded-md p-3 md:mx-auto md:w-1/2 md:hover:shadow-lg md:hover:border-gray-400"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-md font-semibold capitalize text-gray-800">
          {title}
        </h3>
        <p className="text-md font-light text-gray-600 pr-1">{body}</p>
      </div>
      <div className="flex flex-1 justify-end items-center">
        <DeleteButton postId={id} handleDelete={handleDelete}>
          {REMOVE_BUTTON_TEXT}
        </DeleteButton>
      </div>
    </li>
  ));
}
