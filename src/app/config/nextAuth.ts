import { JWT } from 'next-auth/jwt';
import mainApi from '@shared/api/mainApi';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ISignInResponse {
  access_token: string;
  refresh_token: string;
}

interface IUserProfile {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

/**
 * Обновление refresh и access токенов по api
 *
 * @param token
 */
const refreshToken = async (token: JWT): Promise<JWT> => {
  const response = await mainApi.refreshToken({ refreshToken: token.backendTokens.refreshToken });
  const { access_token, refresh_token }: ISignInResponse = response.data;
  mainApi.setJwtToken({ accessToken: access_token });
  return {
    ...token,
    backendTokens: { accessToken: access_token, refreshToken: refresh_token },
  };
};

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      }, async authorize(credentials, req) {
        console.log('NextAuth');
        if (!credentials?.email || !credentials.password) return null;
        //Аунтификация пользователя
        const resSignIn = await mainApi.signIn(credentials);
        if (resSignIn && resSignIn.status === 200 || resSignIn.status === 201) {
          const { access_token, refresh_token }: ISignInResponse = resSignIn.data;
          //Установка accessToken для работы с защищенными роутами
          mainApi.setJwtToken({ accessToken: access_token });
          //Получение данных пользователя
          const resUserProfile = await mainApi.getProfile();
          if (resUserProfile && resUserProfile.status === 200 || resUserProfile.status === 201) {
            const { id, name, email, avatar }: IUserProfile = resUserProfile.data;

            const user: User = {
              id: id,
              name: name,
              email: email,
              image: avatar,
              backendTokens: {
                accessToken: access_token,
                refreshToken: refresh_token,
              },
            };
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    /**
     * Обратный вызов выполняется всякий раз, когда веб-токен JSON (JWT)
     * создается или обновляется в течение жизненного цикла аутентификации
     * @param token - объект токена JWT
     * @param user - объект пользователя
     */
    async jwt({ token, user }) {
      // Если объект пользователя существует (то есть пользователь уже аутентифицирован)
      // Обновляем токен добавляя данные пользователя
      if (user) return { ...token, ...user } as JWT;
      return refreshToken(token);
    },

    /**
     * этот обратный вызов вызывается каждый раз, когда считываются данные сеанса,
     * например, во время рендеринга на стороне сервера или в защищенных запросах API
     * @param token - объект токена JWT
     * @param session - объект сессии
     */
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};
