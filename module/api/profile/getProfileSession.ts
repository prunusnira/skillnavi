import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { Session } from 'next-auth';
import { getTokenFromSession } from '@/module/lib/session/getTokenFromSession';
import { Profile } from '@/data/profile/Profile';

export const getProfileSession = async (session: Session | null) => {
    const token = getTokenFromSession(session);

    if (!token) {
        return undefined;
    }

    return await fetchAdv.get<Profile>(API.PROFILE.basic, {
        params: {
            token,
        },
    });
};
