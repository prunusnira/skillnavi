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
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { Skill } from '@/feature/skill/data/Skill';
import VersionDisplay from '@/feature/version/VersionDisplay';

const PageTowerDetail = async ({ searchParams }: { searchParams: { id: number } }) => {
    const { id } = searchParams;
    const detailList = await getTowerDetail(id);
    const towerInfo = await getTowerInfo(id);
    const session = await getServerSession();
    const user = await getProfileSession(session);

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
                    data: conditionOk,
                });
            }
        });

        floorDetailData.set(floor, displayList);
    });

    return (
        <Card title={''}>
            <section className={'flex-col-center'}>
                <span className={'text-2xl font-bold'}>
                    {getTowerType(towerInfo.game)}
                </span>
                <span className={'text-3xl font-medium'}>
                    {towerInfo.display}
                </span>
            </section>
            <section className={'flex flex-col gap-[60px] w-full px-[10px] py-[20px]'}>
                {keys.map(floor => {
                    const list = floorDetailData.get(floor)!;
                    return (
                        <TowerDetailBlock
                            key={floor}
                            floor={floor}
                            isCleared={list.filter(disp => disp.isCleared).length / list.length > 0.7}
                        >
                            {list.map(display => {
                                const { music, item, isCleared, data } = display;

                                return (
                                    <div
                                        key={`${item.tid}_${item.mid}_${item.ptcode}`}
                                        className={'w-full flex flex-col gap-[12px] relative border border-solid border-black dark:border-white rounded-2xl px-[16px] py-[16px]'}
                                    >
                                        <div className={'flex items-center gap-[8px]'}>
                                            <div>
                                                <AlbumArt
                                                    mid={music.id}
                                                    size={90}
                                                    className={'rounded-full'}
                                                />
                                            </div>
                                            <div>
                                                <div className={'flex flex-col'}>
                                                    <span className={'text-md font-semibold'}>
                                                        {music.name}
                                                    </span>
                                                    <span className={'text-sm font-medium'}>
                                                        {music.composer}
                                                    </span>
                                                    <span className={'text-sm font-normal'}>
                                                        {getPatternTypeFromCode(item.ptcode)}&nbsp;
                                                        {getGameTypeFromCode(item.ptcode)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className={'text-md font-semibold'}>Clear Condition</div>
                                            <div className={'flex gap-[20px]'}>
                                                    <span className={'text-sm font-normal'}>
                                                        {item.fc ? 'Full Combo' : 'Clear'}
                                                    </span>
                                                <span className={'text-sm font-normal'}>
                                                        {(item.rate / 100).toFixed(2)}%
                                                    </span>
                                                <span className={'text-sm font-normal'}>
                                                        {item.compulsory ? 'MUST' : ''}
                                                    </span>
                                            </div>
                                        </div>

                                        <div>
                                            {item.description}
                                        </div>

                                        <section
                                            className={'absolute bottom-[24px] right-[16px] flex flex-col items-end'}>
                                            <div className={'text-3xl font-bold'}>
                                                {isCleared ? 'CLEARED' : 'NOT YET'}
                                            </div>
                                            {data && (
                                                <div className={'w-full text-right'}>
                                                    <VersionDisplay
                                                        version={data.playver}
                                                        type={'full'}
                                                        className={'text-sm'}
                                                    />
                                                    <span className={'text-md font-bold'}>
                                                        {((data.rate || 0) / 100).toFixed(2)}%
                                                    </span>
                                                    <span className={'text-sm font-bold pl-[20px]'}>
                                                        {data.fc ? 'Full Combo' : 'Cleared'}
                                                    </span>
                                                </div>
                                            )}
                                        </section>
                                    </div>
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