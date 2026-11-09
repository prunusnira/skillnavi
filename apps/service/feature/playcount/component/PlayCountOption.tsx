'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';

const PlayCountOption = () => {
    const t = useTranslations('user.playcount.button');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const type = searchParams.get('type');
    const latestVersion = useAtomValue(atomGameVersionLatest);

    const changePage = (type: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('type', type);
        router.replace(`${pathname}?${newParams.toString()}`);
    };

    const changeVersion = (version: number) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('version', version.toString());
        router.replace(`${pathname}?${nextParams.toString()}`);
    };

    const typeOptions = [
        ['music', t('music')],
        ['pattern', t('pt')],
        ['gf', t('gf')],
        ['dm', t('dm')],
    ] as const;

    return (
        <section
            className={
                'grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-[minmax(11rem,0.8fr)_minmax(0,2fr)] md:items-end'
            }
        >
            {/* game version */}
            <div className={'flex min-w-0 flex-col gap-2'}>
                <div
                    className={
                        'text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400'
                    }
                >
                    Game Version
                </div>
                <VersionSelector
                    onChangeVersion={(e) => {
                        changeVersion(Number(e.currentTarget.value));
                    }}
                    currentVersion={Number(
                        searchParams.get('version') ?? latestVersion?.id,
                    )}
                    withoutAll
                    versionFrom={24}
                />
            </div>

            {/* type */}
            <div className={'flex min-w-0 flex-col gap-2'}>
                <div
                    className={
                        'text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400'
                    }
                >
                    Type
                </div>
                <div
                    aria-label="Type"
                    className={'grid w-full grid-cols-2 gap-2 md:grid-cols-4'}
                    role="group"
                >
                    {typeOptions.map(([value, text]) => {
                        const isSelected =
                            type === value || (!type && value === 'music');

                        return (
                            <button
                                aria-pressed={isSelected}
                                className={cn(
                                    'flex min-h-11 w-full items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400',
                                    isSelected
                                        ? 'border-lime-400/80 bg-lime-300 text-slate-950 shadow-sm hover:bg-lime-200'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-lime-300 hover:bg-lime-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-lime-400/60 dark:hover:bg-lime-300/10',
                                )}
                                key={value}
                                onClick={() => changePage(value)}
                                type="button"
                            >
                                {text}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PlayCountOption;
