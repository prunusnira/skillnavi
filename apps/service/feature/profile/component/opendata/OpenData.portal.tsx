'use client';

import Portal from '@/feature/portal/component/Portal';
import { useTranslations } from 'next-intl';
import { Profile } from '@/feature/profile/data/Profile';
import { useState } from 'react';
import { updateOpenData } from '@/feature/profile/api/updateOpenData';
import { useMutation } from '@tanstack/react-query';
import { ButtonStandard } from '@skillnavi/ui';
import { RadioGroup } from '@skillnavi/ui/src/radio';
import radioStyle from '@/common/Radio.item.module.css';
import { useRouter } from '@/i18n/routing';

interface Props {
    profile: Profile;
    closePortal: () => void;
}

const OpenDataPortal = ({ profile, closePortal }: Props) => {
    const t = useTranslations('common.yesno');
    const tDialog = useTranslations('profile.info.dialog');
    const router = useRouter();
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
        onSuccess: () => {
            closePortal();
            router.refresh();
        },
    });

    return (
        <Portal title={tDialog('openinfo.title')}>
            <section className={'flex-col-center gap-[30px]'}>
                <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                    {tDialog('openinfo.description')}
                </p>
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
                        text={tDialog('save')}
                    />
                    <ButtonStandard
                        text={tDialog('cancel')}
                        onClick={closePortal}
                    />
                </div>
            </section>
        </Portal>
    );
};

export default OpenDataPortal;
