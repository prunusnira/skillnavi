import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { Notice } from '@/data/notice/Notice';

interface Params {
    page: number;
    size: number;
}

export const getNotice = async ({ page, size }: Params) => {
    return fetchAdv.get<Notice[]>(API.NOTICE, {
        params: {
            page,
            size,
        },
    });
};
