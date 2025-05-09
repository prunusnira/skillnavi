// 자기 자신의 프로필로 이동하는 페이지
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { redirect } from '@/i18n/routing';
import { LINK_PROFILE_MAIN } from '@/url/url';
import { getLocale } from 'next-intl/server';

const PageProfileSelf = async () => {
    const session = await getServerSession();
    const profile = await getProfileSession(session);
    const locale = await getLocale();

    if (!profile) {
        return null;
    }

    redirect({ href: LINK_PROFILE_MAIN(profile.id), locale });
};

export default PageProfileSelf;
