
import { getRecent } from '../getRecent';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Recent } from '@/feature/recent/data/Recent';

jest.mock('@/lib/fetch/fetchAdv');

describe('getRecent', () => {
  it('should return recent data', async () => {
    const mockRecent: Recent[] = [
      { id: 1, name: 'User 1', mid: 101, music_name: 'Song 1', skill: 1000, date: '2023-01-01' },
      { id: 2, name: 'User 2', mid: 102, music_name: 'Song 2', skill: 1200, date: '2023-01-02' },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockRecent);

    const data = await getRecent();

    expect(data).toEqual(mockRecent);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      next: {
        revalidate: 0,
      },
    });
  });
});
