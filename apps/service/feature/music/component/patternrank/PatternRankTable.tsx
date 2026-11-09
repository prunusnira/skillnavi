'use client';

import usePatternRankTable from '@/feature/music/component/patternrank/usePatternRankTable';
import { cn } from '@/lib/cn';
import { getSkillCN } from '@/feature/skill/api/getSkillCN';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import Pager from '@/common/pager/Pager';
import Loading from '@/common/loading/Loading';
import UserLinkIcon from '@/common/table/user/UserLinkIcon';
import RankTag from '@/common/rank/RankTag';
import { useTranslations } from 'next-intl';

interface Props {
    page: number;
    level: number;
}

const positionClasses = (position: number) => {
    if (position === 1) {
        return 'border-amber-300 bg-amber-100 text-amber-950 dark:border-amber-500/50 dark:bg-amber-400/15 dark:text-amber-200';
    }
    if (position === 2) {
        return 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-500/50 dark:bg-slate-700/60 dark:text-slate-100';
    }
    if (position === 3) {
        return 'border-orange-300 bg-orange-100 text-orange-950 dark:border-orange-500/50 dark:bg-orange-400/15 dark:text-orange-200';
    }
    return 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300';
};

const PatternRankTable = ({ level, page }: Props) => {
    const { rankTableData, pages, isLoading } = usePatternRankTable();
    const t = useTranslations('common');

    if (isLoading) {
        return <Loading />;
    }

    if (!rankTableData.length) {
        return (
            <div className="w-full max-w-4xl rounded-2xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {t('emptyRank')}
            </div>
        );
    }

    return (
        <section className="flex w-full max-w-4xl flex-col gap-4">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                    <thead>
                        <tr className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
                            <th className="w-16 px-4 py-3 text-center">
                                {t('rank')}
                            </th>
                            <th className="px-4 py-3">{t('player')}</th>
                            <th className="px-4 py-3 text-right">
                                {t('rate')}
                            </th>
                            <th className="px-4 py-3 text-center">
                                {t('rank')}
                            </th>
                            <th className="px-4 py-3 text-right">
                                {t('skill')}
                            </th>
                            <th className="w-20 px-4 py-3 text-center">
                                {t('fc')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {rankTableData.map((row) => {
                            const skillValue =
                                Math.floor((row.rate * level) / 500) / 100;
                            const skillColor = getSkillCN(skillValue * 50);

                            return (
                                <tr
                                    key={`${row.id}-${row.position}`}
                                    className="group transition-colors hover:bg-lime-50/70 dark:hover:bg-lime-300/5"
                                >
                                    <td className="px-3 py-3 text-center">
                                        <span
                                            className={cn(
                                                'inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 font-bold tabular-nums',
                                                positionClasses(row.position),
                                            )}
                                        >
                                            {row.position ||
                                                (page - 1) * MUSICLIST_SIZE + 1}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <UserLinkIcon
                                            user={{
                                                id: row.id,
                                                name: row.name,
                                                titletower: row.icon ?? '',
                                                openinfo: row.openinfo,
                                            }}
                                            privateNameLabel={t('namePrivate')}
                                            emptyNameLabel={t('nameMissing')}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold tabular-nums text-slate-700 dark:text-slate-200">
                                        {(row.rate / 100).toFixed(2)}%
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <RankTag
                                            rank={row.rank}
                                            rate={row.rate}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span
                                            className={cn(
                                                'inline-flex min-w-16 justify-center rounded-lg px-2.5 py-1.5 font-extrabold tabular-nums text-black',
                                                skillColor,
                                            )}
                                        >
                                            {skillValue.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {row.fc ? (
                                            <span className="inline-flex rounded-md border border-lime-300 bg-lime-100 px-2 py-1 text-xs font-bold text-lime-900 dark:border-lime-700 dark:bg-lime-950/70 dark:text-lime-200">
                                                FC
                                            </span>
                                        ) : (
                                            <span className="text-slate-300 dark:text-slate-600">
                                                ·
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {pages && pages > 1 && (
                <div className="flex justify-center">
                    <Pager page={page} allpage={pages} />
                </div>
            )}
        </section>
    );
};

export default PatternRankTable;
