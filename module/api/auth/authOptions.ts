import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
        // Credentials({
        //     name: 'credentials',
        //     credentials: {
        //         username: { label: 'ID', type: 'text', placeholder: 'ID' },
        //         password: { label: 'Password', type: 'password' },
        //     },
        //     async authorize(credentials, req) {
        //         return null;
        //     },
        // }),
        // Google({
        //     clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        // }),
    ],
};
