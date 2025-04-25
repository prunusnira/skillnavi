'use client';

import { ButtonStandard } from '@skillnavi/ui';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { resetUser } from '@/feature/profile/api/resetUser';
import { useRouter } from '@/i18n/routing';
import { LINK_MAIN, LINK_PROFILE_SELF } from '@/url/url';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export const ResetDecision = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const t = useTranslations('reset.alert');

    const { mutateAsync } = useMutation({
        mutationKey: [
            'profile',
            'reset',
            id,
        ],
        mutationFn: () => resetUser(id),
        onSuccess: () => {
            signOut();
            if (typeof window !== 'undefined') {
                window.location.href = LINK_MAIN;
            } else {
                alert(t('success'));
            }
        },
        onError: () => {
            alert(t('invalid'));
        },
    });

    return (
        <section className={'flex-center gap-[8px]'}>
            <ButtonStandard
                text={'YES'}
                onClick={() => {
                    mutateAsync();
                }}
            />
            <ButtonStandard
                text={'NO'}
                onClick={() => router.replace(LINK_PROFILE_SELF)}
            />
        </section>
    );
};
