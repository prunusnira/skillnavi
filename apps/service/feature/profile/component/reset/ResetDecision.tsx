'use client';

import { ButtonStandard } from '@skillnavi/ui';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { resetUser } from '@/feature/profile/api/resetUser';
import { useRouter } from '@/i18n/routing';
import { LINK_MAIN, LINK_PROFILE_SELF } from '@/url/url';
import { useTranslations } from 'next-intl';
import { logout } from '@/feature/auth/api/logout';
import { useQueryClient } from '@tanstack/react-query';

export const ResetDecision = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const t = useTranslations('reset.alert');
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: [
            'profile',
            'reset',
            id,
        ],
        mutationFn: () => resetUser(id),
        onSuccess: async () => {
            await logout();
            queryClient.setQueryData(['session'], {
                authenticated: false,
                profile: null,
            });
            router.push(LINK_MAIN);
            router.refresh();
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
