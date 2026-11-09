import Card from '@/common/card/Card';
import Pager from '@/common/pager/Pager';
import { getGameVersionsFromTb } from '@/feature/env/api/getGameVersions';
import { VER_TB } from '@/feature/env/data/constant';
import { getPatternDifficultyCompare } from '@/feature/music/api/getPatternDifficultyCompare';
import { PatternDifficultyCompareOptions } from '@/feature/music/component/compare/PatternDifficultyCompareOptions';
import { PatternDifficultyCompareTable } from '@/feature/music/component/compare/PatternDifficultyCompareTable';
import { PatternDifficultyCompareSort } from '@/feature/music/data/PatternDifficultyCompare';
import { getTranslations } from 'next-intl/server';

interface SearchParams {
    version1?: string;
    version2?: string;
    value?: string;
    page?: string;
    sort?: string;
}

const parseVersion = (value: string | undefined) => {
    const version = Number(value);
    return Number.isInteger(version) ? version : undefined;
};

const PagePatternCompare = async (props: {
    searchParams: Promise<SearchParams>;
}) => {
    const searchParams = await props.searchParams;
    const gameVersions = await getGameVersionsFromTb();
    const versions = gameVersions
        .filter((version) => version.id >= VER_TB)
        .sort((left, right) => left.id - right.id);
    const latestVersion = versions.at(-1)?.id;
    const fallbackVersion1 = latestVersion;
    const fallbackVersion2 = versions
        .filter((version) => version.id !== fallbackVersion1)
        .at(-1)?.id;
    const t = await getTranslations('patternCompare');

    if (fallbackVersion1 === undefined || fallbackVersion2 === undefined) {
        return (
            <Card title={t('title')}>
                <p>{t('requiresTwoVersions')}</p>
            </Card>
        );
    }

    const requestedVersion1 = parseVersion(searchParams.version1);
    const version1 =
        requestedVersion1 !== undefined &&
        versions.some((version) => version.id === requestedVersion1)
            ? requestedVersion1
            : fallbackVersion1;
    const requestedVersion2 = parseVersion(searchParams.version2);
    const version2 =
        requestedVersion2 !== undefined &&
        requestedVersion2 !== version1 &&
        versions.some((version) => version.id === requestedVersion2)
            ? requestedVersion2
            : (versions.filter((version) => version.id !== version1).at(-1)
                  ?.id ?? fallbackVersion2);
    const value = searchParams.value?.trim() ?? '';
    const requestedPage = Number(searchParams.page);
    const page =
        Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;
    const sort: PatternDifficultyCompareSort =
        searchParams.sort === 'difference' ? 'difference' : 'song';

    const result = await getPatternDifficultyCompare({
        version1,
        version2,
        value,
        page,
        sort,
    });
    const version1Name =
        versions.find((version) => version.id === version1)?.short ??
        String(version1);
    const version2Name =
        versions.find((version) => version.id === version2)?.short ??
        String(version2);

    return (
        <Card title={t('title')}>
            <section className="flex w-full flex-col items-center gap-5">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    {t('differenceDescription')}
                </p>
                <PatternDifficultyCompareOptions
                    version1={version1}
                    version2={version2}
                    value={value}
                    sort={sort}
                />
                <PatternDifficultyCompareTable
                    rows={result.rows}
                    labels={{
                        albumArt: t('albumArt'),
                        song: t('song'),
                        difficulty: t('difficulty'),
                        version1Difficulty: t('version1Difficulty', {
                            version: version1Name,
                        }),
                        version2Difficulty: t('version2Difficulty', {
                            version: version2Name,
                        }),
                        difference: t('difference'),
                        noResults: t('noResults'),
                    }}
                />
                {result.pages > 1 && (
                    <Pager page={result.page} allpage={result.pages} />
                )}
            </section>
        </Card>
    );
};

export default PagePatternCompare;
