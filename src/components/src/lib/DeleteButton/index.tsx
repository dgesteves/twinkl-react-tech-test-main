import { ReactNode } from 'react';

type DeleteButtonProps = {
  postId: number;
  handleDelete: (id: number) => void;
  children: ReactNode;
};

export function DeleteButton({
  postId,
  handleDelete,
  children,
}: DeleteButtonProps) {
  return (
    <button
      onClick={() => handleDelete(postId)}
      className="bg-red-500 text-white border-none p-2 rounded-md cursor-pointer hover:bg-red-600 hover:shadow-lg active:bg-red-700 active:shadow-lg focus:bg-red-600 focus:shadow-lg outline-none"
    >
      {children}
    </button>
  );
}
