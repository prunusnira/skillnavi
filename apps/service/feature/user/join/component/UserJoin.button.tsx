'use client';

import { ButtonStandard } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import { useSession } from '@/feature/auth/hook/useSession';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount } from '@/feature/user/join/api/createAccount';
import { useRouter } from '@/i18n/routing';
import { LINK_MAIN } from '@/url/url';
import { logout } from '@/feature/auth/api/logout';

export const UserJoinButton = () => {
    const t = useTranslations('user.join');
    const session = useSession();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['session'] });
            router.push(LINK_MAIN);
            router.refresh();
        },
    });

    const handleCancel = async () => {
        await logout();
        queryClient.setQueryData(['session'], {
            authenticated: false,
            profile: null,
        });
        router.push(LINK_MAIN);
        router.refresh();
    };

    return (
        <div className={'flex gap-[20px] justify-center'}>
            <ButtonStandard
                text={t('btnsign')}
                onClick={() => {
                    if (session?.authenticated) {
                        mutate();
                    }
                }}
            />
            <ButtonStandard
                text={t('btndecline')}
                onClick={() => {
                    void handleCancel();
                }}
            />
        </div>
    );
};
