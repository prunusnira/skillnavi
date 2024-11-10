'use client';

import ClientProvider from '@/module/wrapper/clientProvider';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
    children: ReactNode;
}

const Wrappers = ({ children }: Props) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ClientProvider>{children}</ClientProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
};

export default Wrappers;
