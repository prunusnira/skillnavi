import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import MusicData from '@/feature/music/component/data/MusicData';
import PatternRankTable from '@/feature/music/component/patternrank/PatternRankTable';
import PatternRankOptions from '@/feature/music/component/patternrank/PatternRankOptions';
import { cn } from '@/lib/cn';
import { getMusicPattern } from '@/feature/music/api/getMusicPattern';
import PatternTag from '@/common/pattern/PatternTag';
import { getGameVersions } from '@/feature/env/api/getGameVersions';

const PagePatternRank = async (props: {
    searchParams: Promise<{
        mid?: string;
        version?: string;
        page?: string;
        ptcode?: string;
    }>;
}) => {
    const searchParams = await props.searchParams;
    const t = await getTranslations('patternRank');
    const mid = Number(searchParams.mid);
    const version = Number(searchParams.version);
    const patternCode = Number(searchParams.ptcode);
    const page = Math.max(1, Number(searchParams.page || 1));

    if (
        !Number.isInteger(mid) ||
        mid < 1 ||
        !Number.isInteger(patternCode) ||
        patternCode < 1 ||
        patternCode > 12
    ) {
        return <Card title={t('title')}>{t('patternUnavailable')}</Card>;
    }

    const [gameVersions, allPatterns] = await Promise.all([
        getGameVersions(),
        getMusicPattern({ mid }),
    ]);

    const versionsByPattern: Record<number, number[]> = {};
    allPatterns.forEach((pattern) => {
        if (pattern.level <= 0) {
            return;
        }

        const versions = versionsByPattern[pattern.patterncode] ?? [];
        if (!versions.includes(pattern.version)) {
            versions.push(pattern.version);
            versionsByPattern[pattern.patterncode] = versions;
        }
    });
    Object.values(versionsByPattern).forEach((versions) =>
        versions.sort((left, right) => left - right),
    );

    const pattern = allPatterns.find(
        (item) => item.version === version && item.patterncode === patternCode,
    );

    if (!pattern || pattern.level <= 0) {
        return <Card title={t('title')}>{t('patternUnavailable')}</Card>;
    }

    const versionName =
        gameVersions.find((gameVersion) => gameVersion.id === version)?.short ??
        String(version);

    return (
        <Card title={t('title')}>
            <section className="flex w-full flex-col items-center gap-5">
                <MusicData mid={mid} />

                <PatternRankOptions
                    mid={mid}
                    version={version}
                    patternCode={patternCode}
                    gameVersions={gameVersions}
                    versionsByPattern={versionsByPattern}
                />

                <section
                    className={cn(
                        'flex w-full max-w-4xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70',
                    )}
                >
                    <div className="flex items-center gap-3">
                        <PatternTag patternCode={patternCode} />
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {versionName}
                        </span>
                    </div>
                    <div className="text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
                        {(pattern.level / 100).toFixed(2)}
                    </div>
                </section>

                <PatternRankTable
                    level={pattern.level}
                    page={page}
                />
            </section>
        </Card>
    );
};

export default PagePatternRank;
