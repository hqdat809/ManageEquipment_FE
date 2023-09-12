import { IUserData } from "../../interfaces/user-interfaces";
import { EAuthActions } from "../actions/auth-actions/constants";

type TAuthState = {
  token: string;
  refreshToken: string;
  userData: IUserData | null;
};

const initialState: TAuthState = {
  token: "",
  refreshToken: "",
  userData: null,
};

const authReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TAuthState => {
  switch (action.type) {
    case EAuthActions.SIGN_IN_SUCCESS:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
