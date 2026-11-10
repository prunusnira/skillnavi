import Card from '@/common/card/Card';
import { getTowerDetail } from '@/feature/tower/api/getTowerDetail';
import { TowerDetailDisplay, TowerItem } from '@/feature/tower/data/Tower';
import { getMusicInfos } from '@/feature/music/api/getMusicInfo';
import { getPatternTypeFromCode } from '@/lib/pattern/getPatternTypeFromCode';
import { getGameTypeFromCode } from '@/lib/pattern/getGameTypeFromCode';
import { TowerDetailBlock } from '@/feature/tower/component/TowerDetailBlock';
import AlbumArt from '@/common/albumart/AlbumArt';
import { getTowerInfo } from '@/feature/tower/api/getTowerInfo';
import { getTowerType } from '@/feature/tower/data/getTowerType';
import { getTowerDetailUserData } from '@/feature/tower/api/getTowerDetailUserData';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { Skill } from '@/feature/skill/data/Skill';
import VersionDisplay from '@/feature/version/VersionDisplay';
import { getTowerIcon } from '@/feature/tower/api/getTowerIcon';
import { TowerUpdateFloorIcon } from '@/feature/tower/component/TowerUpdateFloorIcon';
import { getTranslations } from 'next-intl/server';

const PageTowerDetail = async (props: { searchParams: Promise<{ id: number }> }) => {
    const searchParams = await props.searchParams;
    const { id } = searchParams;
    const detailList = await getTowerDetail(id);
    const towerInfo = await getTowerInfo(id);
    const floorIcons = await getTowerIcon(id);
    const user = await getProfileSession();
    const t = await getTranslations('tower');

    if (!user) {
        return null;
    }

    const detailFloorMap: Map<number, TowerItem[]> = new Map();

    const midList: Set<number> = new Set();

    detailList.forEach((item: TowerItem) => {
        if (!detailFloorMap.has(item.floor)) {
            detailFloorMap.set(item.floor, []);
        }

        detailFloorMap.set(item.floor, [...detailFloorMap.get(item.floor)!, item]);
        midList.add(item.mid);
    });

    // 곡 정보 가져오기
    const musicData = await getMusicInfos({ mids: Array.from(midList) });

    // 플레이 정보 가져오기
    const playData = await getTowerDetailUserData({
        mids: Array.from(midList),
        uid: user.id,
        game: towerInfo.game,
    });

    const keys = Array.from(detailFloorMap.keys()).sort((a, b) => a - b);

    const floorDetailData: Map<number, TowerDetailDisplay[]> = new Map();

    keys.forEach((floor) => {
        const displayList: TowerDetailDisplay[] = [];
        const list = detailFloorMap.get(floor)!;
        list.forEach((item: TowerItem) => {
            const music = musicData.find(music => music.id === item.mid);

            if (music) {
                let isCleared = false;
                let conditionOk: Skill | undefined;
                const skillData = playData.filter(data => data.mid === item.mid && data.patterncode === item.ptcode);
                skillData.forEach((skill) => {
                    if (item.fc && skill.fc && skill.rate > item.rate) {
                        isCleared = true;
                        conditionOk = skill;
                    }
                    if (!item.fc && skill.rate > item.rate) {
                        isCleared = true;
                        conditionOk = skill;
                    }
                });

                displayList.push({
                    item,
                    music,
                    isCleared,
                    icon: item.icon,
                    data: conditionOk,
                });
            }
        });

        floorDetailData.set(floor, displayList);
    });

    return (
        <Card title={t('title')}>
            <section className="flex w-full flex-col items-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-5 text-center dark:border-slate-700 dark:bg-slate-900/80 sm:px-6">
                <span className="rounded-full border border-lime-300/70 bg-lime-100 px-3 py-1 text-xs font-bold tracking-wide text-lime-900 dark:border-lime-300/30 dark:bg-lime-300/10 dark:text-lime-200">
                    {getTowerType(towerInfo.game)}
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                    {towerInfo.display}
                </h1>
            </section>
            <section className="flex w-full flex-col gap-5 px-1 py-5 sm:gap-6 sm:px-2">
                {keys.map(floor => {
                    const list = floorDetailData.get(floor)!;
                    const clearRate = list.filter(disp => disp.isCleared).length / list.length;
                    let icon;
                    if (clearRate >= 0.95) {
                        icon = floorIcons.find(info => info.floor === floor && info.type === 1)?.icon;
                    } else if (clearRate >= 0.7) {
                        icon = floorIcons.find(info => info.floor === floor && info.type === 0)?.icon;
                    }

                    return (
                        <TowerDetailBlock
                            key={floor}
                            floor={floor}
                            icon={icon}
                            isCleared={clearRate >= 0.7}
                        >
                            {list.map(display => {
                                const { music, item, isCleared, data } = display;

                                return (
                                    <article
                                        key={`${item.tid}_${item.mid}_${item.ptcode}`}
                                        className="grid w-full grid-cols-1 gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-5 lg:grid-cols-[minmax(0,1fr)_15rem]"
                                    >
                                        <div className="min-w-0 space-y-4">
                                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                                <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-600 dark:bg-slate-900">
                                                    <AlbumArt
                                                        mid={music.id}
                                                        size={76}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="break-words text-base font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-100 sm:text-lg">
                                                        {music.name}
                                                    </div>
                                                    <div className="mt-1 break-words text-sm text-slate-500 dark:text-slate-300">
                                                        {music.composer}
                                                    </div>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
                                                            {getPatternTypeFromCode(item.ptcode)}
                                                        </span>
                                                        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
                                                            {getGameTypeFromCode(item.ptcode)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                                                <div>
                                                    <div className="mb-2 text-xs font-bold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                                                        Clear Condition
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                                            {item.fc ? 'Full Combo' : 'Clear'}
                                                        </span>
                                                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                                            {(item.rate / 100).toFixed(2)}%
                                                        </span>
                                                        {item.compulsory && (
                                                            <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-300/10 dark:text-amber-200">
                                                                MUST
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {item.description && (
                                                    <p className="break-words text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <aside className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:justify-center lg:text-right">
                                            <div className="flex flex-col items-start gap-2 sm:items-end">
                                                {isCleared && item.icon && (
                                                    <TowerUpdateFloorIcon
                                                        icon={item.icon}
                                                    />
                                                )}
                                                <span
                                                    className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold ${isCleared ? 'border-lime-300 bg-lime-100 text-lime-800 dark:border-lime-300/30 dark:bg-lime-300/10 dark:text-lime-200' : 'border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
                                                >
                                                    {isCleared ? t('status.clear') : t('status.yet')}
                                                </span>
                                            </div>
                                            {data && (
                                                <div className="min-w-0 sm:text-right">
                                                    <VersionDisplay
                                                        version={data.playver}
                                                        type="full"
                                                        className="text-xs font-medium text-slate-500 dark:text-slate-400"
                                                    />
                                                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:justify-end">
                                                        <span className="text-xl font-extrabold tabular-nums text-slate-900 dark:text-slate-100">
                                                            {((data.rate || 0) / 100).toFixed(2)}%
                                                        </span>
                                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                                            {data.fc ? 'Full Combo' : 'Cleared'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </aside>
                                    </article>
                                );
                            })}
                        </TowerDetailBlock>
                    );
                })}
            </section>
        </Card>
    );
};

export default PageTowerDetail;
