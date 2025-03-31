'use client';

import { cn } from '@/lib/cn';
// import InputFormItem from '@/common/form/InputFormItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { LINK_MAIN, PUBLICEP } from '@/url/url';
import { ButtonRounded } from '@skillnavi/ui';
// import { useState } from 'react';

const LoginForm = () => {
    // const t = useTranslations('user.login');
    // const [
    //     id,
    //     setId,
    // ] = useState<string>('');
    // const [
    //     pw,
    //     setPw,
    // ] = useState<string>('');

    return (
        <section className={'flex-col-center m-4'}>
            {/* 인풋 폼 영역 */}
            {/* TODO: credentials method */}
            {/*<section className={cn('flex-col-center gap-2')}>*/}
            {/*    <InputFormItem*/}
            {/*        label={t('placeholder.id')}*/}
            {/*        placeholder={t('placeholder.id')}*/}
            {/*        id="id"*/}
            {/*        type="text"*/}
            {/*        labelWidth={100}*/}
            {/*        value={id}*/}
            {/*        onChange={(e) => setId(e.currentTarget.value)}*/}
            {/*    />*/}
            {/*    <InputFormItem*/}
            {/*        label={t('placeholder.pw')}*/}
            {/*        placeholder={t('placeholder.pw')}*/}
            {/*        id="pw"*/}
            {/*        type="password"*/}
            {/*        labelWidth={100}*/}
            {/*        value={pw}*/}
            {/*        onChange={(e) => setPw(e.currentTarget.value)}*/}
            {/*    />*/}
            {/*</section>*/}

            {/* 로그인 버튼 영역 */}
            <section className={cn('flex-col-center gap-2 my-4')}>
                {/*<ButtonRounded*/}
                {/*    text="Login"*/}
                {/*    fixedWidth={200}*/}
                {/*/>*/}
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
                {/*<ButtonRounded*/}
                {/*    icon={*/}
                {/*        <FontAwesomeIcon*/}
                {/*            className={cn('text-xl pr-2 h-5')}*/}
                {/*            icon={faXTwitter}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    text="Sign in with X"*/}
                {/*    fixedWidth={200}*/}
                {/*    onClick={() => {*/}
                {/*        signIn('twitter', {*/}
                {/*            callbackUrl: LINK_MAIN,*/}
                {/*        });*/}
                {/*    }}*/}
                {/*/>*/}
            </section>
        </section>
    );
};

export default LoginForm;
