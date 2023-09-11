import { IUserDetail } from "../../interfaces/user-interfaces";
import { EUserActions } from "../actions/user-actions/constants";

type TUserState = {
  users: IUserDetail[];
};

const initialState: TUserState = {
  users: [],
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TUserState => {
  switch (action.type) {
    case EUserActions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
