import Card from '@/component/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/module/util/cn';
import SkillTable from '@/component/skill/table/SkillTable';
import SkillMenu from '@/component/skill/menu/SkillMenu';

/**
 * @about 스킬 페이지
 * @componentType nextjs page
 */
const PageSkill = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: {
        page: number;
        game: string;
        version: number;
        order: string;
        type: string;
    };
}) => {
    const t = await getTranslations('skill.table');
    const { id } = params;
    const { page, game, version, order, type } = searchParams;

    return (
        <article>
            {/* 메뉴 */}
            <SkillMenu />

            {/* 테이블 */}
            <SkillTable
                params={params}
                searchParams={searchParams}
            />
        </article>
    );
};

export default PageSkill;
