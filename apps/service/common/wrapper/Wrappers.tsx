'use client';

import ClientProvider from '@/common/wrapper/ClientProvider';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataProvider from '@/common/wrapper/DataProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface Props {
    children: ReactNode;
    googleClientId: string;
}

const Wrappers = ({ children, googleClientId }: Props) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={googleClientId}>
                <ClientProvider>
                    <DataProvider>{children}</DataProvider>
                </ClientProvider>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    );
};

export default Wrappers;
