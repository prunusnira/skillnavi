'use client';

import { GameTypeAll, isGameTypeAll } from '@/common/game/data/GameType';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { ButtonRounded } from '@skillnavi/ui';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { ChangeEvent } from 'react';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';
import { useTranslations } from 'next-intl';

const PlayCountRankType = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedType = searchParams.get('type');
    const type = isGameTypeAll(selectedType) ? selectedType : 'gf';
    const latest = useAtomValue(atomGameVersionLatest);
    const t = useTranslations('common');

    const changeType = (type: GameTypeAll) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('type', type);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    const changeVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(searchParams);
        const version = e.currentTarget.value;
        newParams.set('version', version);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <section className="surface-muted flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
            <div className="flex w-full flex-col gap-2 sm:max-w-xs">
                <label className="text-xs font-bold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    {t('version')}
                </label>
                <VersionSelector
                    onChangeVersion={changeVersion}
                    currentVersion={Number(
                        searchParams.get('version') ?? latest?.id ?? 0,
                    )}
                    withoutAll
                    versionFrom={30}
                />
            </div>

            <div className="flex w-full flex-col gap-2 sm:max-w-md">
                <span className="text-xs font-bold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    {t('type')}
                </span>
                <div className="grid grid-cols-3 gap-2">
                    <ButtonRounded
                        text="GF"
                        onClick={() => changeType('gf')}
                        isSelected={type === 'gf'}
                        customClass="border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    />
                    <ButtonRounded
                        text="DM"
                        onClick={() => changeType('dm')}
                        isSelected={type === 'dm'}
                        customClass="border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    />
                    <ButtonRounded
                        text={t('all')}
                        onClick={() => changeType('all')}
                        isSelected={type === 'all'}
                        customClass="border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    />
                </div>
            </div>
        </section>
    );
};

export default PlayCountRankType;
