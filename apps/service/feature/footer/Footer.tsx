import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';

const Footer = async () => {
    const t = await getTranslations();

    return (
        <footer
            className={cn(
                'sticky top-[100vh] flex w-full items-center justify-center border-t border-t-lime-300/60 bg-slate-950',
            )}
        >
            <section
                className={cn(
                    'flex w-full max-w-6xl flex-col gap-2 px-4 py-7 text-xs leading-relaxed text-slate-400 sm:px-6 sm:py-8 lg:px-8',
                )}
            >
                <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="font-semibold text-lime-200">
                        (c) 2016 Studio Nira
                    </div>
                    <div>{t('copyright')}</div>
                </div>
                <div className="pt-1">{t('bottom')}</div>
            </section>
        </footer>
    );
};

export default Footer;
