import {
  TCreateUserAction,
  TDeleteUserAction,
  TTransferEquipmentAction,
  TUpdateUserAction,
} from "./types";
import {
  IUserDetail,
  TCreateUserRequest,
  TTransferEquipment,
  TUpdateUserRequest,
} from "../../../interfaces/user-interfaces";
import { EUserActions } from "./constants";

export const getUsersAction = () => ({
  type: EUserActions.GET_USERS,
});

export const getUserRequestAction = () => ({
  type: EUserActions.GET_USERS_REQUEST,
});

export const getUserSuccessAction = (payload: IUserDetail[]) => ({
  type: EUserActions.GET_USERS_SUCCESS,
  payload,
});

export const getUserFailureAction = (error: any) => ({
  type: EUserActions.GET_USERS_FAILURE,
  payload: error,
});

export const createUserAction = (
  payload: TCreateUserRequest,
  cb?: () => void
): TCreateUserAction => ({
  type: EUserActions.CREATE_USER,
  payload,
  cb,
});

export const createUserRequestAction = () => ({
  type: EUserActions.CREATE_USER_REQUEST,
});

export const createUserSuccessAction = () => ({
  type: EUserActions.CREATE_USER_SUCCESS,
});

export const createUserFailureAction = (error: any) => ({
  type: EUserActions.CREATE_USER_FAILURE,
  payload: error,
});

export const updateUserAction = (
  payload: TUpdateUserRequest,
  cb?: () => void
): TUpdateUserAction => ({
  type: EUserActions.UPDATE_USER,
  payload,
  cb,
});

export const updateUserRequestAction = () => ({
  type: EUserActions.UPDATE_USER_REQUEST,
});

export const updateUserSuccessAction = () => ({
  type: EUserActions.UPDATE_USER_SUCCESS,
});

export const updateUserFailureAction = (error: any) => ({
  type: EUserActions.UPDATE_USER_FAILURE,
  payload: error,
});

export const deleteUserAction = (
  payload: number[],
  cb?: () => void
): TDeleteUserAction => ({
  type: EUserActions.DELETE_USER,
  payload,
  cb,
});

export const deleteUserRequestAction = () => ({
  type: EUserActions.DELETE_USER_REQUEST,
});

export const deleteUserSuccessAction = () => ({
  type: EUserActions.DELETE_USER_SUCCESS,
});

export const deleteUserFailureAction = (error: any) => ({
  type: EUserActions.DELETE_USER_FAILURE,
  payload: error,
});

export const transferEquipmentAction = (
  payload: TTransferEquipment,
  cb?: () => void
): TTransferEquipmentAction => ({
  type: EUserActions.TRANSFER_EQUIPMENT,
  payload,
  cb,
});

export const transferEquipmentRequestAction = () => ({
  type: EUserActions.TRANSFER_EQUIPMENT_REQUEST,
});

export const transferEquipmentSuccessAction = () => ({
  type: EUserActions.TRANSFER_EQUIPMENT_SUCCESS,
});

export const transferEquipmentFailureAction = (error: any) => ({
  type: EUserActions.TRANSFER_EQUIPMENT_FAILURE,
  payload: error,
});
