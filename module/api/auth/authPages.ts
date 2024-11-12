import { PagesOptions } from 'next-auth';
import { LINK } from '@/data/url';

export const authPages: Partial<PagesOptions> = {
    signIn: LINK.AUTH.login,
};
