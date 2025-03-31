'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { ButtonStandard } from '@skillnavi/ui';

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
                isSelected={type === 'music' || !type}
                onClick={() => changePage('music')}
            />
            <ButtonStandard
                text={t('pt')}
                isSelected={type === 'pattern'}
                onClick={() => changePage('pattern')}
            />
            <ButtonStandard
                text={t('gf')}
                isSelected={type === 'gf'}
                onClick={() => changePage('gf')}
            />
            <ButtonStandard
                text={t('dm')}
                isSelected={type === 'dm'}
                onClick={() => changePage('dm')}
            />
        </section>
    );
};

export default PlayCountType;
