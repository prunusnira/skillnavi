
import { getMusicInfo, getMusicInfos } from '../getMusicInfo';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Music } from '@/feature/music/data/Music';

jest.mock('@/lib/fetch/fetchAdv');

describe('getMusicInfo', () => {
  it('should return music info for a single mid', async () => {
    const mockMusic: Music = {
      id: 1,
      name: 'Test Music',
      artist: 'Test Artist',
      bpm: 120,
      version: 28,
      type: 'gf',
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockMusic);

    const mid = 1;
    const music = await getMusicInfo({ mid });

    expect(music).toEqual(mockMusic);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        mid,
      },
    });
  });
});

describe('getMusicInfos', () => {
  it('should return music infos for multiple mids', async () => {
    const mockMusics: Music[] = [
      {
        id: 1,
        name: 'Test Music 1',
        artist: 'Test Artist 1',
        bpm: 120,
        version: 28,
        type: 'gf',
      },
      {
        id: 2,
        name: 'Test Music 2',
        artist: 'Test Artist 2',
        bpm: 130,
        version: 28,
        type: 'dm',
      },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockMusics);

    const mids = [1, 2];
    const musics = await getMusicInfos({ mids });

    expect(musics).toEqual(mockMusics);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        mids: JSON.stringify(mids),
      },
    });
  });
});
