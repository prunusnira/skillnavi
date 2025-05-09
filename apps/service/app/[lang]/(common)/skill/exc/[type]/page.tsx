import { permanentRedirect } from 'next/navigation';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';

const PageSkillExc = async (props: { params: Promise<{ type: string }> }) => {
    const params = await props.params;
    const { type } = params;
    const latest = await getLatestVersion();
    permanentRedirect(
        `/skill/0?pageType=exc&version=${latest}&display=grid&game=${type}`,
    );
    return null;
};

export default PageSkillExc;
