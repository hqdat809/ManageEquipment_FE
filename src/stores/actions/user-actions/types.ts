import {
  TCreateUserRequest,
  TTransferEquipment,
  TUpdateUserRequest,
} from "../../../interfaces/user-interfaces";
import { EUserActions } from "./constants";

export type TGetUsersAction = {
  type: EUserActions.GET_USERS;
};

export type TCreateUserAction = {
  type: EUserActions.CREATE_USER;
  payload: TCreateUserRequest;
  cb?: () => void;
};

export type TUpdateUserAction = {
  type: EUserActions.UPDATE_USER;
  payload: TUpdateUserRequest;
  cb?: () => void;
};

export type TDeleteUserAction = {
  type: EUserActions.DELETE_USER;
  payload: number[];
  cb?: () => void;
};

export type TTransferEquipmentAction = {
  type: EUserActions.TRANSFER_EQUIPMENT;
  payload: TTransferEquipment;
  cb?: () => void;
};
