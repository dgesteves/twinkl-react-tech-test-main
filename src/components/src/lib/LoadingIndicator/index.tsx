import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { LOAD_NEXT_PAGE_TEXT } from '@twinkl-react-tech-test-main/constants';

type LoadingIndicatorProps = {
  isFetching: boolean;
};

// This component should be an animated post skeleton loader if this was a real-world application.
export const LoadingIndicator: ForwardRefExoticComponent<
  LoadingIndicatorProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, LoadingIndicatorProps>(({ isFetching }, ref) => {
  return (
    <div
      ref={ref}
      data-testid="loading-indicator"
      className="flex justify-center border border-gray-300 rounded-md p-3 md:mx-auto md:w-1/2"
    >
      {isFetching && LOAD_NEXT_PAGE_TEXT}
    </div>
  );
});
