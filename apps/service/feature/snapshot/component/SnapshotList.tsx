import { GameType } from '@/common/game/data/GameType';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { getServerSession } from 'next-auth';
import { SnapshotListItem } from '@/feature/snapshot/component/SnapshotList.item';

interface Props {
    type: GameType;
    snapshotMap: Map<string, string>;
}

export const SnapshotsList = async ({ type, snapshotMap }: Props) => {
    const user = await getProfileSession(await getServerSession());
    const typeStr =
        type === 'gf' ? 'GuitarFreaks' :
            type === 'dm' ? 'DrumMania' : '';

    const keys = Array.from(snapshotMap.keys());

    if (!user) {
        return null;
    }

    return (
        <section>
            <div className={'text-lg font-semibold'}>{typeStr}</div>
            <div className={'flex-col-center text-sm'}>
                {keys.map(key => (
                    <SnapshotListItem
                        key={`${user.id}_${type}_${key}`}
                        uid={user.id}
                        type={type}
                        date={key}
                    />
                ))}
            </div>
        </section>
    );
};