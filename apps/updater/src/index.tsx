import './index.css';
import '@skillnavi/ui/dist/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Crawler from './feature/crawler/component/Crawler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('crawler-root')!);
root.render(
    <React.StrictMode>
        <QueryClientProvider
            client={
                new QueryClient({
                    defaultOptions: {
                        queries: {
                            retry: 1,
                            refetchOnWindowFocus: false,
                        },
                    },
                })
            }
        >
            <Crawler />
        </QueryClientProvider>
    </React.StrictMode>,
);
