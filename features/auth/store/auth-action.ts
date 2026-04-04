import { AUTH_LOGIN, AUTH_LOGOUT, ILogin } from "./auth-type";

const loginUser = (login: ILogin) => ({
  type: AUTH_LOGIN,
  payload: login,
});

const logoutUser = () => ({
  type: AUTH_LOGOUT,
});

export { loginUser, logoutUser };
