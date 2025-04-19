'use client';

import { ButtonRounded, ButtonStandard } from '@skillnavi/ui';
import { useMutation } from '@tanstack/react-query';
import { changeTowerIcon } from '@/feature/tower/api/changeTowerIcon';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import Portal from '@/feature/portal/component/Portal';
import Image from 'next/image';
import { IMG } from '@/url/url';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
    icon: string;
}

export const TowerUpdateFloorIcon = ({ icon }: Props) => {
    const user = useAtomValue(atomUser);
    const [displayIcon, setDisplayIcon] = useState<boolean>(false);
    const t = useTranslations('tower.changeIcon');

    const { mutate } = useMutation({
        mutationKey: ['tower', 'floor', 'icon'],
        mutationFn: changeTowerIcon,
        onSuccess: () => {
            setDisplayIcon(false);
        }
    });

    if (!user) return null;

    return (
        <>
            <ButtonStandard
                text={t('button')}
                onClick={() => {
                    setDisplayIcon(true);
                }}
                customClass={'bg-blue-500 text-sm'}
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
                        <span>
                            {t('dialog')}
                        </span>
                        <div className={'flex gap-[10px]'}>
                            <ButtonRounded
                                text={'YES'}
                                onClick={() => {
                                    mutate({
                                        uid: user.id,
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