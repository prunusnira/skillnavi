import { useMutation } from '@tanstack/react-query';
import { updateCookie } from '@/feature/cookie/api/updateCookie';

export const useCookie = () => {
    const { mutate: update } = useMutation({
        mutationKey: ['cookie', 'update'],
        mutationFn: updateCookie,
    });

    return {
        update,
    };
};