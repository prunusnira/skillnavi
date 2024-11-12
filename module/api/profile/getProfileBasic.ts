import { fetchAdv } from '@/module/api/fetchAdv';
import { ProfileBasic } from '@/data/profile/ProfileBasic';
import { API } from '@/data/api';
import { Session } from 'next-auth';
import { getTokenFromSession } from '@/module/lib/session/getTokenFromSession';

export const getProfileBasic = async (session: Session | null) => {
    const token = getTokenFromSession(session);

    if (!token) {
        return undefined;
    }

    return await fetchAdv.get<ProfileBasic>(API.PROFILE.basic, {
        params: {
            token,
        },
    });
};
