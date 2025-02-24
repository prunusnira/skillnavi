import { fetchAdv } from '@/module/api/fetchAdv';
import { Notice } from '@/data/notice/Notice';
import { API_NOTICE } from '@/url/api';

interface Params {
    page: number;
    size: number;
}

export const getNotice = async ({ page, size }: Params) => {
    return fetchAdv.get<Notice[]>(API_NOTICE, {
        params: {
            page,
            size,
        },
    });
};
