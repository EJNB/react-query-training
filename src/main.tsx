import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from './App';
import './index.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3, // If fetch fail React Query tries three times more
            cacheTime: 300_000, // 5m
            staleTime: 10 * 1000, // 10s After 10s the data requested it'll be state, however React Query will request the data again
            // React Query goes to do refetch on each situation: window focus, on reconnect or on mount component.
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false
        }
    }
})

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
      </QueryClientProvider>
  </React.StrictMode>
);
