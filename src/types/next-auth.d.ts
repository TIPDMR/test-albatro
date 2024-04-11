import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendTokens: {
      access_token: string;
      refresh_token: string;
    };
  }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendTokens: {
      access_token: string;
      refresh_token: string;
    };
  }
}

import { DefaultUser } from 'next-auth';

declare module 'next-auth' {

  interface User extends DefaultUser {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    backendTokens?: {
      access_token?: string;
      refresh_token?: string;
    },
  }
}
