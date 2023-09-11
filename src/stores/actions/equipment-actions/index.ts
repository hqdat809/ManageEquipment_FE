import { IGetEquipmentRequest } from "../../../interfaces/equipment-interface";
import { EEquipmentActions } from "./constants";
import {
  TCreateEquipmentAction,
  TDeleteEquipmentAction,
  TGetEquipmentAction,
  TUpdateEquipmentAction,
} from "./types";

export const createEquipmentAction = (
  payload: any,
  cb?: () => void
): TCreateEquipmentAction => ({
  type: EEquipmentActions.CREATE_EQUIPMENT,
  payload,
  cb,
});

export const createEquipmentRequestAction = () => ({
  type: EEquipmentActions.CREATE_EQUIPMENT_REQUEST,
});

export const createEquipmentSuccessAction = () => ({
  type: EEquipmentActions.CREATE_EQUIPMENT_SUCCESS,
});

export const createEquipmentFailureAction = (error: any) => ({
  type: EEquipmentActions.CREATE_EQUIPMENT_FAILURE,
  payload: error,
});

export const getEquipmentAction = (
  payload?: IGetEquipmentRequest
): TGetEquipmentAction => ({
  payload,
  type: EEquipmentActions.GET_EQUIPMENT,
});

export const getEquipmentRequestAction = () => ({
  type: EEquipmentActions.GET_EQUIPMENT_REQUEST,
});

export const getEquipmentSuccessAction = (payload: any) => ({
  type: EEquipmentActions.GET_EQUIPMENT_SUCCESS,
  payload,
});

export const getEquipmentFailureAction = (error: any) => ({
  type: EEquipmentActions.GET_EQUIPMENT_FAILURE,
  payload: error,
});

export const updateEquipmentAction = (
  payload: any,
  cb?: () => void
): TUpdateEquipmentAction => ({
  type: EEquipmentActions.UPDATE_EQUIPMENT,
  payload,
  cb,
});

export const updateEquipmentRequestAction = () => ({
  type: EEquipmentActions.UPDATE_EQUIPMENT_REQUEST,
});

export const updateEquipmentSuccessAction = () => ({
  type: EEquipmentActions.UPDATE_EQUIPMENT_SUCCESS,
});

export const updateEquipmentFailureAction = (error: any) => ({
  type: EEquipmentActions.UPDATE_EQUIPMENT_FAILURE,
  payload: error,
});

export const deleteEquipmentAction = (
  payload: number,
  cb?: () => void
): TDeleteEquipmentAction => ({
  type: EEquipmentActions.DELETE_EQUIPMENT,
  payload,
  cb,
});

export const deleteEquipmentRequestAction = () => ({
  type: EEquipmentActions.DELETE_EQUIPMENT_REQUEST,
});

export const deleteEquipmentSuccessAction = () => ({
  type: EEquipmentActions.DELETE_EQUIPMENT_SUCCESS,
});

export const deleteEquipmentFailureAction = (error: any) => ({
  type: EEquipmentActions.DELETE_EQUIPMENT_FAILURE,
  payload: error,
});
