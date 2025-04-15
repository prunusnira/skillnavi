import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_SNAPSHOT_LIST } from '@/url/api';
import { SnapshotMap } from '@/feature/snapshot/data/Snapshot';

export const getSnapshotList = async (id: number) => {
    return await fetchAdv.get<SnapshotMap>(API_SNAPSHOT_LIST, {
        params: {
            id,
        },
    });
};