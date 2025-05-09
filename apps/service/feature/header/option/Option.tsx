'use client';

import Select from '@/common/select/Select';
import Toggle from '@/common/toggle/toggle';
import { useAtomValue } from 'jotai';
import { atomEnv } from '@/feature/env/data/AtomEnv';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { Language } from '@/feature/env/data/Language';
import { useLocale } from 'next-intl';
import useTheme from '@/feature/header/option/useTheme';

const Option = () => {
    const env = useAtomValue(atomEnv);
    const { theme, changeTheme } = useTheme();
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const locale = useLocale();

    const onChangeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLanguage = e.currentTarget.value as keyof typeof Language;

        // @ts-expect-error - next-intl에서 무시하게 함
        router.push({ pathname, params }, { locale: nextLanguage });
    };

    if (!env.option) {
        return null;
    }

    return (
        <section
            className={
                'fixed right-[20px] top-[70px] flex flex-col gap-[16px] bg-white dark:bg-gray-900 px-[20px] py-[10px] rounded-2xl shadow'
            }
        >
            {/* 테마 변경 */}
            <div className={'flex items-center'}>
                <span className={'text-sm w-[150px]'}>Dark</span>
                <div className={'w-[150px] flex justify-center'}>
                    <Toggle
                        id={'toggle-theme'}
                        value={theme === 'dark'}
                        callback={() => {
                            const next = theme === 'dark' ? 'light' : 'dark';
                            changeTheme(next);
                        }}
                    />
                </div>
            </div>

            {/* 언어 변경 */}
            <div className={'flex items-center'}>
                <span className={'text-sm w-[150px]'}>Language</span>
                <div className={'w-[150px] flex justify-center'}>
                    <Select
                        options={[
                            {
                                value: 'en',
                                display: 'English',
                            },
                            {
                                value: 'ko',
                                display: '한국어',
                            },
                            {
                                value: 'ja',
                                display: '日本語',
                            },
                        ]}
                        value={locale}
                        onChange={onChangeLocale}
                    />
                </div>
            </div>
        </section>
    );
};

export default Option;
