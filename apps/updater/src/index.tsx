import './index.css';
import '@skillnavi/ui/dist/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Crawler from './feature/crawler/component/Crawler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const el = document.getElementById('crawler-root');
const root = createRoot(el);

root.render(
    <StrictMode>
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
    </StrictMode>,
);
