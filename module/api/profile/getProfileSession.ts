import { fetchAdv } from '@/module/api/fetchAdv';
import { Session } from 'next-auth';
import { getTokenFromSession } from '@/module/lib/session/getTokenFromSession';
import { Profile } from '@/data/profile/Profile';
import { API_PROFILE_BASIC } from '@/url/api';

export const getProfileSession = async (session: Session | null) => {
    const token = getTokenFromSession(session);

    if (!token) {
        return undefined;
    }

    return await fetchAdv.get<Profile>(API_PROFILE_BASIC, {
        params: {
            token,
        },
    });
};
