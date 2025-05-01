import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep cached data for 5 minutes before considering it stale
      staleTime: 5 * 60 * 1000,
      // Cache successful responses for 1 hour
      gcTime: 60 * 60 * 1000,
      // Don't automatically refetch on window focus
      refetchOnWindowFocus: false,
      // Don't automatically refetch when reconnecting
      refetchOnReconnect: false,
      // Don't retry failed requests
      retry: 1,
    },
  },
});
