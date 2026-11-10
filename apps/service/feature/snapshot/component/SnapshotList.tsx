import { GameType } from '@/common/game/data/GameType';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { SnapshotListItem } from '@/feature/snapshot/component/SnapshotList.item';
import { getTranslations } from 'next-intl/server';

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

    const t = await getTranslations('common');

    return (
        <section className="w-full min-w-0 flex-1">
            <div className="mb-3 text-lg font-semibold">{typeStr}</div>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {keys.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        {t('emptySnapshot')}
                    </div>
                ) : (
                    keys.map((key) => (
                        <SnapshotListItem
                            key={`${user.id}_${type}_${key}`}
                            uid={user.id}
                            type={type}
                            date={key}
                        />
                    ))
                )}
            </div>
        </section>
    );
};
