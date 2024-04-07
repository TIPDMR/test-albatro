import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const MAIN_API_URI = process.env.API_URI || 'http://localhost:8080';

interface ApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
}

class Api {
  private instance: AxiosInstance;
  private _jwtAccessToken: string | null;

  constructor({ baseUrl, headers }: ApiConfig) {
    this._jwtAccessToken = null;
    this.instance = axios.create({
      baseURL: baseUrl,
      headers,
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response) {
          return Promise.reject(error.response);
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  /**
   * Установка токенов для последующей работы с ними
   * @param accessToken
   * @param refreshToken
   */
  setJwtToken({accessToken}:{ accessToken: string }) {
    this._jwtAccessToken = accessToken;
  }

  /**
   * Запрос на бекенд севрер для входа пользователя в систему
   *
   * @param email
   * @param password
   *
   * @return {
   *   'access_token': '',
   *   'refresh_token': ''
   * }
   */
  signIn({ email, password }: { email: string, password: string }): Promise<AxiosResponse> {
    return this._request('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  }

  /**
   * Обновление access_token через refresh_token токен
   *
   * @param refreshToken
   */
  refreshToken({ refreshToken }: { refreshToken: string }): Promise<AxiosResponse> {
    return this._request('/auth/refresh-token', {
      method: 'POST',
      data: { refreshToken },
    });
  }

  /**
   * Регистрация нового пользователя
   */
  signUp(): Promise<AxiosResponse> {
    return this._request('/message', {
      method: 'GET',
      data: {},
    });
  }

  /**
   *
   */
  getProfile(): Promise<AxiosResponse> {
    return this._request('/auth/profile', {
      method: 'GET',
      data: {},
    });
  }


  private _request(url: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
    if (this._jwtAccessToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = `Bearer ${this._jwtAccessToken}`;
    }
    return this.instance.request({ url, ...config });
  }
}

const MainApi = new Api({
  baseUrl: MAIN_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default MainApi;
