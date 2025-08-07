
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props<T> {
    queryKey: unknown[];
    queryFn: () => Promise<T>;
    children: ReactNode;
}

const PrefetchQuery = async <T,>({ queryKey, queryFn, children }: Props<T>) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<T>({ queryKey, queryFn });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
};

export default PrefetchQuery;
