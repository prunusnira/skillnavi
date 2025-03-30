'use client';

import Portal from '@/feature/portal/component/Portal';
import RadioGroup from '@/common/radio/Radio.group';
import { useTranslations } from 'next-intl';
import { Profile } from '@/feature/profile/data/Profile';
import ButtonStandard from '@/common/button/ButtonStandard';
import { useState } from 'react';
import { updateOpenData } from '@/feature/profile/api/updateOpenData';
import { useMutation } from '@tanstack/react-query';

interface Props {
    profile: Profile;
    closePortal: () => void;
}

const OpenDataPortal = ({ profile, closePortal }: Props) => {
    const t = useTranslations('user.profile.dataopen');
    const [
        open,
        setOpen,
    ] = useState<'true' | 'false'>(profile.openinfo ? 'true' : 'false');

    const { mutate } = useMutation({
        mutationKey: [
            'profile',
            'opendata',
        ],
        mutationFn: updateOpenData,
        onSuccess: () => closePortal(),
    });

    return (
        <Portal title={'Change Data Open Status'}>
            <section className={'flex-col-center gap-[30px]'}>
                <RadioGroup<'true' | 'false'>
                    radioGroupName={'opendata'}
                    itemList={[
                        {
                            id: 'dataopen_true',
                            display: t('yes'),
                            value: 'true',
                        },
                        {
                            id: 'dataopen_false',
                            display: t('no'),
                            value: 'false',
                        },
                    ]}
                    currentValue={open}
                    onChange={(value) => setOpen(value)}
                />
                <div className={'flex'}>
                    <ButtonStandard
                        onClick={() =>
                            mutate({
                                uid: profile.id.toString(),
                                open,
                            })
                        }
                        text={'OK'}
                    />
                    <ButtonStandard
                        text={'Cancel'}
                        onClick={closePortal}
                    />
                </div>
            </section>
        </Portal>
    );
};

export default OpenDataPortal;
