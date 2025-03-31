'use client';

import Portal from '@/feature/portal/component/Portal';
import { useTranslations } from 'next-intl';
import InputFormItem from '@/common/form/InputFormItem';
import { useState } from 'react';
import { Profile } from '@/feature/profile/data/Profile';
import { useMutation } from '@tanstack/react-query';
import { updateComment } from '@/feature/profile/api/updateComment';
import { useRouter } from '@/i18n/routing';
import { ButtonStandard } from '@skillnavi/ui';

interface Props {
    profile: Profile;
    closePortal: () => void;
}

const CommentPortal = ({ profile, closePortal }: Props) => {
    const t = useTranslations('user.profile.changecomment');
    const router = useRouter();
    const [
        comment,
        setComment,
    ] = useState<string>(profile.comment);

    const { mutate } = useMutation({
        mutationKey: [
            'profile',
            'comment',
        ],
        mutationFn: updateComment,
        onSuccess: () => {
            closePortal();
            router.refresh();
        },
    });

    return (
        <Portal title={'Change Comment'}>
            <section className={'flex-col-center gap-[10px]'}>
                <div>{t('desc')}</div>
                <InputFormItem
                    label={'Comment'}
                    placeholder={''}
                    id={'profile.comment'}
                    type={'text'}
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                />
                <div className={'flex'}>
                    <ButtonStandard
                        onClick={() =>
                            mutate({
                                uid: profile.id.toString(),
                                comment,
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

export default CommentPortal;
