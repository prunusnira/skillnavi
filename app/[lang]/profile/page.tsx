// 자기 자신의 프로필로 이동하는 페이지
import { getServerSession } from 'next-auth';
import { authOptions } from '@/module/api/auth/authOptions';
import { getProfileBasic } from '@/module/api/profile/getProfileBasic';
import { redirect } from '@/i18n/routing';
import { LINK } from '@/data/url';
import { getLocale } from 'next-intl/server';

const PageProfileSelf = async () => {
    const session = await getServerSession(authOptions);
    const profile = await getProfileBasic(session);
    const locale = await getLocale();

    if (!profile) {
        return null;
    }

    redirect({ href: LINK.PROFILE.main(profile.id), locale });
};

export default PageProfileSelf;
