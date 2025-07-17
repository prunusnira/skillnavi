'use client';

import Portal from '@/feature/portal/component/Portal';
import { useTranslations } from 'next-intl';
import { Profile } from '@/feature/profile/data/Profile';
import { useState } from 'react';
import { updateOpenData } from '@/feature/profile/api/updateOpenData';
import { useMutation } from '@tanstack/react-query';
import { ButtonStandard } from '@skillnavi/ui';
import { RadioGroup } from '@skillnavi/ui/src/radio';
import radioStyle from '@skillnavi/service/common/Radio.item.module.css';

interface Props {
    profile: Profile;
    closePortal: () => void;
}

const OpenDataPortal = ({ profile, closePortal }: Props) => {
    const t = useTranslations('common.yesno');
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
                    className={radioStyle.radioButton}
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
