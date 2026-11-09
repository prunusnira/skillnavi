import type { Metadata } from 'next';
import './globals.css';
import Wrappers from '@/common/wrapper/Wrappers';
import { getLocale } from 'next-intl/server';
import { cn } from '@/lib/cn';
import '@skillnavi/ui/dist/index.css';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
    title: 'Skill Navigator',
    description: 'GITADORA Skill Simulator',
    icons: {
        icon: [
            {
                url: '/skill-navigator-mark.svg',
                type: 'image/svg+xml',
            },
            {
                url: '/favicon.ico',
                sizes: 'any',
            },
        ],
        shortcut: '/favicon.ico',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const theme = (await cookies()).get('theme');

    return (
        <html
            lang={locale}
            className={theme?.value}
        >
            <body
                className={cn(
                    'w-full flex flex-col justify-start items-center',
                )}
            >
                <Wrappers googleClientId={process.env.GOOGLE_CLIENT_ID ?? ''}>
                    {children}
                </Wrappers>
                <div id="portal" />
            </body>
        </html>
    );
}
