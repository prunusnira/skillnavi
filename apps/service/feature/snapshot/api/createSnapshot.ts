import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_SNAPSHOT_CREATE } from '@/url/api';
import { SnapshotData } from '@/feature/snapshot/data/Snapshot';

export const createSnapshot = (data: SnapshotData) => {
    return fetchAdv.post<{ detail: string }>(API_SNAPSHOT_CREATE, {
        body: JSON.stringify(data),
    });
};