import { NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import mainApi from '@shared/api/mainApi';


/**
 * Обновление refresh и access токенов по api
 *
 * @param token
 */
const refreshToken = async (token: JWT): Promise<JWT> => {
  const response = await mainApi.refreshToken({ refreshToken: token.backendTokens.refresh_token });
  const { access_token, refresh_token }: ISignInResponse = await response.json();
  mainApi.setJwtToken({ access_token: access_token });
  return {
    ...token,
    backendTokens: { access_token: access_token, refresh_token: refresh_token },
  };
};

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
        remember: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;
        //Аунтификация пользователя
        const resSignIn = await mainApi.signIn(credentials);
        if (!resSignIn?.ok) {
          throw new Error(`Sign In failed with status: ${resSignIn.status}`);
        }
        const { access_token, refresh_token }: ISignInResponse = await resSignIn.json();
        //Установка access_token для работы с защищенными роутами
        mainApi.setJwtToken({ access_token: access_token });
        //Получение данных пользователя
        const resUserProfile = await mainApi.getProfile();
        if (!resUserProfile?.ok) {
          throw new Error(`Getting a profile failed with status: ${resUserProfile.status}`);
        }

        const { id, email, name, avatar }: IUserProfileResponse = await resUserProfile.json();

        const user: User = {
          id: id,
          name: name,
          email: email,
          image: avatar,
          backendTokens: {
            access_token: access_token,
            refresh_token: refresh_token,
          },
        };
        return user;
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
      // Это будет выполнено только при входе в систему. При каждом следующем вызове эта часть будет пропущена.
      if (user) return { ...token, ...user } as JWT;
      return token;
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
