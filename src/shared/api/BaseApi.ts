export default class BaseApi {
  protected _headers: Record<string, string>;
  protected _jwtAccessToken: string | null;
  protected _serverUrl: string;

  constructor({ serverUrl, headers }: IApiConfig) {
    this._serverUrl = serverUrl;
    this._headers = headers;
    this._jwtAccessToken = null;
  }

  /**
   * Установка токенов для последующей работы с ними
   * @param access_token
   */
  setJwtToken({ access_token }: { access_token: string }) {
    this._jwtAccessToken = access_token;
  }

  async _request(url: string, options: RequestInit): Promise<Response> {
    if (this._jwtAccessToken) {
      if (!options.headers) {
        options.headers = {};
      }
      (options.headers as Record<string, string>)['Authorization'] = `Bearer ${this._jwtAccessToken}`;
    }
    return await fetch(url, options);
  }
}
