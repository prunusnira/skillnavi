import SkillTable from '@/feature/skill/component/table/SkillTable';

/**
 * @about 스킬 페이지
 * @componentType nextjs page
 */
const PageSkill = async () => {
    return (
        <article className={'w-full'}>
            {/* 테이블 */}
            <SkillTable />
        </article>
    );
};

export default PageSkill;
