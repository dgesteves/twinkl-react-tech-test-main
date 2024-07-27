import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '.';
import { describe, it, expect } from 'vitest';

describe('ErrorMessage', () => {
  it('renders the error message correctly', () => {
    render(<ErrorMessage message="An error occurred" />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  it('applies correct styles to the error message', () => {
    render(<ErrorMessage message="An error occurred" />);
    const errorMessage = screen.getByText('An error occurred');
    expect(errorMessage).toHaveClass('text-center p-5 bg-red-500 text-white');
  });

  it('renders a long error message correctly', () => {
    const longMessage = 'A'.repeat(1000);
    render(<ErrorMessage message={longMessage} />);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });
});
