
import { getSearchResult } from '../getSearchResult';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { SearchResult } from '@/feature/search/data/Search.data';

jest.mock('@/lib/fetch/fetchAdv');

describe('getSearchResult', () => {
  it('should return search results', async () => {
    const mockSearchResult: SearchResult = {
      total: 1,
      page: 1,
      pageSize: 10,
      result: [
        { id: 1, name: 'Test Music', type: 'music' },
      ],
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockSearchResult);

    const type = 'music';
    const value = 'test';
    const page = 1;
    const data = await getSearchResult(type, value, page);

    expect(data).toEqual(mockSearchResult);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String));
  });
});
