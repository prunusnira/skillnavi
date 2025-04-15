'use client';

import { ButtonStandard } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { createAccount } from '@/feature/user/join/api/createAccount';
import { useRouter } from '@/i18n/routing';
import { LINK_MAIN } from '@/url/url';
import { sha256 } from 'js-sha256';

export const UserJoinButton = () => {
    const t = useTranslations('user.join');
    const { data } = useSession();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onSuccess: () => {
            router.push(LINK_MAIN);
        },
    });

    return (
        <div className={'flex gap-[20px] justify-center'}>
            <ButtonStandard
                text={t('btnsign')}
                onClick={() => {
                    const email = data?.user?.email?.split('@');
                    if (email && email.length >= 1 && typeof email[0] === 'string') {
                        console.log(email[0], sha256(email[0]));
                        mutate({
                            token: sha256(email[0]),
                        });
                    }
                }}
            />
            <ButtonStandard
                text={t('btndecline')}
                onClick={() => {
                    signOut({ callbackUrl: '/' });
                }}
            />
        </div>
    );
};