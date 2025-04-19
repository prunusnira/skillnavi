'use client';

import { cn } from '@/lib/cn';
import { useRouter } from '@/i18n/routing';
import { LINK_PLAYCOUNT, LINK_PROFILE_SELF, LINK_SKILL_SELF } from '@/url/url';
import { ButtonStandard } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';

const UserButton = () => {
    const router = useRouter();
    const t = useTranslations('main.user.button')
    return (
        <div className={cn('flex-center gap-2')}>
            <ButtonStandard
                text={t('profile')}
                onClick={() => router.push(LINK_PROFILE_SELF)}
            />
            <ButtonStandard
                text={t('mygf')}
                onClick={() => router.push(LINK_SKILL_SELF('gf'))}
            />
            <ButtonStandard
                text={t('mydm')}
                onClick={() => router.push(LINK_SKILL_SELF('dm'))}
            />
            <ButtonStandard
                text={t('playcount')}
                onClick={() => router.push(LINK_PLAYCOUNT)}
            />
        </div>
    );
};

export default UserButton;
