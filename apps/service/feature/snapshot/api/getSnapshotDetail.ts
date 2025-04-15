import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_SNAPSHOT_DETAIL } from '@/url/api';

export const getSnapshotDetail = async (id: string, type: string, date: string) => {
    return fetchAdv.get<string>(API_SNAPSHOT_DETAIL, {
        params: {
            id,
            type,
            date,
        },
    });
};