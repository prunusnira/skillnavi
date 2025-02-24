'use client';

import { cn } from '@/module/util/cn';
import InputFormItem from '@/component/common/form/InputFormItem';
import ButtonRounded from '@/component/common/button/ButtonRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { LINK_MAIN, PUBLICEP } from '@/url/url';

const LoginForm = () => {
    const t = useTranslations('user.login');

    return (
        <section className={'flex-col-center m-4'}>
            {/* 인풋 폼 영역 */}
            <section className={cn('flex-col-center gap-2')}>
                <InputFormItem
                    label={t('placeholder.id')}
                    placeholder={t('placeholder.id')}
                    id="id"
                    type="text"
                    labelWidth={100}
                />
                <InputFormItem
                    label={t('placeholder.pw')}
                    placeholder={t('placeholder.pw')}
                    id="pw"
                    type="password"
                    labelWidth={100}
                />
            </section>

            {/* 로그인 버튼 영역 */}
            <section className={cn('flex-col-center gap-2 my-4')}>
                <ButtonRounded
                    text="Login"
                    fixedWidth={200}
                />
                <ButtonRounded
                    icon={
                        <FontAwesomeIcon
                            className={cn('text-xl pr-2 h-5')}
                            icon={faGoogle}
                        />
                    }
                    text="Sign in with Google"
                    fixedWidth={200}
                    onClick={() => {
                        signIn('google', {
                            callbackUrl: `${PUBLICEP}${LINK_MAIN}`,
                        });
                    }}
                />
                <ButtonRounded
                    icon={
                        <FontAwesomeIcon
                            className={cn('text-xl pr-2 h-5')}
                            icon={faXTwitter}
                        />
                    }
                    text="Sign in with X"
                    fixedWidth={200}
                    onClick={() => {
                        signIn('twitter', {
                            callbackUrl: LINK_MAIN,
                        });
                    }}
                />
            </section>
        </section>
    );
};

export default LoginForm;
