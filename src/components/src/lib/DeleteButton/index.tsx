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
      style={{
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
