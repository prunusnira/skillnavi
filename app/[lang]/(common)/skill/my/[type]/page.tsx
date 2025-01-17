import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/module/api/profile/getProfileSession';
import MySkillRedirect from '@/component/skill/my/MySkillRedirect';

export const dynamic = 'force-dynamic';

const PageMySkikll = async () => {
    const session = await getServerSession();
    const profile = await getProfileSession(session);

    if (!profile) {
        return null;
    }

    return <MySkillRedirect userid={profile.id} />;
};

export default PageMySkikll;
