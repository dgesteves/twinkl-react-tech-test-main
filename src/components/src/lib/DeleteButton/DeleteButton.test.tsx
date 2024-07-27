import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteButton } from '.';
import { vi, describe, it, expect } from 'vitest';

describe('DeleteButton', () => {
  it('renders children correctly', () => {
    const handleDelete = vi.fn();
    render(
      <DeleteButton postId={1} handleDelete={handleDelete}>
        Delete
      </DeleteButton>
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls handleDelete with correct postId on click', () => {
    const handleDeleteMock = vi.fn();
    render(
      <DeleteButton postId={1} handleDelete={handleDeleteMock}>
        Delete
      </DeleteButton>
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(handleDeleteMock).toHaveBeenCalledWith(1);
  });

  it('applies correct styles to the button', () => {
    const handleDelete = vi.fn();
    render(
      <DeleteButton postId={1} handleDelete={handleDelete}>
        Delete
      </DeleteButton>
    );
    const button = screen.getByText('Delete');
    expect(button).toHaveClass(
      'bg-red-500 text-white border-none p-2 rounded-md cursor-pointer hover:bg-red-600 hover:shadow-lg active:bg-red-700 active:shadow-lg focus:bg-red-600 focus:shadow-lg outline-none'
    );
  });

  it('does not call handleDelete if button is not clicked', () => {
    const handleDeleteMock = vi.fn();
    render(
      <DeleteButton postId={1} handleDelete={handleDeleteMock}>
        Delete
      </DeleteButton>
    );
    expect(handleDeleteMock).not.toHaveBeenCalled();
  });
});
