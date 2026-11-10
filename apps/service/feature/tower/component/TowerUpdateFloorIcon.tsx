'use client';

import { ButtonRounded } from '@skillnavi/ui';
import { useMutation } from '@tanstack/react-query';
import { changeTowerIcon } from '@/feature/tower/api/changeTowerIcon';
import Portal from '@/feature/portal/component/Portal';
import Image from 'next/image';
import { IMG } from '@/url/url';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from '@/feature/auth/hook/useSession';

interface Props {
    icon: string;
}

export const TowerUpdateFloorIcon = ({ icon }: Props) => {
    const session = useSession();
    const userId =
        session?.authenticated && session.profile
            ? session.profile.id
            : undefined;
    const [
        displayIcon,
        setDisplayIcon,
    ] = useState<boolean>(false);
    const t = useTranslations('tower.changeIcon');

    const { mutate } = useMutation({
        mutationKey: [
            'tower',
            'floor',
            'icon',
        ],
        mutationFn: changeTowerIcon,
        onSuccess: () => {
            setDisplayIcon(false);
        },
    });

    if (userId === undefined) return null;

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setDisplayIcon(true);
                }}
                className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-lime-400 hover:bg-lime-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-lime-300 dark:hover:bg-slate-700"
            >
                {t('button')}
            </button>
            {icon && displayIcon && (
                <Portal title={'Change Icon'}>
                    <section className={'flex-col-center'}>
                        <Image
                            src={`${IMG}/title/${icon}.png`}
                            alt={'icon'}
                            width={50}
                            height={50}
                        />
                        <span>{t('dialog')}</span>
                        <div className={'flex gap-[10px]'}>
                            <ButtonRounded
                                text={'YES'}
                                onClick={() => {
                                    mutate({
                                        uid: userId,
                                        icon,
                                    });
                                }}
                            />
                            <ButtonRounded
                                text={'NO'}
                                onClick={() => {
                                    setDisplayIcon(false);
                                }}
                            />
                        </div>
                    </section>
                </Portal>
            )}
        </>
    );
};
