import { useQuery } from '@tanstack/react-query';
import type { AuthSession } from '@/feature/auth/data/Session';
import { API_SESSION } from '@/url/api';

export const useSession = () => {
    const { data } = useQuery<AuthSession>({
        queryKey: ['session'],
        queryFn: async () => {
            const res = await fetch(API_SESSION, { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to read the app session');
            }

            return res.json();
        },
    });

    return data;
}
