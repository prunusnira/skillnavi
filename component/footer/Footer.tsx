import { getTranslations } from 'next-intl/server';
import { cn } from '@/module/util/cn';

const Footer = async () => {
    const t = await getTranslations('footer');
    return (
        <footer
            className={cn(
                'w-full bg-black flex justify-center items-center bg-gray-400',
            )}
        >
            <section
                className={cn(
                    'flex flex-col w-full max-w-[1920px] gap-2 text-white text-sm px-10 py-8',
                )}
            >
                <div>(c) 2016 Nira</div>
                <div>{t('fanpage')}</div>
            </section>
        </footer>
    );
};

export default Footer;
