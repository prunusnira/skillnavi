import SkillTable from '@/feature/skill/component/table/SkillTable';
import { getProfile } from '@/feature/profile/api/getProfile';
import { getProfileSkill } from '@/feature/profile/api/getProfileSkill';
import { getTranslations } from 'next-intl/server';
import { Error } from '@/common/error/Error';
import Card from '@/common/card/Card';
import SkillMenu from '@/feature/skill/component/menu/SkillMenu';

/**
 * @about 스킬 페이지
 * @componentType nextjs page
 */
const PageSkill = async ({
    params,
    searchParams,
}: {
    params: Promise<{ [key: string]: string }>;
    searchParams: Promise<{ [key: string]: string }>;
}) => {
    const userId = (await params).id;
    const queryString = await searchParams;

    const profile = (await getProfile([Number(userId)])).at(0);
    const profileSkill = await getProfileSkill([Number(userId)]);
    const t = await getTranslations('skill');

    if (!profile) {
        return (
            <article className="w-full text-center">
                <Error title={t('title')}>
                    {t('noid')}: {userId}
                </Error>
            </article>
        );
    }

    const getUserSkill = () => {
        if (!profileSkill?.length) return undefined;
        const version = Number(queryString.version || 0);
        const skill = profileSkill.find((ps) => ps.version === version);

        if (!skill) return undefined;

        return {
            all: skill.dskill + skill.gskill,
            gf: skill.gskill,
            dm: skill.dskill,
        };
    };

    return (
        <article className={'w-full'}>
            {/* 메뉴 */}
            <Card title={t('menu.title')}>
                <SkillMenu />
            </Card>

            {/* 테이블 */}
            <SkillTable
                profile={profile}
                userSkill={getUserSkill()}
            />
        </article>
    );
};

export default PageSkill;
