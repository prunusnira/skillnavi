
import { changeTowerIcon } from '../changeTowerIcon';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

jest.mock('@/lib/fetch/fetchAdv');

describe('changeTowerIcon', () => {
  it('should call fetchAdv.post with correct UID and icon', async () => {
    const mockResponse = { success: true };
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockResponse);

    const uid = 123;
    const icon = 'new-icon';
    await changeTowerIcon({ uid, icon });

    expect(fetchAdv.post).toHaveBeenCalledWith(expect.stringContaining(uid.toString()), {
      body: {
        icon,
      },
    });
  });
});
