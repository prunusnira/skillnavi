import NextAuth from 'next-auth';
import { authOptions } from '@/feature/auth/data/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
