import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';

const Footer = async () => {
    const t = await getTranslations();

    return (
        <footer
            className={cn(
                'w-full flex justify-center items-center sticky top-[100vh] bg-gray-400 dark:bg-gray-950',
            )}
        >
            <section
                className={cn(
                    'flex flex-col w-full max-w-[1920px] gap-2 text-sm px-10 py-8',
                )}
            >
                <div>(c) 2016 Nira, Made with NextJS</div>
                <div>{t('bottom')}</div>
            </section>
        </footer>
    );
};

export default Footer;
