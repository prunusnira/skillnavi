import { useQuery } from '@tanstack/react-query';
import { getProfileDetail } from '@/feature/profile/api/getProfileDetail';

export const useProfileDetail = (id: string, version: number) => {
    return useQuery({
        queryKey: [
            'profile',
            id,
            'detail',
            version,
        ],
        queryFn: () => getProfileDetail(Number(id), version),
    });
};
