import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '.';
import { vi, describe, it, expect } from 'vitest';

describe('SearchInput Component', () => {
  it('renders with the correct placeholder', () => {
    const handleChange = vi.fn();
    render(<SearchInput placeholder="Search..." onChange={handleChange} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<SearchInput placeholder="Search..." onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when input value does not change', () => {
    const handleChange = vi.fn();
    render(<SearchInput placeholder="Search..." onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies the correct class names', () => {
    const handleChange = vi.fn();
    render(<SearchInput placeholder="Search..." onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveClass(
      'shrink-0 border border-gray-300 rounded-md p-3 m-3 md:mx-auto md:w-1/3 hover:shadow-lg hover:border-gray-400 caret-gray-600 outline-none focus:border-gray-600 focus:shadow-lg'
    );
  });
});
