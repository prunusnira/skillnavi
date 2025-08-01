
import { getMusicList } from '../getMusicList';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { MusicListPage } from '@/feature/music/data/MusicListPageData';

jest.mock('@/lib/fetch/fetchAdv');
jest.mock('@/feature/env/api/getGameVersions');

describe('getMusicList', () => {
  it('should return music list data', async () => {
    const mockMusicListPage: MusicListPage = {
      total: 100,
      page: 1,
      pageSize: 10,
      music: [],
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockMusicListPage);
    (getLatestVersion as jest.Mock).mockResolvedValue(28);

    const params = { userid: 1, musicVersion: 28 };
    const data = await getMusicList(params);

    expect(data).toEqual(mockMusicListPage);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        userid: 1,
        musicVersion: 28,
        gameVersion: 28,
        difficulty: undefined,
        order: 'titleasc',
        page: 1,
      },
    });
  });

  it('should use latest version if musicVersion or gameVersion are not provided', async () => {
    const mockMusicListPage: MusicListPage = {
      total: 100,
      page: 1,
      pageSize: 10,
      music: [],
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockMusicListPage);
    (getLatestVersion as jest.Mock).mockResolvedValue(28);

    const params = { userid: 1 };
    const data = await getMusicList(params);

    expect(data).toEqual(mockMusicListPage);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        userid: 1,
        musicVersion: 28,
        gameVersion: 28,
        difficulty: undefined,
        order: 'titleasc',
        page: 1,
      },
    });
  });
});
