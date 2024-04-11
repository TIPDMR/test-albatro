import { encode, getToken, JWT } from 'next-auth/jwt';
import mainApi from '@shared/api/mainApi';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from '@/types/next';

export const SIGNIN_SUB_URL = '/sign-in';
export const SESSION_TIMEOUT = 60 * 60 * 24 * 30;
export const TOKEN_REFRESH_BUFFER_SECONDS = 300;
export const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith('https://');
export const SESSION_COOKIE = SESSION_SECURE ? '__Secure-next-auth.session-token' : 'next-auth.session-token';

/**
 * Функция для обновления токена доступа
 * @param token
 */
export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  console.log('refreshAccessToken');
  try {
    const response = await mainApi.refreshToken({ refreshToken: token.backendTokens.refresh_token });
    if (!response.ok) {
      return {
        ...token,
        backendTokens: { access_token: '', refresh_token: '' },
      };
    }
    const { access_token, refresh_token }: ISignInResponse = await response.json();
    mainApi.setJwtToken({ access_token: access_token });
    return {
      ...token,
      backendTokens: { access_token: access_token, refresh_token: refresh_token },
    };
  } catch (e) {
    console.error(e);
  }
  return token;
};

/**
 * Функция для обновления куки сессии
 *
 * @param sessionToken
 * @param request
 * @param response
 */
export const updateCookie = (
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
): NextResponse<unknown> => {
  if (sessionToken) {
    request.cookies.set(SESSION_COOKIE, sessionToken);
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
      sameSite: 'lax',
    });
  } else {
    request.cookies.delete(SESSION_COOKIE);
    return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
  }
  return response;
};


/**
 * Middleware для проверки аутентификации и обновления сессии
 *
 * @param next
 */
export const middlewareNextAuth: MiddlewareFactory = (next) => {

  return async (request: NextRequest, _next: NextFetchEvent) => {
    // Получение токена из запроса
    const token = await getToken({ req: request });
    // Проверка на аутентификацию пользователя
    const isAuthenticated = !!token;
    // Если пользователь не аутентифицирован
    if (!isAuthenticated) {
      // Перенаправление на страницу входа
      return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
    }
    // Инициализация ответа по умолчанию
    let response = NextResponse.next();

    if (!token) {
      // Перенаправление на страницу входа
      return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
    }

    try {
      // Обновление токена доступа
      const newToken = await refreshAccessToken(token);
      if (!newToken.backendTokens.access_token) {
        // Удаление куки сессии из запроса
        return updateCookie(null, request, response);
      }
      // Кодируем новый сессионный токен
      const newSessionToken = await encode({
        secret: process.env.NEXTAUTH_SECRET as string,
        token: newToken,
        maxAge: SESSION_TIMEOUT,
      });
      // Обновляем куку сессии
      response = updateCookie(newSessionToken, request, response);

    } catch (error) {
      return updateCookie(null, request, response);
    }

    return next(request, _next);
    //return response;
  };
};
