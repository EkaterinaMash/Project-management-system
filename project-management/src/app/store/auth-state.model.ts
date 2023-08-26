export const idle = 'idle';
export const loading = 'loading';
export const succeeded = 'succeeded';
export const failed = 'failed';

export interface requestError {
  statusCode?: number;
  message: string;
}

export interface AuthenticationData {
  login: string;
  password: string;
}

export interface AuthorizationData {
  name: string;
  login: string;
  password: string;
}

export interface AuthorizationDataPayload {
  name: string;
  login: string;
  _id: string;
}

export type token = string | null;

export interface AuthState {
  data?: AuthenticationData | AuthorizationDataPayload;
  token: token;
  isLoggedIn: boolean;
  userId: string | null;
  userName: string | null;
  status: string;
  error: requestError | null;
}

export const initialAuthState: AuthState = {
  token: null,
  isLoggedIn: false,
  userId: null,
  userName: null,
  status: idle,
  error: null,
};

export interface RegisterForm {
  name: string;
  login: string;
  password: string;
}
