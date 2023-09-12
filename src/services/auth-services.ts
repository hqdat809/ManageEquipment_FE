import { TSignInRequest } from "../interfaces/user-interfaces";
import { ApiClient } from "./api-clients";

export const signIn = async (payload: TSignInRequest) => {
  const response = await ApiClient.post(`/v1/auth/admin/login`, payload);
  // .then((response) => {
  //   Promise.resolve(response.data);
  // })
  // .catch((error) => {
  //   Promise.reject(error);
  // });

  return response.data;
};
