import {
  TCreateUserRequest,
  TTransferEquipment,
  TUpdateUserRequest,
} from "../interfaces/user-interfaces";
import {
  TDeleteUserAction,
  TUpdateUserAction,
} from "../stores/actions/user-actions/types";
import { ApiClient } from "./api-clients";

export const getUsers = async () => {
  const response = await ApiClient.get(`/user/users`);

  return response.data;
};

export const createUser = async (payload: TCreateUserRequest) => {
  const response = await ApiClient.post(`/user/create`, payload);

  return response.data;
};

export const updateUser = async (payload: TUpdateUserRequest) => {
  const response = await ApiClient.post(`/user/update/${payload.id}`, payload);

  return response.data;
};

export const deleteUser = async (payload: number[]) => {
  const response = await ApiClient.delete(`/user/delete`, {
    data: { ids: payload },
  });

  return response.data;
};

export const transferService = async (payload: TTransferEquipment) => {
  const response = await ApiClient.post(
    `/equipment/transfer/${payload.userId}`,
    {
      ids: payload.equipmentIds,
    }
  );

  return response.data;
};