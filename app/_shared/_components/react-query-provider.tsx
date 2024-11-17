'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type PropsWithChildren } from 'react';

export function ReactQueryProvider({ children }: PropsWithChildren): JSX.Element {
  const [queryClient] = useState<QueryClient>(() => {
    return new QueryClient();
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
