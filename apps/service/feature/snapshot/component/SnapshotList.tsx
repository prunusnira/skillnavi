import { GameType } from '@/common/game/data/GameType';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { SnapshotListItem } from '@/feature/snapshot/component/SnapshotList.item';

interface Props {
    type: GameType;
    snapshotMap: Map<string, string>;
}

export const SnapshotsList = async ({ type, snapshotMap }: Props) => {
    const user = await getProfileSession();
    const typeStr = type === 'gf' ? 'GuitarFreaks' : 'DrumMania';

    const keys = Array.from(snapshotMap.keys()).sort((a, b) =>
        b.localeCompare(a),
    );

    if (!user) {
        return null;
    }

    return (
        <section className="w-full min-w-0 flex-1">
            <div className="mb-3 text-lg font-semibold">{typeStr}</div>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {keys.map((key) => (
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
