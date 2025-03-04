import SkillTable from '@/feature/skill/component/table/SkillTable';
import { TableType } from '@/feature/skill/data/TableType';
import { TableDataType } from '@/feature/skill/data/TableDataType';

export const dynamic = 'force-dynamic';

/**
 * @about 스킬 페이지
 * @componentType nextjs page
 */
const PageSkill = async ({
    searchParams,
}: {
    searchParams: {
        page: number;
        game: string;
        version: number;
        order: string;
        pageType: TableDataType;
        display: TableType;
    };
}) => {
    return (
        <article className={'w-full'}>
            {/* 테이블 */}
            <SkillTable searchParams={searchParams} />
        </article>
    );
};

export default PageSkill;
