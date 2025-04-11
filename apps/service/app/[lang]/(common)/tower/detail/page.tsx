import Card from '@/common/card/Card';
import { getTowerDetail } from '@/feature/tower/api/getTowerDetail';
import { TowerItem } from '@/feature/tower/data/Tower';
import { getMusicInfos } from '@/feature/music/api/getMusicInfo';
import { getPatternTypeFromCode } from '@/lib/pattern/getPatternTypeFromCode';
import { getGameTypeFromCode } from '@/lib/pattern/getGameTypeFromCode';
import { TowerDetailBlock } from '@/feature/tower/component/TowerDetailBlock';
import { ALBUM } from '@/url/url';
import Image from 'next/image';
import AlbumArt from '@/common/albumart/AlbumArt';

const PageTowerDetail = async ({ searchParams }: { searchParams: { id: number } }) => {
    const { id } = searchParams;
    const detailList = await getTowerDetail(id);

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

    const keys = Array.from(detailFloorMap.keys()).sort((a, b) => a - b);

    return (
        <Card title={''}>
            <section className={'flex flex-col gap-[60px] w-full px-[10px] py-[20px]'}>
                {keys.map(floor => {
                    const list = detailFloorMap.get(floor)!;
                    return (
                        <TowerDetailBlock floor={floor}>
                            {list.map(item => {
                                const music = musicData.find(music => music.id === item.mid);
                                if (!music) return null;

                                return (
                                    <div
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

                                        <div className={'absolute bottom-[24px] right-[16px] text-3xl font-bold'}>
                                            CLEARED?
                                        </div>
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