
import { updateCookie } from '../updateCookie';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

jest.mock('@/lib/fetch/fetchAdv');

describe('updateCookie', () => {
  it('should call fetchAdv.post with correct params', async () => {
    const key = 'test-key';
    const value = 'test-value';

    await updateCookie({ key, value });

    expect(fetchAdv.post).toHaveBeenCalledWith(expect.any(String), {
      body: JSON.stringify({ key, value }),
    });
  });
});
