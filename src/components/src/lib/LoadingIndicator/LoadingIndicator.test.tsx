import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LoadingIndicator } from '.';
import { describe, it, expect } from 'vitest';
import { LOAD_NEXT_PAGE_TEXT } from '@twinkl-react-tech-test-main/constants';
import { createRef } from 'react';

describe('LoadingIndicator', () => {
  it('renders loading text when isFetching is true', () => {
    const { getByText } = render(<LoadingIndicator isFetching={true} />);
    expect(getByText(LOAD_NEXT_PAGE_TEXT)).toBeInTheDocument();
  });

  it('does not render loading text when isFetching is false', () => {
    const { queryByText } = render(<LoadingIndicator isFetching={false} />);
    expect(queryByText(LOAD_NEXT_PAGE_TEXT)).toBeNull();
  });

  it('forwards ref to the div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<LoadingIndicator isFetching={false} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
