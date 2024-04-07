import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: {},
          password: {},
        }, async authorize(credentials, req) {
          const res = await fetch('/your/endpoint', {
            method: 'POST', body: JSON.stringify(credentials), headers: { 'Content-Type': 'application/json' },
          });
          const user = await res.json();
          if (res.ok && user) {
            return user;
          }
          return null;
        },
      }),
    ],
    pages: {
      signIn: '/sign-in',
    },
    session: {
      strategy: 'jwt',
    },
  })
;

export { handler as GET, handler as POST };
