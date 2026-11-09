'use client';

import SkillColor from '@/common/skillColor/SkillColor';
import UserLinkIcon from '@/common/table/user/UserLinkIcon';
import { SkillRank } from '@/feature/skill/data/SkillRank';
import { useTranslations } from 'next-intl';
import RankPosition from '@/common/rank/RankPosition';
import { GameType } from '@/common/game/data/GameType';

interface Props {
    rank: number;
    data: SkillRank;
    type: GameType;
}

const SkillRankUser = ({ rank, data, type }: Props) => {
    const t = useTranslations('common');

    return (
        <article className="flex w-full items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm transition hover:border-indigo-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-900 dark:hover:bg-slate-900 sm:gap-4 sm:px-4 sm:py-3.5">
            <RankPosition value={rank} />

            <div className="min-w-0 flex-1">
                <UserLinkIcon
                    user={{
                        id: data.uid,
                        name: data.name,
                        titletower: data.titletower,
                        openinfo: data.openinfo,
                    }}
                    privateNameLabel={t('namePrivate')}
                    emptyNameLabel={t('nameMissing')}
                />
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-slate-500 uppercase dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                    {type}
                </span>
                <div className="flex min-w-28 justify-center rounded-xl bg-slate-950 px-3 py-2 text-center text-lg font-extrabold tabular-nums shadow-inner dark:bg-black">
                    <SkillColor value={data.value / 100} />
                </div>
            </div>
        </article>
    );
};

export default SkillRankUser;
