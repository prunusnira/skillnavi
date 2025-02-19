import { permanentRedirect } from 'next/navigation';
import { getLatestVersion } from '@/module/api/env/getGameVersions';

const PageSkillExc = async ({ params }: { params: { type: string } }) => {
    const { type } = params;
    const latest = await getLatestVersion();
    permanentRedirect(
        `/skill/0?pageType=exc&version=${latest}&display=grid&game=${type}`,
    );
    return null;
};

export default PageSkillExc;
