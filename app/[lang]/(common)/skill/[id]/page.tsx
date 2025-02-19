import SkillTable from '@/component/skill/table/SkillTable';
import { TableType } from '@/data/skill/TableType';
import { TableDataType } from '@/data/skill/TableDataType';

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
