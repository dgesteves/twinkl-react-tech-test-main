import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type LoadingIndicatorProps = {
  isFetching: boolean;
  loadText: string;
};

export const LoadingIndicator: ForwardRefExoticComponent<
  LoadingIndicatorProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, LoadingIndicatorProps>(
  ({ isFetching, loadText }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          height: '50px',
          margin: '20px 0',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isFetching && loadText}
      </div>
    );
  }
);
