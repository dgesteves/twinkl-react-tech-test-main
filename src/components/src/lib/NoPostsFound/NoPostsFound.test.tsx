import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NoPostsFound } from '.';
import { describe, it, expect } from 'vitest';

describe('NoPostsFound', () => {
  it('renders the message correctly', () => {
    render(<NoPostsFound message="No posts available" />);
    expect(screen.getByText('No posts available')).toBeInTheDocument();
  });

  it('renders a long message', () => {
    const longMessage = 'a'.repeat(1000);
    render(<NoPostsFound message={longMessage} />);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<NoPostsFound message="No posts available" />);
    const divElement = screen.getByText('No posts available');
    expect(divElement).toHaveClass(
      'flex items-center justify-center h-full w-full text-2xl font-bold'
    );
  });
});
