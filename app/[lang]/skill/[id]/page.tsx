import SkillTable from '@/component/skill/table/SkillTable';
import SkillMenu from '@/component/skill/menu/SkillMenu';
import { cn } from '@/module/util/cn';

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
        display: 'grid' | 'list';
    };
}) => {
    return (
        <article className={cn('w-full')}>
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
