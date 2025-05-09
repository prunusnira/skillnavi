import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import MySkillRedirect from '@/feature/skill/component/my/MySkillRedirect';

const PageMySkikll = async () => {
    const session = await getServerSession();
    const profile = await getProfileSession(session);

    if (!profile) {
        return null;
    }

    return <MySkillRedirect userid={profile.id} />;
};

export default PageMySkikll;
