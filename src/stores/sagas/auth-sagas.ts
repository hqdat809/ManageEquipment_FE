import { AxiosError } from "axios";
import { signIn } from "../../services/auth-services";
import { toastError } from "../../utils/notifications-utils";
import {
  signInFailureAction,
  signInRequestAction,
  signInSuccessAction,
} from "../actions/auth-actions";
import { EAuthActions } from "../actions/auth-actions/constants";
import { TSignInAction } from "../actions/auth-actions/types";
import { put, call, all, fork, takeLatest } from "redux-saga/effects";
import { TSignInResponse } from "../../interfaces/user-interfaces";

function* signInSaga({ payload, cb1, cb2 }: TSignInAction) {
  try {
    yield put(signInRequestAction());
    const response: TSignInResponse = yield call(signIn, payload);
    const { token, refreshToken } = response;
    yield put(signInSuccessAction(response));
    cb1?.({ token, refreshToken });
  } catch (error: any) {
    yield put(signInFailureAction(error));
    if ((error as AxiosError).response?.status == 401) {
      cb2?.("Email or password is invalid!!");
    } else {
      toastError(error.response?.data?.message);
      cb2?.(error.response?.data?.message);
    }
  }
}

function* watchOnAuth() {
  yield takeLatest(EAuthActions.SIGN_IN, signInSaga);
}

export default function* authSaga() {
  yield all([fork(watchOnAuth)]);
}
