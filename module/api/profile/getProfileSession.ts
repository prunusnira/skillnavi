import { fetchAdv } from '@/module/api/fetchAdv';
import { ProfileOldBasic } from '@/data/profile/ProfileOldBasic';
import { API } from '@/data/api';
import { Session } from 'next-auth';
import { getTokenFromSession } from '@/module/lib/session/getTokenFromSession';

export const getProfileSession = async (session: Session | null) => {
    const token = getTokenFromSession(session);

    if (!token) {
        return undefined;
    }

    return await fetchAdv.get<ProfileOldBasic>(API.PROFILE.old.basic, {
        params: {
            token,
        },
    });
};
