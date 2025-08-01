
import { getProfileGraph } from '../getProfileGraph';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';

jest.mock('@/lib/fetch/fetchAdv');

describe('getProfileGraph', () => {
  it('should return profile graph data for a given ID', async () => {
    const mockGraphData: ProfileGraphRaw[] = [
      { date: '2023-01-01', skill: 1000 },
      { date: '2023-01-02', skill: 1050 },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockGraphData);

    const id = 'user123';
    const graphData = await getProfileGraph(id);

    expect(graphData).toEqual(mockGraphData);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String));
  });
});
