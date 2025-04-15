import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_USER_JOIN } from '@/url/api';

interface Params {
    token: string;
}

export const createAccount = async ({ token }: Params) => {
    fetchAdv.post(API_USER_JOIN, {
        body: {
            token,
        },
    });
};