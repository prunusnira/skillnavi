import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import MusicData from '@/feature/music/component/data/MusicData';
import PatternRankTable from '@/feature/music/component/patternrank/PatternRankTable';
import { cn } from '@/lib/cn';
import { getMusicPattern } from '@/feature/music/api/getMusicPattern';
import { getPatternTypeFromCode } from '@/lib/pattern/getPatternTypeFromCode';
import { getGameTypeFromCode } from '@/lib/pattern/getGameTypeFromCode';
import { getGameVersions } from '@/feature/env/api/getGameVersions';

const PagePatternRank = async ({
                                   searchParams,
                               }: {
    searchParams: {
        mid: number;
        version: number;
        page: number;
        ptcode: number;
    };
}) => {
    const t = await getTranslations('pattern.rank');
    const { mid, version, ptcode, page } = searchParams;
    const gameVersion = await getGameVersions();
    const patternList = await getMusicPattern({ mid, version });
    const pattern = patternList.find((pt) => pt.patterncode === Number(ptcode));

    if (!pattern) {
        return <Card title={t('title')}>{t('notexist')}</Card>;
    }

    return (
        <Card title={'title'}>
            {/* 곡 정보 */}
            <MusicData mid={mid} />

            {/* 패턴 / 난이도 정보 */}
            <section
                className={cn('flex w-full max-w-3xl py-2.5 justify-around')}
            >
                {/* playver */}
                <div className={cn('flex-col-center')}>
                    <div>VERSION</div>
                    <div className={cn('font-semibold')}>
                        {
                            gameVersion.find((v) => v.id === Number(version))
                                ?.short
                        }
                    </div>
                </div>

                {/* pattern */}
                <div className={cn('flex-col-center')}>
                    <div>DIFFICULTY</div>
                    <div className={cn('font-semibold')}>
                        {getPatternTypeFromCode(Number(ptcode))}
                    </div>
                </div>

                {/* game type */}
                <div className={cn('flex-col-center')}>
                    <div>TYPE</div>
                    <div className={cn('font-semibold')}>
                        {getGameTypeFromCode(ptcode)}
                    </div>
                </div>

                {/* difficulty */}
                <div className={cn('flex-col-center')}>
                    <div>LEVEL</div>
                    <div className={cn('font-semibold')}>
                        {(pattern.level / 100).toFixed(2)}
                    </div>
                </div>
            </section>

            {/* 랭크 테이블 */}
            <PatternRankTable
                level={pattern.level}
                page={Number(page)}
            />
        </Card>
    );
};

export default PagePatternRank;
