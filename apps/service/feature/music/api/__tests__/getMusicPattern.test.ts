
import { getMusicPattern } from '../getMusicPattern';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Pattern } from '@/feature/music/data/Pattern';

jest.mock('@/lib/fetch/fetchAdv');

describe('getMusicPattern', () => {
  it('should return music pattern data', async () => {
    const mockPatterns: Pattern[] = [
      { id: 1, mid: 1, type: 'gf', difficulty: 50, level: 500, play_type: 'd', skill_note: 100, skill_point: 100 },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockPatterns);

    const mid = 1;
    const version = 28;
    const data = await getMusicPattern({ mid, version });

    expect(data).toEqual(mockPatterns);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        version,
      },
    });
  });
});
