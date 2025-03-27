import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_PROFILE_OPENDATA } from '@/url/api';

interface Params {
    uid: string;
    open: 'true' | 'false';
}

export const updateOpenData = async ({ uid, open }: Params) => {
    return fetchAdv.post(API_PROFILE_OPENDATA(uid), {
        body: {
            opendata: open,
        },
    });
};
