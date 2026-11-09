'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Select } from '@skillnavi/ui';
import { InputText } from '@skillnavi/ui/src/input/InputText';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { VER_TB } from '@/feature/env/data/constant';
import { PatternDifficultyCompareSort } from '@/feature/music/data/PatternDifficultyCompare';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface Props {
    version1: number;
    version2: number;
    value: string;
    sort: PatternDifficultyCompareSort;
}

export const PatternDifficultyCompareOptions = ({
    version1,
    version2,
    value,
    sort,
}: Props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('patternCompare');
    const [searchValue, setSearchValue] = useState(value);

    useEffect(() => {
        setSearchValue(value);
    }, [value]);

    const updateSearchParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, nextValue]) => {
            params.set(key, nextValue);
        });
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    };

    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateSearchParams({ value: searchValue.trim() });
    };

    return (
        <section className="flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
            <div className="grid w-full gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium">
                    <span>{t('version1')}</span>
                    <VersionSelector
                        currentVersion={version1}
                        withoutAll
                        versionFrom={VER_TB}
                        excludedVersions={[version2]}
                        onChangeVersion={(event) =>
                            updateSearchParams({
                                version1: event.currentTarget.value,
                            })
                        }
                    />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                    <span>{t('version2')}</span>
                    <VersionSelector
                        currentVersion={version2}
                        withoutAll
                        versionFrom={VER_TB}
                        excludedVersions={[version1]}
                        onChangeVersion={(event) =>
                            updateSearchParams({
                                version2: event.currentTarget.value,
                            })
                        }
                    />
                </label>
            </div>
            <label className="flex max-w-sm flex-col gap-2 text-sm font-medium">
                <span>{t('sortLabel')}</span>
                <Select
                    value={sort}
                    options={[
                        {
                            value: 'song',
                            display: t('sortSong'),
                        },
                        {
                            value: 'difference',
                            display: t('sortDifference'),
                        },
                    ]}
                    onChange={(event) =>
                        updateSearchParams({ sort: event.currentTarget.value })
                    }
                />
            </label>
            <form
                className="flex w-full flex-col gap-2 sm:flex-row sm:items-end"
                onSubmit={onSearch}
            >
                <label className="flex flex-1 flex-col gap-2 text-sm font-medium">
                    <span>{t('searchLabel')}</span>
                    <InputText
                        customClass="w-full"
                        value={searchValue}
                        placeholder={t('searchPlaceholder')}
                        onChange={(event) =>
                            setSearchValue(event.currentTarget.value)
                        }
                    />
                </label>
                <button
                    className="min-h-10 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                    type="submit"
                >
                    {t('searchButton')}
                </button>
            </form>
        </section>
    );
};
