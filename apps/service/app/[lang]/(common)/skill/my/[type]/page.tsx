import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import MySkillRedirect from '@/feature/skill/component/my/MySkillRedirect';

const PageMySkikll = async () => {
    const profile = await getProfileSession();

    if (!profile) {
        return null;
    }

    return <MySkillRedirect userid={profile.id} />;
};

export default PageMySkikll;
