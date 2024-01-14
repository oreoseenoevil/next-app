import { cache } from 'react';

import { QueryClient } from 'react-query';

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
}

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));