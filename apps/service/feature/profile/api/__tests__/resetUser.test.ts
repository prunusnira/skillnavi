
import { resetUser } from '../resetUser';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

jest.mock('@/lib/fetch/fetchAdv');

describe('resetUser', () => {
  it('should call fetchAdv.post with correct ID', async () => {
    const mockResponse = { success: true };
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockResponse);

    const id = 'user123';
    await resetUser(id);

    expect(fetchAdv.post).toHaveBeenCalledWith(expect.stringContaining(id));
  });
});
