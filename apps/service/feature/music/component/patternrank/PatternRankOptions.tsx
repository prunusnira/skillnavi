'use client';

import { Select } from '@skillnavi/ui';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { GameVersion } from '@skillnavi/data/src/version';
import { useTranslations } from 'next-intl';

interface Props {
    mid: number;
    version: number;
    patternCode: number;
    gameVersions: GameVersion[];
    versionsByPattern: Record<number, number[]>;
}

const DIFFICULTIES = ['BSC', 'ADV', 'EXT', 'MAS'] as const;
const INSTRUMENTS = [
    { value: 0, key: 'guitar' },
    { value: 1, key: 'bass' },
    { value: 2, key: 'drum' },
] as const;

const PatternRankOptions = ({
    mid,
    version,
    patternCode,
    gameVersions,
    versionsByPattern,
}: Props) => {
    const t = useTranslations('common');
    const router = useRouter();
    const pathname = usePathname();
    const [difficulty, setDifficulty] = useState(
        String(((patternCode - 1) % 4) + 1),
    );
    const [instrument, setInstrument] = useState(
        String(Math.floor((patternCode - 1) / 4)),
    );
    const [selectedVersion, setSelectedVersion] = useState(String(version));

    const selectedPatternCode = Number(instrument) * 4 + Number(difficulty);
    const availableVersionIds =
        versionsByPattern[selectedPatternCode] ?? [];
    const versionOptions = useMemo(
        () =>
            gameVersions.filter((gameVersion) =>
                availableVersionIds.includes(gameVersion.id),
            ),
        [availableVersionIds, gameVersions],
    );

    useEffect(() => {
        if (
            versionOptions.some(
                (gameVersion) =>
                    String(gameVersion.id) === selectedVersion,
            )
        ) {
            return;
        }

        const latestAvailableVersion = versionOptions.at(-1);
        if (latestAvailableVersion) {
            setSelectedVersion(String(latestAvailableVersion.id));
        }
    }, [selectedVersion, versionOptions]);

    const onChangeDifficulty = (event: ChangeEvent<HTMLSelectElement>) => {
        setDifficulty(event.currentTarget.value);
    };

    const onChangeInstrument = (event: ChangeEvent<HTMLSelectElement>) => {
        setInstrument(event.currentTarget.value);
    };

    const onChangeVersion = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedVersion(event.currentTarget.value);
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!versionOptions.some((item) => String(item.id) === selectedVersion)) {
            return;
        }

        const params = new URLSearchParams({
            mid: String(mid),
            version: selectedVersion,
            ptcode: String(selectedPatternCode),
            page: '1',
        });

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form
            className="grid w-full max-w-4xl grid-cols-1 items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] lg:gap-4 lg:p-5"
            onSubmit={onSubmit}
        >
            <label className="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span>{t('difficulty')}</span>
                <Select
                    options={DIFFICULTIES.map((value, index) => ({
                        value: String(index + 1),
                        display: value,
                    }))}
                    value={difficulty}
                    onChange={onChangeDifficulty}
                />
            </label>

            <label className="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span>{t('version')}</span>
                <Select
                    options={versionOptions.map((gameVersion) => ({
                        value: String(gameVersion.id),
                        display: gameVersion.short,
                    }))}
                    value={selectedVersion}
                    onChange={onChangeVersion}
                />
            </label>

            <label className="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span>{t('type')}</span>
                <Select
                    options={INSTRUMENTS.map(({ value, key }) => ({
                        value: String(value),
                        display: t(key),
                    }))}
                    value={instrument}
                    onChange={onChangeInstrument}
                />
            </label>

            <button
                className="min-h-10 rounded-xl bg-lime-300 px-5 py-2 text-sm font-extrabold text-slate-950 shadow-sm transition-colors hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={versionOptions.length === 0}
                type="submit"
            >
                {t('confirm')}
            </button>
        </form>
    );
};

export default PatternRankOptions;
