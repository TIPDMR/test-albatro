interface IApiConfig {
  serverUrl: string;
  headers: Record<string, string>;
}

interface ISignInResponse {
  access_token: string;
  refresh_token: string;
}

interface IUserProfileResponse {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}
