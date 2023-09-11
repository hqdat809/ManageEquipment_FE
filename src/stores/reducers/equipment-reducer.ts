import { IEquipmentDetail } from "../../interfaces/equipment-interface";
import { EEquipmentActions } from "../actions/equipment-actions/constants";

type TEquipmentState = {
  equipments: IEquipmentDetail[];
  pageNo?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
};

const initialState: TEquipmentState = {
  equipments: [],
};

const equipmentReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TEquipmentState => {
  switch (action.type) {
    case EEquipmentActions.GET_EQUIPMENT_SUCCESS:
      return {
        ...state,
        equipments: action.payload.content || action.payload,
        pageNo: action.payload.pageNo,
        pageSize: action.payload.pageSize,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,
        last: action.payload.last,
      };
    default:
      return state;
  }
};

export default equipmentReducer;
