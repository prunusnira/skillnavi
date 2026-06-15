import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';

const Footer = async () => {
    const t = await getTranslations();

    return (
        <footer
            className={cn(
                'sticky top-[100vh] flex w-full items-center justify-center border-t bg-white',
                'dark:border-slate-800 dark:bg-slate-950',
            )}
        >
            <section
                className={cn(
                    'flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400',
                )}
            >
                <div>(c) 2016 Nira, Made with NextJS</div>
                <div>{t('copyright')}</div>
                <div>{t('bottom')}</div>
            </section>
        </footer>
    );
};

export default Footer;
