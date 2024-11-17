'use client';

import ClientProvider from '@/module/wrapper/ClientProvider';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataProvider from '@/module/wrapper/DataProvider';

interface Props {
    children: ReactNode;
}

const Wrappers = ({ children }: Props) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ClientProvider>
                    <DataProvider>{children}</DataProvider>
                </ClientProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
};

export default Wrappers;
