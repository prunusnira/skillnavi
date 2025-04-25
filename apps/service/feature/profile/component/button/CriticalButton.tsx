'use client';

import { useRouter } from '@/i18n/routing';
import { ButtonStandard } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import Card from '@/common/card/Card';
import { LINK_PROFILE_RESET } from '@/url/url';

export const CriticalButton = () => {
    const t = useTranslations('profile.critical');
    const router = useRouter();
    const { id } = useParams();
    const user = useAtomValue(atomUser);

    if (!user || user.id !== Number(id)) {
        return null;
    }

    return (
        <Card title={t('title')}>
            <ButtonStandard
                text={t('button.reset')}
                onClick={() => router.push(LINK_PROFILE_RESET(user.id))}
                customClass={'bg-red-700 text-white font-semibold'}
            />
        </Card>
    );
};
