import Pager from '@/component/common/pager/Pager';
import { GameType } from '@/data/game/GameType';
import { getSkillRank } from '@/module/api/skill/getSkillRank';
import SkillRankUser from '@/component/skill/rank/SkillRankUser';
import { SKILLRANK_SIZE } from '@/data/env/constant';
import Card from '@/component/common/card/Card';
import { getTranslations } from 'next-intl/server';
import SkillRankType from '@/component/skill/rank/SkillRankType';

const PageSkillRank = async ({
    searchParams,
}: {
    searchParams: { page: number; type: GameType };
}) => {
    const { page, type } = searchParams;
    const { rank, pages } = await getSkillRank({ page, type });
    const t = await getTranslations('skill.ranking');

    return (
        <Card title={t('title')}>
            {/* 타입 선택 */}
            <SkillRankType />

            {/* 랭크 정보 */}
            <section className={'flex flex-col gap-[5px] w-full'}>
                {rank.map((user, idx) => (
                    <SkillRankUser
                        key={`${type}_${user.value}`}
                        rank={(page - 1) * SKILLRANK_SIZE + idx + 1}
                        name={user.name}
                        value={user.value}
                    />
                ))}
            </section>

            {/* 페이지 */}
            <Pager
                page={page}
                allpage={pages}
            />
        </Card>
    );
};

export default PageSkillRank;
