import { EAuthToken, TAuthToken } from "../interfaces/user-interfaces";

export const handleStorageToken = (tokens: TAuthToken) => {
  localStorage.setItem(EAuthToken.ACCESS_TOKEN, tokens?.token);
  localStorage.setItem(EAuthToken.REFRESH_TOKEN, tokens?.refreshToken);
};
