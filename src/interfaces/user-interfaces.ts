export interface IUserDetail {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  equipmentIds: number[];
}

export enum EUserModalType {
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
}

export type TCreateUserRequest = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
};

export type TUpdateUserRequest = {
  id?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
};

export type TTransferEquipment = {
  userId: number;
  equipmentIds: number[];
};
