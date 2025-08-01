
import { getPatternRankingPages } from '../getPatternRankingPages';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

jest.mock('@/lib/fetch/fetchAdv');

describe('getPatternRankingPages', () => {
  it('should return the number of pages for pattern ranking', async () => {
    const mockResponse = { pages: 5 };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockResponse);

    const params = { mid: 1, version: 28, patterncode: 1 };
    const pages = await getPatternRankingPages(params);

    expect(pages).toEqual(mockResponse.pages);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params,
    });
  });
});
