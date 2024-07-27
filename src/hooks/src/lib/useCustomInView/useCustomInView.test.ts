import { renderHook } from '@testing-library/react';
import { useCustomInView } from '.';
import { useInView } from 'react-intersection-observer';
import { vi, describe, it, expect, Mock } from 'vitest';

vi.mock('react-intersection-observer', () => ({
  useInView: vi.fn(),
}));

describe('useCustomInView', () => {
  it('returns correct ref and inView value when threshold and skip are provided', () => {
    const mockRef = vi.fn();
    const mockInView = true;
    (useInView as Mock).mockReturnValue({ ref: mockRef, inView: mockInView });

    const { result } = renderHook(() => useCustomInView(0.5, false));

    expect(result.current.ref).toBe(mockRef);
    expect(result.current.inView).toBe(mockInView);
  });

  it('handles edge case with threshold 0', () => {
    const mockRef = vi.fn();
    const mockInView = false;
    (useInView as Mock).mockReturnValue({ ref: mockRef, inView: mockInView });

    const { result } = renderHook(() => useCustomInView(0, false));

    expect(result.current.ref).toBe(mockRef);
    expect(result.current.inView).toBe(mockInView);
  });

  it('handles edge case with threshold 1', () => {
    const mockRef = vi.fn();
    const mockInView = true;
    (useInView as Mock).mockReturnValue({ ref: mockRef, inView: mockInView });

    const { result } = renderHook(() => useCustomInView(1, false));

    expect(result.current.ref).toBe(mockRef);
    expect(result.current.inView).toBe(mockInView);
  });
});
