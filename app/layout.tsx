import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/component/header/Header';
import Footer from '@/component/footer/footer';
import Wrappers from '@/module/wrapper/wrappers';
import { getLocale, getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { cn } from '@/module/util/cn';

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
            <body className={cn('w-full flex-col-center')}>
                <NextIntlClientProvider messages={messages}>
                    <Wrappers>
                        <Suspense>
                            <Header />
                            <main
                                className={cn(
                                    'max-w-screen-xl w-full min-h-full flex-col-center pt-[60px]',
                                )}
                            >
                                {children}
                            </main>
                            <Footer />
                        </Suspense>
                    </Wrappers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
