import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_PROFILE_RESET } from '@/url/api';

export const resetUser = (id: string) => {
    return fetchAdv.post(API_PROFILE_RESET(id));
};
