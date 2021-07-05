import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

export const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Router>
  );
}
