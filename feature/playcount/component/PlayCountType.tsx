'use client';

import ButtonStandard from '@/common/button/ButtonStandard';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

const PlayCountType = () => {
    const t = useTranslations('user.playcount.button');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const type = searchParams.get('type');

    const changePage = (type: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('type', type);
        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <section>
            <ButtonStandard
                text={t('music')}
                bgColor={type === 'music' || !type ? 'lightgreen' : undefined}
                onClick={() => changePage('music')}
            />
            <ButtonStandard
                text={t('pt')}
                bgColor={type === 'pattern' ? 'lightgreen' : undefined}
                onClick={() => changePage('pattern')}
            />
            <ButtonStandard
                text={t('gf')}
                bgColor={type === 'gf' ? 'lightgreen' : undefined}
                onClick={() => changePage('gf')}
            />
            <ButtonStandard
                text={t('dm')}
                bgColor={type === 'dm' ? 'lightgreen' : undefined}
                onClick={() => changePage('dm')}
            />
        </section>
    );
};

export default PlayCountType;
