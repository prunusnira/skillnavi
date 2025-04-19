import Pager from '@/common/pager/Pager';
import { GameType } from '@/common/game/data/GameType';
import { getSkillRank } from '@/feature/rank/skill/api/getSkillRank';
import SkillRankUser from '@/feature/rank/skill/component/SkillRankUser';
import { SKILLRANK_SIZE } from '@/feature/env/data/constant';
import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import SkillRankType from '@/feature/rank/skill/component/SkillRankType';

const PageSkillRank = async ({
                                 searchParams,
                             }: {
    searchParams: { page: string; type: GameType };
}) => {
    const { page, type } = searchParams;
    const { rank, pages } = await getSkillRank({ page: Number(page), type });
    const t = await getTranslations();

    return (
        <Card title={t('ranking')}>
            {/* 타입 선택 */}
            <SkillRankType />

            {/* 랭크 정보 */}
            <section className={'flex flex-col gap-[5px] w-full'}>
                {rank.map((user, idx) => (
                    <SkillRankUser
                        key={`${type}_${user.value}`}
                        rank={(Number(page) - 1) * SKILLRANK_SIZE + idx + 1}
                        data={user}
                    />
                ))}
            </section>

            {/* 페이지 */}
            <Pager
                page={Number(page)}
                allpage={pages}
            />
        </Card>
    );
};

export default PageSkillRank;
