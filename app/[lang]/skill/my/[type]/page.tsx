import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/module/api/profile/getProfileSession';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import { LINK } from '@/data/url';
import { GameType } from '@/data/game/GameType';
import { getRecentVersion } from '@/module/api/env/getRecentVersion';

export const dynamic = 'force-dynamic';

const PageMySkikll = async ({
    params,
}: {
    params: {
        type: GameType;
    };
}) => {
    const session = await getServerSession();
    const profile = await getProfileSession(session);
    const recent = await getRecentVersion();
    const locale = await getLocale();

    const { type } = params;

    if (!profile) {
        return null;
    }

    redirect({
        href: LINK.SKILL.skill({
            id: profile.id,
            game: type,
            pageType: 'target',
            version: recent,
        }),
        locale,
    });
};

export default PageMySkikll;
