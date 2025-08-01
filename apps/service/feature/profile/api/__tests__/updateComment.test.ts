
import { updateComment } from '../updateComment';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { CommonFetchResult } from '@/common/fetch/CommonFetchResult';

jest.mock('@/lib/fetch/fetchAdv');

describe('updateComment', () => {
  it('should call fetchAdv.post with correct UID and comment', async () => {
    const mockResult: CommonFetchResult = { result: 'success' };
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockResult);

    const uid = 'user123';
    const comment = 'This is a test comment.';
    const result = await updateComment({ uid, comment });

    expect(result).toEqual(mockResult);
    expect(fetchAdv.post).toHaveBeenCalledWith(expect.stringContaining(uid), {
      body: {
        comment,
      },
    });
  });
});
