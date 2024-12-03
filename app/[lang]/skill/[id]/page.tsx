import SkillTable from '@/component/skill/table/SkillTable';
import { cn } from '@/module/util/cn';
import { TableType } from '@/data/skill/TableType';

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
        display: TableType;
    };
}) => {
    return (
        <article className={cn('w-full')}>
            {/* 테이블 */}
            <SkillTable
                params={params}
                searchParams={searchParams}
            />
        </article>
    );
};

export default PageSkill;
