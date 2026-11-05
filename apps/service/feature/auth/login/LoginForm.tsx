'use client';

import { cn } from '@/lib/cn';
import { useGoogleLogin } from '@react-oauth/google';
import { ButtonRounded } from '@skillnavi/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/routing';
import { LINK_AUTH_NEWUSER, LINK_MAIN } from '@/url/url';
import type { AuthSession } from '@/feature/auth/data/Session';
import { API_AUTH_GOOGLE, API_SESSION } from '@/url/api';

const LoginForm = () => {
    const t = useTranslations('user.login');
    const queryClient = useQueryClient();
    const router = useRouter();
    const [error, setError] = useState(false);

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async ({ code }) => {
            setError(false);

            try {
                const response = await fetch(API_AUTH_GOOGLE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XmlHttpRequest',
                    },
                    body: JSON.stringify({ code }),
                });
                if (!response.ok) {
                    throw new Error('Google sign-in failed');
                }

                const sessionResponse = await fetch(API_SESSION, {
                    cache: 'no-store',
                });
                if (!sessionResponse.ok) {
                    throw new Error('App session could not be loaded');
                }

                const session = (await sessionResponse.json()) as AuthSession;
                if (!session.authenticated) {
                    throw new Error('App session was not created');
                }

                queryClient.setQueryData(['session'], session);
                router.replace(
                    session.profile ? LINK_MAIN : LINK_AUTH_NEWUSER,
                );
                router.refresh();
            } catch {
                setError(true);
            }
        },
        onError: () => setError(true),
        onNonOAuthError: () => setError(true),
    });

    return (
        <section className={'flex-col-center m-4'}>

            {/* 로그인 버튼 영역 */}
            <section className={cn('flex-col-center gap-2 my-4')}>
                <ButtonRounded
                    icon={
                        <FontAwesomeIcon
                            className={cn('text-xl pr-2 h-5')}
                            icon={faGoogle}
                        />
                    }
                    text={t('google')}
                    fixedWidth={200}
                    onClick={googleLogin}
                />
                {error && (
                    <p className="text-sm text-red-600" role="alert">
                        {t('error')}
                    </p>
                )}
            </section>
        </section>
    );
};

export default LoginForm;
