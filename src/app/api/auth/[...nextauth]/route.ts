import NextAuth from 'next-auth/next';
import { nextAuthOptions } from '@app/config/nextAuth';


const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

