import SkillTable from '@/component/skill/table/SkillTable';
import SkillMenu from '@/component/skill/menu/SkillMenu';

export const dynamic = 'force-dynamic';

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
        pageType: string;
        isHot?: boolean;
        isOthers?: boolean;
    };
}) => {
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
