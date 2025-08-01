
import { renderHook, waitFor } from '@testing-library/react';
import { useCookie } from '../useCookie';
import { updateCookie } from '@/feature/cookie/api/updateCookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/feature/cookie/api/updateCookie');

describe('useCookie', () => {
  it('should call updateCookie when update is called', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useCookie(), { wrapper });

    const key = 'testKey';
    const value = 'testValue';

    result.current.update({ key, value });

    await waitFor(() => expect(updateCookie).toHaveBeenCalledWith({ key, value }));
  });
});
