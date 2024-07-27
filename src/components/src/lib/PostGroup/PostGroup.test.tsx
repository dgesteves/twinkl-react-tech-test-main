import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostGroup } from '.';
import { Page } from '@twinkl-react-tech-test-main/types';
import { REMOVE_BUTTON_TEXT } from '@twinkl-react-tech-test-main/constants';
import { useDeletePostMutation } from '@twinkl-react-tech-test-main/hooks';
import { vi, describe, it, expect, Mock } from 'vitest';

vi.mock('@twinkl-react-tech-test-main/hooks');

const mockUseDeletePostMutation = useDeletePostMutation as Mock;

describe('PostGroup', () => {
  const mockMutate = vi.fn();
  const page: Page = {
    data: [
      { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
    ],
    nextPage: undefined,
    totalPages: 1,
  };

  beforeEach(() => {
    mockUseDeletePostMutation.mockReturnValue({ mutate: mockMutate });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders post items correctly', () => {
    render(<PostGroup page={page} searchTerm="Post" />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Body 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
    expect(screen.getByText('Body 2')).toBeInTheDocument();
  });

  it('calls mutate function with correct id when delete button is clicked', () => {
    render(<PostGroup page={page} searchTerm="Post" />);
    const deleteButtons = screen.getAllByText(REMOVE_BUTTON_TEXT);
    fireEvent.click(deleteButtons[0]);
    expect(mockMutate).toHaveBeenCalledWith(1);
  });

  it('does not render any post items if page data is empty', () => {
    render(
      <PostGroup
        page={{ data: [], nextPage: undefined, totalPages: 0 }}
        searchTerm="Post"
      />
    );
    expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Body 1')).not.toBeInTheDocument();
  });

  it('renders delete button with correct text', () => {
    render(<PostGroup page={page} searchTerm="Post" />);
    const deleteButtons = screen.getAllByText(REMOVE_BUTTON_TEXT);
    expect(deleteButtons).toHaveLength(2);
  });
});
