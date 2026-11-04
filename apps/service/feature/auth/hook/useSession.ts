import { useQuery } from '@tanstack/react-query';

export const useSession = () => {
    const { data } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const res = await fetch('/api/session');
            return res.json();
        },
    });

    return data;
}