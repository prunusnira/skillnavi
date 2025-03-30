import type { Metadata } from 'next';
import './globals.scss';
import Wrappers from '@/common/wrapper/Wrappers';
import { getLocale, getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
    title: 'Skill Navigator',
    description: 'GITADORA Skill Simulator',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={cn(
                    'w-full flex flex-col justify-start items-center',
                )}
            >
                <NextIntlClientProvider messages={messages}>
                    <Wrappers>
                        <Suspense>{children}</Suspense>
                    </Wrappers>
                </NextIntlClientProvider>
                <div id="portal" />
            </body>
        </html>
    );
}
