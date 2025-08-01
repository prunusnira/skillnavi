import { getClearTable } from '../getClearTable';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';

jest.mock('@/lib/fetch/fetchAdv');

describe('getClearTable', () => {
    it('should return clear table data', async () => {
        const mockData: ClearTableResponse[] = [
            { level: 100, total: 10, c: 0, b: 0, a: 0, s: 0, ss: 0 },
            { level: 150, total: 10, c: 0, b: 0, a: 0, s: 0, ss: 0 },
        ];
        (fetchAdv.get as jest.Mock).mockResolvedValue(mockData);

        const params = { type: 'gf' as const, user: 1, version: 28 };
        const data = await getClearTable(params);

        expect(data).toEqual(mockData);
        expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
            params,
        });
    });
});
