import { QueryClient } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/query-core/src/types.ts';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
} as QueryClientConfig);
