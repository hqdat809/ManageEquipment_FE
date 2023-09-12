import {
  TAuthToken,
  TSignInRequest,
  TSignInResponse,
} from "../../../interfaces/user-interfaces";
import { EAuthActions } from "./constants";
import { TSignInAction } from "./types";

export const signInAction = (
  payload: TSignInRequest,
  cb1?: (payload: TAuthToken) => void,
  cb2?: (errorMessage: string) => void
): TSignInAction => ({
  type: EAuthActions.SIGN_IN,
  payload,
  cb1,
  cb2,
});

export const signInRequestAction = () => ({
  type: EAuthActions.SIGN_IN_REQUEST,
});

export const signInSuccessAction = (payload: TSignInResponse) => ({
  type: EAuthActions.SIGN_IN_SUCCESS,
  payload,
});

export const signInFailureAction = (error: any) => ({
  type: EAuthActions.SIGN_IN_FAILURE,
  payload: error,
});
