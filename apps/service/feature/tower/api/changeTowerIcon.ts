import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_PROFILE_ICON } from '@/url/api';

interface Params {
    uid: number;
    icon: string;
}

export const changeTowerIcon = async ({ uid, icon }: Params) => {
    return fetchAdv.post(API_PROFILE_ICON(uid), {
        body: {
            icon,
        },
    });
};