'use client';

import { Select } from '@skillnavi/ui';
import Toggle from '@/common/toggle/toggle';
import { useSetAtom, useAtomValue } from 'jotai';
import { atomEnv } from '@/feature/env/data/AtomEnv';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef } from 'react';
import { Language } from '@/feature/env/data/Language';
import { useLocale, useTranslations } from 'next-intl';
import useTheme from '@/feature/header/option/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const localeSegments = new Set<string>(Object.values(Language));

const stripLocalePrefixes = (pathname: string) => {
    const segments = pathname.split('/');

    while (segments.length > 1 && localeSegments.has(segments[1] ?? '')) {
        segments.splice(1, 1);
    }

    return segments.join('/') || '/';
};

const Option = () => {
    const env = useAtomValue(atomEnv);
    const setEnv = useSetAtom(atomEnv);
    const { theme, changeTheme } = useTheme();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('navbar');
    const popoverRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!env.option) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Node)) {
                return;
            }

            if (
                popoverRef.current?.contains(target) ||
                (target instanceof Element &&
                    target.closest('[data-settings-trigger]'))
            ) {
                return;
            }

            setEnv({ option: false });
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setEnv({ option: false });
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [env.option, setEnv]);

    const onChangeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLanguage = e.currentTarget.value as keyof typeof Language;
        const safePathname = stripLocalePrefixes(pathname);
        const query = searchParams.toString();
        const hash = window.location.hash;
        const href = `${safePathname}${query ? `?${query}` : ''}${hash}`;

        router.push(href, { locale: nextLanguage });
        setEnv({ option: false });
    };

    if (!env.option) {
        return null;
    }

    return (
        <section
            ref={popoverRef}
            className={
                'settings-popover fixed right-4 top-20 z-50 flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-4 sm:right-6'
            }
            aria-label={t('settings')}
        >
            <div
                className={
                    'flex items-center justify-between border-b border-slate-200/70 pb-2 dark:border-white/10'
                }
            >
                <h2
                    className={
                        'text-sm font-semibold text-slate-800 dark:text-white'
                    }
                >
                    {t('settings')}
                </h2>
                <button
                    type="button"
                    aria-label={t('closeSettings')}
                    className={
                        'rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                    }
                    onClick={() => setEnv({ option: false })}
                >
                    <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                </button>
            </div>

            {/* 테마 변경 */}
            <div
                className={
                    'grid grid-cols-[minmax(5rem,1fr)_minmax(0,1.3fr)] items-center gap-3'
                }
            >
                <span
                    className={
                        'text-sm font-medium text-slate-600 dark:text-slate-300'
                    }
                >
                    Dark
                </span>
                <div className={'flex justify-end'}>
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
            <div
                className={
                    'grid grid-cols-[minmax(5rem,1fr)_minmax(0,1.3fr)] items-center gap-3'
                }
            >
                <span
                    className={
                        'text-sm font-medium text-slate-600 dark:text-slate-300'
                    }
                >
                    Language
                </span>
                <div className={'flex justify-end'}>
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
