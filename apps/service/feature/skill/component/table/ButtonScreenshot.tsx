'use client';

import { screenshot } from '@/lib/screenshot/screenshot';
import { ButtonRounded } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import { createLog } from '@skillnavi/data/src/log/createLog';

interface Props {
    targetEl: HTMLDivElement | null;
}

export const ButtonScreenshot = ({ targetEl }: Props) => {
    const t = useTranslations('skill');
    const user = useAtomValue(atomUser);

    return (
        <ButtonRounded
            text={t('screenshot')}
            onClick={() => {
                if (targetEl) {
                    screenshot(targetEl, 'SkillNavigator-SkillTable');
                    createLog({
                        uid: user?.id || 0,
                        action: 'click',
                        data: 'skill_screenshot',
                    });
                } else {
                    alert('Screenshot failed');
                }
            }}
        />
    );
};
