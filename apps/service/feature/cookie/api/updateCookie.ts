import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_COOKIE } from '@/url/api';

export const updateCookie = async ({ key, value }: { key: string, value: string }) => {
    return await fetchAdv.post(API_COOKIE, {
        body: JSON.stringify({ key, value }),
    });
};