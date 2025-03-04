import { PagesOptions } from 'next-auth';
import { LINK_AUTH_LOGIN } from '@/url/url';

export const authPages: Partial<PagesOptions> = {
    signIn: LINK_AUTH_LOGIN,
};
