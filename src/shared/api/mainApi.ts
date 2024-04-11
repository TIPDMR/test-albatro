import BaseApi from '@shared/api/BaseApi';

const MAIN_API_URI = process.env.API_URI || 'https://api.escuelajs.co/api/v1';


class Api extends BaseApi {

  constructor({ serverUrl, headers }: IApiConfig) {
    super({ serverUrl, headers });
  }


  /**
   * Запрос на бекенд сервер для входа пользователя в систему
   *
   * @param email
   * @param password
   *
   * @return {
   *   'access_token': '',
   *   'refresh_token': ''
   * }
   */
  async signIn({ email, password }: { email: string, password: string }): Promise<Response> {
    try {
      return await this._request(`${this._serverUrl}/auth/login`, {
        method: 'POST',
        headers: { ...this._headers },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Обновление access_token через refresh_token токен
   *
   * @param refreshToken
   *
   * @return {
   *   'access_token': '',
   *   'refresh_token': ''
   * }
   */
  async refreshToken({ refreshToken }: { refreshToken: string }): Promise<Response> {
    try {
      return await this._request(`${this._serverUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: { ...this._headers },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Регистрация нового пользователя
   */
  // async signUp({ name, email, password, avatar }: { name: string, email: string, password: string, avatar: string }) {
  //   try {
  //     return this._request(`${this._serverUrl}/users`, {
  //       method: 'GET',
  //       headers: {
  //         ...this._headers,
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  /**
   *
   */
  async getProfile(): Promise<Response> {
    try {
      return await this._request(`${this._serverUrl}/auth/profile`, {
        method: 'GET',
        headers: { ...this._headers },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const MainApi = new Api({
  serverUrl: MAIN_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default MainApi;
