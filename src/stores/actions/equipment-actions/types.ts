import { IGetEquipmentRequest } from "../../../interfaces/equipment-interface";
import { EEquipmentActions } from "./constants";

export type TCreateEquipmentAction = {
  type: EEquipmentActions.CREATE_EQUIPMENT;
  payload: any;
  cb?: () => void;
};

export type TGetEquipmentAction = {
  payload?: IGetEquipmentRequest;
  type: EEquipmentActions.GET_EQUIPMENT;
};

export type TUpdateEquipmentAction = {
  type: EEquipmentActions.UPDATE_EQUIPMENT;
  payload: any;
  cb?: () => void;
};

export type TDeleteEquipmentAction = {
  type: EEquipmentActions.DELETE_EQUIPMENT;
  payload: number[];
  cb?: () => void;
};
