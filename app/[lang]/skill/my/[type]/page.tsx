import { getServerSession } from 'next-auth';
import { authOptions } from '@/module/api/auth/authOptions';
import { getProfileSession } from '@/module/api/profile/getProfileSession';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import { LINK } from '@/data/url';
import { GameType } from '@/data/game/GameType';

const PageMySkikll = async ({
    params,
}: {
    params: {
        type: GameType;
    };
}) => {
    const session = await getServerSession(authOptions);
    const profile = await getProfileSession(session);
    const locale = await getLocale();

    const { type } = params;

    if (!profile) {
        return null;
    }

    redirect({
        href: LINK.SKILL.skill({
            id: profile.id,
            type,
            pageType: 'target',
        }),
        locale,
    });
};

export default PageMySkikll;
