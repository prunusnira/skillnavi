'use client';

import { cn } from '@/lib/cn';
import { useGoogleLogin } from '@react-oauth/google';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { ButtonRounded } from '@skillnavi/ui/src';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useTranslations } from 'next-intl';
import { onLoginFailure, onLoginSuccess } from '@/feature/auth/data/authOptions';

const LoginForm = () => {
    const t = useTranslations('user.login');

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: onLoginSuccess,
        onError: onLoginFailure,
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
            </section>
        </section>
    );
};

export default LoginForm;
