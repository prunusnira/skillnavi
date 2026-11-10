'use client';

import { screenshot } from '@/lib/screenshot/screenshot';
import { ButtonRounded } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import { createLog } from '@skillnavi/data/src/log/createLog';
import type { RefObject } from 'react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSession } from '@/feature/auth/hook/useSession';

interface Props {
    targetRef: RefObject<HTMLDivElement | null>;
}

export const ButtonScreenshot = ({ targetRef }: Props) => {
    const t = useTranslations('skill');
    const session = useSession();
    const [isGenerating, setIsGenerating] = useState(false);
    const isGeneratingRef = useRef(false);

    const handleScreenshot = async () => {
        const targetEl = targetRef.current;

        if (!targetEl) {
            alert('Screenshot failed');
            return;
        }

        if (isGeneratingRef.current) return;

        isGeneratingRef.current = true;
        setIsGenerating(true);

        try {
            await new Promise<void>((resolve) => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => resolve());
                });
            });

            await screenshot(targetEl, 'SkillNavigator-SkillTable');
            createLog({
                uid: session?.profile?.id ?? 0,
                action: 'click',
                data: 'skill_screenshot',
            });
        } finally {
            isGeneratingRef.current = false;
            setIsGenerating(false);
        }
    };

    return (
        <>
            <ButtonRounded text={t('screenshot')} onClick={handleScreenshot} />
            {isGenerating &&
                createPortal(
                    <div
                        className={
                            'fixed inset-0 z-[9999] flex items-center justify-center bg-black/70'
                        }
                        role={'status'}
                        aria-live={'polite'}
                    >
                        <div className={'text-xl font-bold text-white'}>
                            스크린샷 생성중...
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
};
