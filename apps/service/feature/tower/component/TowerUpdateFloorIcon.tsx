'use client';

import { ButtonRounded, ButtonStandard } from '@skillnavi/ui';
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
            <ButtonStandard
                text={t('button')}
                onClick={() => {
                    setDisplayIcon(true);
                }}
                customTextClass={'bg-blue-500 text-sm'}
            />
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
