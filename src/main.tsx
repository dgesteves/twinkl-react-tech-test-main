import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PostsPage } from '@twinkl-react-tech-test-main/pages';
import { APPLICATION_ROOT_ID } from '@twinkl-react-tech-test-main/constants';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById(APPLICATION_ROOT_ID) as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PostsPage />
    </QueryClientProvider>
  </StrictMode>
);
