import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_PROFILE_COMMENT } from '@/url/api';
import { CommonFetchResult } from '@/common/fetch/CommonFetchResult';

interface Params {
    uid: string;
    comment: string;
}

export const updateComment = async ({ uid, comment }: Params) => {
    return fetchAdv.post<CommonFetchResult>(API_PROFILE_COMMENT(uid), {
        body: {
            comment,
        },
    });
};
