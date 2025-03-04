import { PlayCountResponse } from '@/component/playcount/PlayCount.type';
import { ALBUM, IMG } from '@/url/url';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { convertPatternCode } from '@/module/util/convertPatternCode';

interface Props {
    item: PlayCountResponse;
    pos: number;
    type: string;
}

const PlayCountItem = async ({ item, pos, type }: Props) => {
    const t = await getTranslations('user.playcount.table');
    const { id, name, playcount, patterncode } = item;
    return (
        <div className={'flex-col-center'}>
            {/*순서*/}
            <div className={'font-semibold text-2xl'}>{pos}</div>

            {/*자켓이미지*/}
            <Image
                unoptimized={true}
                src={`${ALBUM}/${id}.jpg`}
                alt={'jacket'}
                width={90}
                height={90}
            />

            {/*타이틀*/}
            <div className={'line-clamp-1'}>{name}</div>

            {/*패턴*/}
            {type !== 'music' && (
                <div>
                    <Image
                        unoptimized={true}
                        alt={'difficulty'}
                        src={`${IMG}/diff/${convertPatternCode(patterncode, 'image')}`}
                        width={80}
                        height={20}
                    />
                </div>
            )}

            {/*플레이카운트*/}
            <div>
                {playcount}
                {t('time')}
            </div>
        </div>
    );
};

export default PlayCountItem;
