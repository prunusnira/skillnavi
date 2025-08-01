
import { getGameVersions, getLatestVersion } from '../getGameVersions';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { GameVersion } from '@skillnavi/data/src/version';

jest.mock('@/lib/fetch/fetchAdv');

describe('getGameVersions', () => {
  it('should return game versions', async () => {
    const mockGameVersions: GameVersion[] = [
      { id: 1, name: 'Version 1' },
      { id: 2, name: 'Version 2' },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockGameVersions);

    const versions = await getGameVersions();

    expect(versions).toEqual(mockGameVersions);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String));
  });
});

describe('getLatestVersion', () => {
  it('should return the latest game version', async () => {
    const mockLatestVersion = 10;
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockLatestVersion);

    const latestVersion = await getLatestVersion();

    expect(latestVersion).toEqual(mockLatestVersion);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String));
  });
});
