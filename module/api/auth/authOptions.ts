import { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { authPages } from '@/module/api/auth/authPages';
import Twitter from 'next-auth/providers/twitter';

export const authOptions: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],
    cookies: {
        pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
                httpOnly: true,
                sameSite: 'none',
                path: '/',
                secure: true,
            },
        },
    },
    secret: process.env.NEXTAUTH_SECRET || '',
    callbacks: {
        jwt: async ({ token, user }) => {
            return { ...token, ...user };
        },
        session: async ({ session, token }) => {
            return session;
        },
    },
    pages: authPages,
};
