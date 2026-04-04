export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginAction {
  type: typeof AUTH_LOGIN;
  payload: ILogin;
}

export interface ILogoutAction {
  type: typeof AUTH_LOGOUT;
}

export type AuthActionTypes = ILoginAction | ILogoutAction;
