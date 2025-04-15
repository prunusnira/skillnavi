'use client';

import { GameType } from '@/common/game/data/GameType';
import { useRouter } from '@/i18n/routing';
import { LINK_SNAPSHOT_DETAIL } from '@/url/url';

interface Props {
    uid: number;
    type: GameType;
    date: string;
}

export const SnapshotListItem = ({ uid, type, date }: Props) => {
    const router = useRouter();
    return (
        <div
            className={'cursor-pointer hover:underline'}
            onClick={() => {
                router.push(LINK_SNAPSHOT_DETAIL(uid, type, date));
            }}
        >
            {date}
        </div>
    );
};