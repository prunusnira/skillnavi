
import { createAccount } from '../createAccount';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

jest.mock('@/lib/fetch/fetchAdv');

describe('createAccount', () => {
  it('should call fetchAdv.post with correct token', async () => {
    const mockResponse = { success: true };
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockResponse);

    const token = 'test-token';
    await createAccount({ token });

    expect(fetchAdv.post).toHaveBeenCalledWith(expect.any(String), {
      body: {
        token,
      },
    });
  });
});
