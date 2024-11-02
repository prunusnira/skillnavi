import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/component/header/Header';
import Footer from '@/component/footer/footer';
import Wrappers from '@/module/wrapper/wrappers';
import { getLocale, getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';

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
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Wrappers>
                        <Suspense>
                            <Header />
                            {children}
                            <Footer />
                        </Suspense>
                    </Wrappers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
