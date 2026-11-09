'use client';

import { useRouter } from '@/i18n/routing';
import { ButtonStandard } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import Card from '@/common/card/Card';
import { LINK_PROFILE_RESET } from '@/url/url';

interface Props {
    userId: number;
}

export const CriticalButton = ({ userId }: Props) => {
    const t = useTranslations('profile.critical');
    const router = useRouter();

    return (
        <Card title={t('title')}>
            <ButtonStandard
                text={t('button.reset')}
                onClick={() => router.push(LINK_PROFILE_RESET(userId))}
                customTextClass={'bg-red-700 text-white font-semibold'}
            />
        </Card>
    );
};
