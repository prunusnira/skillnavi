import type { Metadata } from 'next';
import './globals.scss';
import Wrappers from '@/common/wrapper/Wrappers';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { cn } from '@/lib/cn';
import '@skillnavi/ui/dist/index.css';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Skill Navigator',
    description: 'GITADORA Skill Simulator',
};

export default async function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>,
) {
    const locale = await getLocale();
    const messages = await getMessages();
    const theme = cookies().get('theme');

    return (
        <html lang={locale} className={theme?.value}>
        <body
            className={cn(
                'w-full flex flex-col justify-start items-center',
            )}
        >
        <NextIntlClientProvider messages={messages}>
            <Wrappers>
                {children}
            </Wrappers>
        </NextIntlClientProvider>
        <div id="portal" />
        </body>
        </html>
    );
}
