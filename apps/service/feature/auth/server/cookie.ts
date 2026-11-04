import { cookies } from 'next/headers';

export const registerTokens = async (acc: string, ref: string, exp: string) => {
    const cookieStore = await cookies();

    cookieStore.set('sinacc', acc, { expires: new Date(exp), httpOnly: true, secure: true });
    cookieStore.set('sinref', ref, { expires: new Date(exp), httpOnly: true, secure: true });

    console.log('cookie registered');
}