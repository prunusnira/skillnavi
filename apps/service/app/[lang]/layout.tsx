import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

interface Props {
    children: ReactNode;
}

const LocaleLayout = async ({ children }: Props) => {
    const [locale, messages] = await Promise.all([
        getLocale(),
        getMessages(),
    ]);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};

export default LocaleLayout;
