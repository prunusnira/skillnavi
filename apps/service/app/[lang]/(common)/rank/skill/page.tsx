import Pager from '@/common/pager/Pager';
import { GameType } from '@/common/game/data/GameType';
import { getSkillRank } from '@/feature/rank/skill/api/getSkillRank';
import SkillRankUser from '@/feature/rank/skill/component/SkillRankUser';
import { SKILLRANK_SIZE } from '@/feature/env/data/constant';
import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import SkillRankType from '@/feature/rank/skill/component/SkillRankType';

const PageSkillRank = async (props: {
    searchParams: Promise<{ page?: string; type?: string }>;
}) => {
    const searchParams = await props.searchParams;
    const type: GameType = searchParams.type === 'dm' ? 'dm' : 'gf';
    const requestedPage = Number(searchParams.page || '1');
    const page =
        Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;
    const { rank, pages } = await getSkillRank({ page, type });
    const t = await getTranslations();
    const common = await getTranslations('common');

    return (
        <Card title={t('ranking')}>
            <SkillRankType type={type} />

            <section className="w-full space-y-3">
                <div className="hidden grid-cols-[2.5rem_minmax(0,1fr)_8rem] items-center gap-4 px-4 text-[11px] font-bold tracking-wide text-slate-400 uppercase sm:grid">
                    <span>{common('rank')}</span>
                    <span>{common('player')}</span>
                    <span className="text-center">{common('skill')}</span>
                </div>

                {rank.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        {common('emptyRank')}
                    </div>
                ) : (
                    rank.map((user, idx) => (
                        <SkillRankUser
                            key={`${type}_${page}_${idx}`}
                            rank={(page - 1) * SKILLRANK_SIZE + idx + 1}
                            data={user}
                            type={type}
                        />
                    ))
                )}
            </section>

            <Pager
                page={page}
                allpage={pages}
            />
        </Card>
    );
};

export default PageSkillRank;
