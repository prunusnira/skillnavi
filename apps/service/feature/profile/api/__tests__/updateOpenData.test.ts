
import { updateOpenData } from '../updateOpenData';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

jest.mock('@/lib/fetch/fetchAdv');

describe('updateOpenData', () => {
  it('should call fetchAdv.post with correct UID and open status', async () => {
    const mockResponse = { success: true };
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockResponse);

    const uid = 'user123';
    const openStatus = 'true';
    await updateOpenData({ uid, open: openStatus });

    expect(fetchAdv.post).toHaveBeenCalledWith(expect.stringContaining(uid), {
      body: {
        opendata: openStatus,
      },
    });
  });
});
