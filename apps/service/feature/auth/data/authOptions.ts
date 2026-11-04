import { CodeResponse } from '@react-oauth/google';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

export const onLoginSuccess = async (res: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
    console.log(res);
    const tokens = await fetchAdv.post(
        'http://localhost:3001/auth/google', {
            body: {
                code: res.code,
            },
        });

    console.log(tokens);
}

export const onLoginFailure = (res: Pick<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
    console.log(res);
}
